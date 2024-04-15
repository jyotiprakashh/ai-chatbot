import express from "express";
import {config} from "dotenv";
import morgan from "morgan";
import appRouter from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";

config();

const app=express();

//remove it in production...show status of code
app.use(morgan("dev"));
app.use(cors({origin:"http://localhost:5173", credentials:true}));

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/v1", appRouter);

export default app;