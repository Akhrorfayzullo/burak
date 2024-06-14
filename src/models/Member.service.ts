import MemberModel from "../schema/Member.model";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { Member, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";

class MemberService {
	private readonly memberModel;

	constructor() {
		this.memberModel = MemberModel;
	}
	public async processSignup (input: MemberInput) : Promise<Member> {
		const exist = await this.memberModel
			.findOne({ memberType: MemberType.RESTAURANT })
			.exec();
		console.log("exist", exist)
		if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
		try {
			// console.log("passed here")
			const result = await this.memberModel.create(input);
			// const tempReuslt = new this.memberModel(input);
			// const result = await tempReuslt.save();
			result.memberPassword = ""
			return result
		} catch (err) {
			throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
			
		}
		
	}

	
}

export default MemberService;