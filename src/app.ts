import cors from "cors"
import express from "express"
import path from "path"
import router from "./router"
import routerAdmin from "./routerAdmin"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import { MORGAN_FORMAT } from "./libs/config"
import dotenv from "dotenv";
dotenv.config();
import { T } from "./libs/types/common"

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";

const MongoDBStore = ConnectMongoDB(session);

const store = new MongoDBStore({
	uri: String(process.env.MONGO_URL),
	collection: "sessions",
});

//1 Enterance
const app = express()
app.use(express.static(path.join(__dirname, "public")))
app.use("/uploads", express.static("./uploads"))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
const allowedOrigins = process.env.CLIENT_URL
	? process.env.CLIENT_URL.split(",")
	: ["http://localhost:3000", "http://localhost:3001"];
app.use(cors({ credentials: true, origin: allowedOrigins }))
app.use(cookieParser())
app.use(morgan(MORGAN_FORMAT)) 
//middleware design pattern

//2 Session

app.use(
	session({
		secret: String(process.env.SESSION_SECRET),
		cookie: {
			maxAge: 6 * 3600 * 1000, // 6 hours in ms
		},
		store: store,
		resave: true,
		saveUninitialized: true,
	})
);

app.use(function(req,res,next){
	const sessionInstance = req.session  as T;
	res.locals.member = sessionInstance.member;
	next();
})

//3 views

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//4 Routers
app.use("/", router)           // SPA: React SPA
app.use("/admin", routerAdmin) // BSSR : ejs SSR 


export default app