import express from "express"
import memberController from "./controllers/member.contoller";
const router = express.Router();

router.post("/member/login",memberController.login);

router.post("/member/signup",memberController.signup);

router.post(
	"/member/logout",
	memberController.verifyAuth,
	memberController.logout
);
router.get(
	"/member/detail",
	memberController.verifyAuth,
	memberController.getMemberDetail
);



export default router