import { setDefaultResultOrder } from "dns"
setDefaultResultOrder("ipv4first")

import dotenv from "dotenv"
dotenv.config()

import fs from "fs"
import path from "path"

// Ensure upload directories exist (needed on Render — ephemeral filesystem)
const uploadDirs = ["uploads/members", "uploads/products"]
uploadDirs.forEach((dir) => {
    const fullPath = path.join(process.cwd(), dir)
    if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true })
})

import app from "./app"
import mongoose from "mongoose"

mongoose.set("strictQuery", false)

const MONGO_URL = process.env.MONGO_URL
if (!MONGO_URL) {
    console.error("MONGO_URL is missing in .env")
    process.exit(1)
}

mongoose.connect(MONGO_URL, {})
.then(() => {
    console.log("MongoDB is successfully connected")
    const PORT = process.env.PORT ?? 3003
    app.listen(PORT, function () {
        console.log("the server is successfully connected on port: ", PORT)
        console.log(`Admin project on http://localhost:${PORT}/admin \n`)
    })
})
.catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message)
    process.exit(1)
})