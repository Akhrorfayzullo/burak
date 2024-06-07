// module js da import ,,, common js da require ishlatiladi
// import env from "..//"
import dotenv from "dotenv"
dotenv.config()
console.log("Port", process.env.PORT)
console.log("Port", process.env.MONGO_URL)