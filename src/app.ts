import express from "express"
import path from "path"

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

export default app