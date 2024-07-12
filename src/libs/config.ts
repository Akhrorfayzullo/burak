export const MORGAN_FORMAT = ':method :url :response-time [:status] \n'

import { Types } from "mongoose";
export const shapeIntoMongooseObjectId = (target: any) => {
	return typeof target === "string" ? new Types.ObjectId(target) : target;
};