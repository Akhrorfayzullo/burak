import express from "express"
import memberController from "./controllers/member.contoller";
import makeUploader from "./libs/utils/uploader";
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

router.post(
	"/member/update",
	memberController.verifyAuth,
	makeUploader("members").single("memberImage"),
	memberController.updateMember
);

router.get("/member/top-users", memberController.getTopUsers)


export default router