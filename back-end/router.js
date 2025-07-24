import { Router } from "express";
import * as rh from "./RequestHandler/UserRequestHandler.js"
import * as ad from "./RequestHandler/ProductRequstHandler.js"
import Auth from "./middleware/auth.js";



const router=Router();


    router.route("/adduser").post(rh.adduser)
    router.route("/loginuser").post(rh.loginuser)
    router.route("/forgetuser").post(rh.forgetPassword)
    router.route("/restpassword").post(rh.reset)
    router.route("/home").get(Auth,rh.Home);


    router.route("/addproduct").post(ad.addproduct)
    router.route("/fetchproduct").get(ad.fetchproduct)
    router.route("/searchproduct").post(ad.searchproduct)
    router.route("/productview").post(ad.singleproduct)

    
    router.route("/addwishlist").post(ad.addwishlist)
    router.route("/fetchwishlist").post(ad.fetchwishlist)
    router.route("/removewishlist").post(ad.removewishlist)


    router.route("/category/add").post(ad.createcategory)
    router.route("/category/fetch").get(ad.fetchcategory)
    router.route("/subcategory/add").post(ad.createsubcategory)
    router.route("/subcategory/fetch").post(ad.fetchsubcategory)




export default router