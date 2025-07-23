import { Router } from "express";
import * as rh from "./RequestHandler/UserRequestHandler.js"
const router=Router();


    router.route("/adduser").post(rh.adduser)
    router.route("/loginuser").post(rh.loginuser)
    router.route("/forgetuser").post(rh.forgetPassword)
    router.route("/restpassword").post(rh.reset)


export default router