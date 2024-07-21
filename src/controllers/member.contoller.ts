import {T} from "../libs/types/common"
import {NextFunction, Request, Response} from "express"
import MemberService from "../models/Member.service";
import { ExtendedRequest, LoginInput, Member, MemberInput, MemberUpdateInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/config";

const memberService = new MemberService()
const authService = new AuthService()

const memberController : T = {};

memberController.getRestaurant = async (req: Request, res: Response) => {
	try {
		console.log("gerRestaurant");

		const result = await memberService.getRestaurant();
		res.status(HttpCode.OK).json(result);
	} catch (err: any) {
		if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard.message);
	}
};

memberController.signup = async (req: Request, res: Response) => {
    try{
        console.log("Signup")
        const input: MemberInput = req.body;

        const result : Member = await memberService.signup(input);

        const token = await authService.createToken(result);
        res.cookie("accesToken",token,{
            maxAge: AUTH_TIMER * 3600 * 1000,
            httpOnly: false,
        });

        console.log("token: >>>",token)
        res.status(HttpCode.CREATED).json({member : result, accesToken: token});
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
          result = await memberService.login(input),
          token = await authService.createToken(result);

        res.cookie("accessToken",token,{
            maxAge: AUTH_TIMER * 3600 * 1000,
            httpOnly: false,
        });

        console.log("token: >>>",token)
        res.status(HttpCode.OK).json({member : result, accessToken: token});
    } catch (err: any) {
		console.log("Error on login", err.message);
		if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard.message);		
	}
}

memberController.getMemberDetail = async (
	req: ExtendedRequest,
	res: Response
) => {
	try {
		console.log("getMemberDetail");
		const result = await memberService.getMemberDetail(req.member);

		res.status(HttpCode.OK).json(result);
	} catch (err: any) {
		console.log("Error  getMemberDetail", err.message);
		if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard.message);
	}
};

memberController.logout = (req: ExtendedRequest, res: Response) => {
	try {
		console.log("logout");
		res.cookie("accessToken", null, { maxAge: 0, httpOnly: true });
		res.status(HttpCode.OK).json({ logout: true });
	} catch (err: any) {
		console.log("Error Logout", err.message);
		if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard.message);
	}
};

memberController.updateMember = async (req: ExtendedRequest, res: Response) => {
	try {
		console.log("updateMember");
		const input: MemberUpdateInput = req.body;

		if (req.file) {
			input.memberImage = req.file.path.replace(/\\/, "/");
		}

		const result = await memberService.updateMember(req.member, input);

		res.status(HttpCode.OK).json({ result });
	} catch (err: any) {
		console.log("Error: updateMember", err.message);
		if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard.message);
	}
};

memberController.getTopUsers = async (req: Request, res: Response) => {
	try {
		console.log("getTopUsers");

		const result = await memberService.getTopUsers();
		console.log("getTopUsers", result);
		res.status(HttpCode.OK).json(result);
	} catch (err: any) {
		console.log("Error: getTopUsers", err.message);
		if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard.message);
	}
};

memberController.verifyAuth = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try{
        const token = req.cookies["accessToken"];
        console.log("Passed here 1")
        if (token)  req.member = await authService.checkAuth(token);
        if (!req.member) 
			throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);
		console.log("Passed here 4")
        next();

    } catch (err){
        console.log("Error on verifyAuth", err);
		if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard.message);
    }

}
memberController.retrieveAuth = async (
	req: ExtendedRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.cookies["accessToken"];
		if (token) {
			req.member = await authService.checkAuth(token);
		}
		next();
	} catch (err) {
		console.log("Error, retrieveAuth:", err);
		next();
	}
};

// *************************


export default memberController