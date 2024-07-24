import ProductModel from "../schema/Product.model";
import Errors, { HttpCode, Message } from "../libs/Errors";
import {
	Product,
	ProductInput,
	ProductInputUpdateInput,
  ProductInquiry,
} from "../libs/types/product";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { T } from "../libs/types/common";
import { ProductStatus } from "../libs/enums/product.enums";
import {ObjectId} from "mongoose"
import ViewService from "./View.service";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/enums/view.enum";

class ProductService {
    private readonly productModel;
    public viewService
  
    constructor() {
      this.productModel = ProductModel
      this.viewService = new ViewService
    }

    // SPA 
	public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
		console.log("inquiry", inquiry);

		const match: T = { productStatus: ProductStatus.PROCESS };

		if (inquiry.productCollection) {
			match.productCollection = inquiry.productCollection;
		}

		if (inquiry.search) {
			match.productName = { $regex: new RegExp(inquiry.search, "i") };
		}  

		const sort: T =
			inquiry.order === "productPrice"
				? { [inquiry.order]: 1 }
				: { [inquiry.order]: -1 };
		
		const result = await this.productModel
			.aggregate([
				{ $match: match }, // find 
				{ $sort: sort }, // sort 
				{ $skip: (inquiry.page * 1 - 1) * inquiry.limit }, 
				{ $limit: inquiry.limit * 1 }, 
			])
			.exec();

		if (!result) {
			throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
		}

		return result;
	}

  public async getProduct(
		memberId: ObjectId | null,
		id: string
	): Promise<Product> {
		const productId = shapeIntoMongooseObjectId(id);

		let result = await this.productModel
			.findOne({
				_id: productId,
				productStatus: ProductStatus.PROCESS,
			})
			.exec();

		if (!result) {
			throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
		}

		if (memberId) {
		
			const input: ViewInput = {
				memberId: memberId,
				viewRefId: productId,
				viewGroup: ViewGroup.PRODUCT,
			};
      //Existent
			const existView = await this.viewService.checkIfViewExistence(input);

			if (!existView) {
				
				console.log("Planning to insert new view");
				await this.viewService.insertMemberView(input);
				

				result = await this.productModel
					.findByIdAndUpdate(
						productId,
						{ $inc: { productViews: +1 } },
						{ new: true }
					)
					.exec();
			}
		}

		return result;
	}


  //SSR

    public async getAllProducts(): Promise<Product[]> {
      const result = await this.productModel.find().exec();
      if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
  
      return result;
    }

    public async createNewProduct(input: ProductInput): Promise<Product> {
      try {
        return await this.productModel.create(input);
      } catch (err) {
        console.error("Error:createNewProduct:", err);
        throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
      }
    }
  
    public async updateChosenProduct(
      productId: string,
      input: ProductInputUpdateInput
    ): Promise<Product> {
      // string => ObjectId
      productId = shapeIntoMongooseObjectId(productId);
  
      const result = await this.productModel
        .findOneAndUpdate({ _id: productId }, input, { new: true })
        .exec();
  
      if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
  
      console.log(" result:", result);
  
      return result;
    }
  }
  

export default ProductService