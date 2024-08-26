import express from "express";
const app = express();
const PUERTO = 8080;
import exphbs from "express-handlebars";
import mongoose from "mongoose";
import fiambresModel from "./models/products.model.js";
import cartsRoutes from "./routes/carts.routes.js";
import productRoutes from "./routes/products.routes.js";


//Middleware:

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use("/api/products", productRoutes);
app.use("/api/carts", cartsRoutes);

//Listen:

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});

//Rutas:
app.get("/fiambres", async (req, res) => {
    let page = 1;
    let  limit = 2;
    try{
        
        
        const listadoFiambres = await fiambresModel.paginate({}, {limit, page});
        
        
        const fiambresResultadoFinal = listadoFiambres.docs.map(fiambres => {
            const {_id, ...rest} = fiambres.toObject();
            return rest;
        })
        
        res.render("fiambres", {
            fiambres: listadoFiambres.docs,
            hasPrevPage: listadoFiambres.hasPrevPage,
            hasNextPage: listadoFiambres.hasNextPage,
            prevPage: listadoFiambres.prevPage,
            nextPage: listadoFiambres.nextPage,
            currentPages: listadoFiambres.page,
            totalPages: listadoFiambres.totalPages
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Error")
    }
    
})

const main = async() => {
    mongoose.connect("mongodb+srv://adrianfernandez:coderhouse@cluster0.uetamcp.mongodb.net/Fiambreria");

}

main();