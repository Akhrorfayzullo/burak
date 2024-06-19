import express from "express"
import path from "path"
import router from "./router"
import routerAdmin from "./routerAdmin"
import morgan from "morgan"
import { MORGAN_FORMAT } from "./libs/config"

//1 Enterance
const app = express()
// console.log("__dirname: ", __dirname)
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(morgan(MORGAN_FORMAT)) 
//middleware design pattern

//2 Session

//3 views
app.set("views",path.join(__dirname,"views"))
app.set("views engine", "ejs")

//4 Routers
app.use("/admin", routerAdmin) // BSSR : ejs SSR 
app.use("/", router)           // SPA: React SPA

export default app