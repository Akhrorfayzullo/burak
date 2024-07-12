import express from "express"
import path from "path"
import router from "./router"
import routerAdmin from "./routerAdmin"
import morgan from "morgan"
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
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(morgan(MORGAN_FORMAT)) 
//middleware design pattern

//2 Session

app.use(
	session({
		secret: String(process.env.SESSION_SECRET),
		cookie: {
			maxAge: 3600 * 3600 * 6, // 3hours. 
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
app.use("/admin", routerAdmin) // BSSR : ejs SSR 
app.use("/", router)           // SPA: React SPA

export default app