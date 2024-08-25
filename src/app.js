import express from "express";
const app = express();
const PUERTO = 8080;
import exphds from "express-handlebars";

import mongoose from "mongoose";
import orderModel from "./models/";
const main = async() => {
    mongoose.connect("mongodb+srv://adrianfernandez:coderhouse@cluster0.uetamcp.mongodb.net/Fiambreria");
    const resultado = await orderModel.aggregate([

    ])
}

//Middleware:

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");