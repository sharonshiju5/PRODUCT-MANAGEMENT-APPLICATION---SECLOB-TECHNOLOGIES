import { Router } from "express";
import * as rh from "./RequestHandler/UserRequestHandler.js"
const router=Router();


    router.route("/adduser").post(rh.adduser)
    router.route("/loginuser").post(rh.loginuser)


export default router