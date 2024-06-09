import express from "express"
import path from "path"
import router from "./router"
import routerAdmin from "./routerAdmin"

//1 Enterance
const app = express()
// console.log("__dirname: ", __dirname)
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//2 Session

//3 views
app.set("views",path.join(__dirname,"views"))
app.set("views engine", "ejs")

//4 Routers
app.use("/admin", routerAdmin) // BSSR : ejs
app.use("/", router)           // SPA: React

export default app