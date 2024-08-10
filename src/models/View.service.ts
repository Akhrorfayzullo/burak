import Errors, { HttpCode, Message } from "../libs/Errors";
import { View, ViewInput } from "../libs/types/view";
import ViewModel from "../schema/View.model";

class ViewService {
	private readonly viewModel;

	constructor() {
		this.viewModel = ViewModel;
	}

	public async checkIfViewExistence(input: ViewInput): Promise<View> {
		const view = await this.viewModel
			.findOne({
				memberId: input.memberId,
				viewRef: input.viewRefId,
			})
			.exec();

		console.log("checkViewExistence view ", view);

		return view;
	}

	public async insertMemberView(input: ViewInput): Promise<View> {
		try {
			const result = this.viewModel.create(input);
			console.log("insertMemberView", result);
			return result;
		} catch (error) {
			console.log("Error  View.service.ts", error);
			throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
		}
	}
}

export default ViewService;