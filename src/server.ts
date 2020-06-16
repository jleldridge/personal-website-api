import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "./jwt";
import errorHandler from "./error";
import admin from "./admin";
import home from "./content/home";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());
app.use("/admin", admin);
app.use("/content/home", home);
app.use(errorHandler);

console.log("server started!");
app.listen(9000);
