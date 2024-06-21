import {T} from "../libs/types/common"
import {Request, Response} from "express"
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";



const restaurantController : T = {};
const memberService = new MemberService()

restaurantController.goHome = (req: Request, res: Response) => {
    try{
        console.log("GoHome")
        res.render("home")
        //send | json | redirect | end | render

    } catch (err){
        console.log("ERROR , goHome: ",err)
    }
}

restaurantController.getLogin = (req: Request, res: Response) => {
    try{
        res.render("login")
        console.log("GoLogin")
    } catch (err){
        console.log("ERROR , getLogin: ",err)
    }
}

restaurantController.getSignup = (req: Request, res: Response) => {
    try{
        res.render("signup")
        console.log("GoSignup")
    } catch (err){
        console.log("ERROR , getSignup: ",err)
    }
}
// *************************
restaurantController.processLogin = async (req: AdminRequest, res: Response) => {
    try{
        console.log("processLogin")
        
        console.log("body", req.body)
        const input : LoginInput = req.body
        
        const result = await memberService.processLogin(input)
        req.session.member = result;
		req.session.save(() => {
			res.send(result);
		});

        
        // res.send(result)
    } catch (err){

        console.log("ERROR , processLogin: ",err)
        res.send(err)
    }
}

// *************************
restaurantController.processSignup = async (req: AdminRequest, res: Response) => {
    try{
        console.log("processSignup")
        console.log("body", req.body)

        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.RESTAURANT;

        
        const result = await memberService.processSignup(newMember)
        //TODO: session
        req.session.member = result;
		req.session.save(() => {
			res.send(result);
		});



        
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