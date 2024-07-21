export const MORGAN_FORMAT = ':method :url :response-time [:status] \n'
export const AUTH_TIMER = 24
import { Types } from "mongoose";
export const shapeIntoMongooseObjectId = (target: any) => {
	return typeof target === "string" ? new Types.ObjectId(target) : target;
};
