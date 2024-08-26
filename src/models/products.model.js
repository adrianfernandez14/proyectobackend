import mongoose, { Schema } from "mongoose";
const fiambresCollection = "fiambres";

//Definimos el Schema.
const fiambresSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    stock: Number,
    marca: String
})
//Definimos el modelo.
const fiambresModel = mongoose.model(fiambresCollection, fiambresSchema);


export default fiambresModel;