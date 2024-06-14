import {T} from "../libs/types/common"
import {Request, Response} from "express"
import MemberService from "../models/Member.service";
import { MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";

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
        console.log("GoLogin")
    } catch (err){
        console.log("ERROR , getLogin: ",err)
    }
}

restaurantController.getSignup = (req: Request, res: Response) => {
    try{
        res.send("Sign Up Page")
        console.log("GoSignup")
    } catch (err){
        console.log("ERROR , getSignup: ",err)
    }
}
// *************************
restaurantController.processLogin = (req: Request, res: Response) => {
    try{
        console.log("processLogin")
        res.send("Done processLogin Method Post")
        

    } catch (err){
        console.log("ERROR , processLogin: ",err)
    }
}

// *************************
restaurantController.processSignup = async (req: Request, res: Response) => {
    try{
        console.log("processSignup")
        console.log("body", req.body)

        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.RESTAURANT;



        const memberService = new MemberService()
        const result = await memberService.processSignup(newMember)



        
        // const result = await memberService.processSignup(newMember);

        // res.send(result)
        res.send(result)
        console.log("processSignup!");
    } catch (err){
        res.send(err)
        console.log("ERROR , processSignup: ",err)
    }
}

export default restaurantController