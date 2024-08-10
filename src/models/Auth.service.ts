import { AUTH_TIMER } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { Member } from "../libs/types/member";
import jwt  from "jsonwebtoken";
class AuthService {
    private readonly secretToken;
    constructor() {
        this.secretToken = process.env.SECRET_TOKEN as string
    }

    public async createToken(payload: Member){
        return new Promise((resolve, reject) => {
            const duration = `${AUTH_TIMER}h`;
            
            jwt.sign(
                payload,
                process.env.SECRET_TOKEN as string,
                {
                    expiresIn: duration,
                },
                (err, token ) => {
                    if (err)
                        reject(
                            new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_CREATION_FAILED)
                         );
                    else resolve(token as string)
                }
            );
        });
    }


    public async checkAuth(token: string): Promise<Member> {
        console.log("Passed here 2")
	
		const result: Member = (await jwt.verify(
			token,
			process.env.SECRET_TOKEN as string
		)) as Member;
        console.log("memberNick", result.memberNick)
        console.log("Passed here 3")
		return result;
	}
}
export default AuthService