import { T } from "../libs/types/common";
import {Request, Response} from "express"
import Errors, { HttpCode, Message } from "../libs/Errors";
import ProductService from "../models/Product.service";
import { AdminRequest } from "../libs/types/member";
import { ProductInput } from "../libs/types/product";


const productService = new ProductService()



const productController : T = {};


productController.getAllProducts = async (req: Request, res: Response) => {
    try{
        console.log("getAllProducts is working")
        const data = await productService.getAllProducts()
        console.log("data", data)
        res.render("products", { products: data });
    } catch (err){
        console.log("ERROR , getAllProducts: ",err)
        if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard.message);
        // res.json(err)
        
    }
}

productController.createNewProduct = async (req: AdminRequest, res: Response) => {
    try{
        console.log("createNewProduct")
        console.log(req.files)
        if (!req.files?.length) {
            throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);
        }

        const data: ProductInput = req.body;
        data.productImages = req.files?.map((ele) =>
            {
                return ele.path.replace(/\\/g,"/")
            })
        // console.log("data:", data)
        await productService.createNewProduct(data);
        res.send(`<script>alert("Sucsessful creation"); window.location.replace("admin/product/all")</script>`)

    } catch (err){
        console.log("ERROR , createNewProduct: ",err)
        const message =
			err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;

		res.send(
			`<script>alert('${message}'); window.location.replace("admin/product/all")</script>`
		);
        // res.json(err)
        
    }
}

productController.updateChosenProduct = async (req: Request, res: Response) => {
    try{
        console.log("updateChosenProduct")

        const id = req.params.id;
        const result = await productService.updateChosenProduct(
			id,req.body
		);
        // res.send(result)
		res.status(HttpCode.OK).json({ productData: result });
    } catch (err){
        console.log("ERROR , updateChosenProduct: ",err)
        if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard.message);
        // res.json(err)
        
    }
}
export default productController