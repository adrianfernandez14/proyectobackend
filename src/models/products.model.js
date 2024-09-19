import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'; // Importa el plugin

const fiambresCollection = "fiambres";

// Definimos el Schema.
const fiambresSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    marca: { type: String, required: true }
});

// Aplica el plugin de paginación al schema
fiambresSchema.plugin(mongoosePaginate);

// Definimos el modelo.
const fiambresModel = mongoose.model(fiambresCollection, fiambresSchema);

export default fiambresModel;
