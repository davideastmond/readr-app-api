require("dotenv").config();
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { newsRouter } from "./routes";
const app = express();
const httpServer = createServer(app);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: true,
    exposedHeaders: ["X-JWT-Token", "X-Renewed-JWT-Token"],
  })
);
app.use(bodyParser.json());

app.use("/api/news", newsRouter);
export default httpServer;
