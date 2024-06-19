import {T} from "../libs/types/common"
import {Request, Response} from "express"
import MemberService from "../models/Member.service";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors from "../libs/Errors";

const memberService = new MemberService()

const memberController : T = {};

memberController.signup = async (req: Request, res: Response) => {
    try{
        console.log("Signup")
        const input: MemberInput = req.body,

            result : Member = await memberService.signup(input);


        res.json({member : result})
    } catch (err){
        console.log("ERROR , signup: ",err)
        if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard.message);
        // res.json(err)
        
    }
}

memberController.login = async (req: Request, res: Response) => {
    try{
        console.log("Login")
        
        const input : LoginInput = req.body,
          result = await memberService.login(input);
        res.json({member : result});
    } catch (err){

        console.log("ERROR , login: ",err)
        // res.json(err)
    }
}

// *************************


export default memberController