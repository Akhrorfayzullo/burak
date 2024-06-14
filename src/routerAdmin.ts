import express from "express"
import restaurantController from "./controllers/restaurant.controller";
const routerAdmin = express.Router();
//Restaurant

routerAdmin.get("/", restaurantController.goHome)

routerAdmin
    .get("/login",restaurantController.getLogin)
    .post("/login",restaurantController.processLogin)

routerAdmin
    .get("/signup",restaurantController.getSignup)
    .post("/signup",restaurantController.processSignup)

//Product

//User

export default routerAdmin