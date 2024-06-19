// module js da import ,,, common js da require ishlatiladi
// import env from "..//"
import dotenv from "dotenv"
import app from "./app"
dotenv.config()
// console.log("Port", process.env.PORT)
// console.log("Port", process.env.MONGO_URL)
import mongoose from "mongoose"
mongoose.connect(process.env.MONGO_URL as string, {})
.then((data) => {
    console.log("MongoDB is successfully connected")
    const PORT = process.env.PORT ?? 3003
    app.listen(PORT, function () {
        console.log("the server is successfully connected on port: ", PORT)
        console.log(`Admin project on http://localhost:${PORT}/admin \n`)
    })
})
.catch((err) => console.log("Error on connection to MongoDB",err))