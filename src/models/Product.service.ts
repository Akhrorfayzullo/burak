import ProductModel from "../schema/Product.model";
import Errors, { HttpCode, Message } from "../libs/Errors";
import {
	Product,
	ProductInput,
	ProductInputUpdateInput,
} from "../libs/types/product";
import { shapeIntoMongooseObjectId } from "../libs/config";

class ProductService {
    private readonly productModel;
  
    constructor() {
      this.productModel = ProductModel
    }

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