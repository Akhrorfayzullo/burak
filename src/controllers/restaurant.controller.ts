import {T} from "../libs/types/common"
import {NextFunction, Request, Response} from "express"
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode } from "../libs/Errors";
import { Message } from "../libs/Errors";



const restaurantController : T = {};
const memberService = new MemberService()

restaurantController.goHome = (req: Request, res: Response) => {
    try{
        console.log("GoHome")
        res.render("home")
        //send | json | redirect | end | render

    } catch (err){
        res.redirect("/admin")
        console.log("ERROR , goHome: ",err)
    }
}

restaurantController.getLogin = (req: Request, res: Response) => {
    try{
        res.render("login")
        console.log("GoLogin")
    } catch (err){
        res.redirect("/admin")
        console.log("ERROR , getLogin: ",err)
    }
}

restaurantController.getSignup = (req: Request, res: Response) => {
    try{
        res.render("signup")
        console.log("GoSignup")
    } catch (err){
    
        console.log("ERROR , getSignup: ",err)
        res.redirect("/admin")
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
			res.redirect("/admin/product/all");
		});

        
        // res.send(result)
    } catch (err){

        console.log("ERROR , processLogin: ",err)
        const message =
			err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
		res.send(
			`<script>alert(${message}); window.location.replace("/admin/login")</script>`
		);
    }
}

// *************************
restaurantController.processSignup = async (req: AdminRequest, res: Response) => {
    try{
        console.log("processSignup")
		const file = req.file
		if (!file) {
			throw new Errors(HttpCode.BAD_REQUEST,Message.SOMETHING_WENT_WRONG);
			
		}
        const newMember: MemberInput = req.body;

		newMember.memberImage = file?.path.replace(/\\/g, "/")
        newMember.memberType = MemberType.RESTAURANT;

        
        const result = await memberService.processSignup(newMember)
        //TODO: session
        req.session.member = result;
		req.session.save(() => {
			// res.send("ok")
			res.redirect("/admin/product/all");
		});

        // res.send(result)
        console.log("processSignup!");
    } catch (err){
        
        console.log("ERROR , processSignup: ",err)
        const message =
			err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
		res.send(
			`<script>alert('${message}'); window.location.replace("/admin/signup")</script>`
		);
    }
}

restaurantController.checkAuthSession = async (
	req: AdminRequest,
	res: Response
) => {
	try {
		console.log("checkAuthSession");

		if (req.session?.member) {
			// res.send(`HI, ${req.session.member.memberNick}`);
			res.send(`<script>alert(${req.session.member.memberNick})</script>`);
		} else {
			// res.send(Message.NOT_AUTHENTICATED);
			res.send(`<script>alert(${Message.NOT_AUTHENTICATED})</script>`);
		}
	} catch (err: any) {
		console.log("Error on processLogin:", err.message);
		res.send(err);
	}
};

restaurantController.logout = async (req: AdminRequest, res: Response) => {
	try {
		console.log("req.body: ", req.body);
		req.session.destroy(() => {
			res.redirect("/admin");
			
		});
	} catch (err: any) {
		console.log("Error on adminLogout:", err.message);
		res.redirect("/admin");
	}
};

restaurantController.getUsers = async (req: Request, res: Response) => {
    try{
        console.log("getUsers");
		const result = await memberService.getUsers();
		console.log("result: ", result)
		res.render("users", {users: result})
    } catch (err){
		console.log("ERROR , getUsers: ",err)
        res.redirect("/admin/login")
    }
}

restaurantController.updateChosenUser = async (req: Request, res: Response) => {
    try{
        console.log("updateChosenUser")
		const result  = await memberService.updateChosenUser(req.body);

		res.status(HttpCode.OK).json({data: result})
    } catch (err){
		console.log("ERROR , updateChosenUser: ",err)
        if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard.message);
    }
}

restaurantController.verifyRestaurant =  (
	req: AdminRequest,
	res: Response,
	next: NextFunction
) => {
	if (req.session?.member?.memberType === MemberType.RESTAURANT) {
		req.member = req.session.member;
		next();
	} else {
		const message = Message.NOT_AUTHENTICATED;
		res.send(
			`<script>alert('${message}'); window.location.replace('/admin/login')</script>`
		);
	}
};
export default restaurantController