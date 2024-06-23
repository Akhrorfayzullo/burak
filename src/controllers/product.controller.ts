import { T } from "../libs/types/common";
import {Request, Response} from "express"
import Errors from "../libs/Errors";
import ProductService from "../models/Product.service";
import { AdminRequest } from "../libs/types/member";


const memberService = new ProductService()



const productController : T = {};


productController.getAllProducts = async (req: Request, res: Response) => {
    try{
        console.log("getAllProducts is working")
        // console.log("reqwest member ", req.member)
        res.render("products")
    } catch (err){
        console.log("ERROR , getAllProducts: ",err)
        if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard.message);
        // res.json(err)
        
    }
}

productController.createNewProduct = async (req: Request, res: Response) => {
    try{
        console.log("createNewProduct")
        res.send("Done")
    } catch (err){
        console.log("ERROR , createNewProduct: ",err)
        if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard.message);
        // res.json(err)
        
    }
}

productController.updateChosenProduct = async (req: Request, res: Response) => {
    try{
        console.log("updateChosenProduct")
    } catch (err){
        console.log("ERROR , updateChosenProduct: ",err)
        if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard.message);
        // res.json(err)
        
    }
}
export default productController