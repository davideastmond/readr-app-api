require("dotenv").config();
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { newsRouter, authRouter, userRouter } from "./routes";

const app = express();
const httpServer = createServer(app);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: true,
    exposedHeaders: [
      "X-JWT-Token",
      "X-Renewed-JWT-Token",
      "x-renewed-jwt-token",
    ],
  })
);
app.use(bodyParser.json());

app.use("/api/news", newsRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

export default httpServer;
