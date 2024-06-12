import {T} from "../libs/types/common"
import {Request, Response} from "express"
import MemberService from "../models/Member.service";

const restaurantController : T = {};

restaurantController.goHome = (req: Request, res: Response) => {
    try{
        console.log("GoHome")
        res.send("Home Page")
        //send | json | redirect | end | render

    } catch (err){
        console.log("ERROR , goHome: ",err)
    }
}

restaurantController.getLogin = (req: Request, res: Response) => {
    try{
        res.send("Login Page")

    } catch (err){
        console.log("ERROR , getLogin: ",err)
    }
}

restaurantController.getSignup = (req: Request, res: Response) => {
    try{
        res.send("Sign Up Page")

    } catch (err){
        console.log("ERROR , getSignup: ",err)
    }
}

restaurantController.processLogin = (req: Request, res: Response) => {
    try{
        console.log("processLogin")
        res.send("Done processLogin Method Post")
        

    } catch (err){
        console.log("ERROR , processLogin: ",err)
    }
}

restaurantController.processSignup = (req: Request, res: Response) => {
    try{
        console.log("processSignup")
        res.send("Done processSignup Method Post")
        

    } catch (err){
        console.log("ERROR , processSignup: ",err)
    }
}

export default restaurantController