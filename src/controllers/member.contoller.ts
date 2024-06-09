import {T} from "../libs/types/common"
import {Request, Response} from "express"

const memberController : T = {};

memberController.goHome = (req: Request, res: Response) => {
    try{
        res.send("Home Page")

    } catch (err){
        console.log("ERROR , goHome: ",err)
    }
}

memberController.getLogin = (req: Request, res: Response) => {
    try{
        res.send("Login Page")

    } catch (err){
        console.log("ERROR , getLogin: ",err)
    }
}

memberController.getSignup = (req: Request, res: Response) => {
    try{
        res.send("Sign Up Page")

    } catch (err){
        console.log("ERROR , getSignup: ",err)
    }
}

export default memberController