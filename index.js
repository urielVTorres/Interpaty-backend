import  Express  from "express";
import router from "./router.js";
import conectarDB from "./DB/db.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = Express();
const PORT = process.env.PORT || 4000;

//Conectar con la base de datos
conectarDB();

//Otorgar permisos de CROD a la dirección del frontend
const dominiosPermitidos = [process.env.FRONTEND_URL, process.env.FRONTEND_URL_MOBILE];

const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            callback(null, true);
        } else {
            callback(new Error("No permitido por CORS"));
        }
    }
}
app.use(cors(corsOptions));
//Conectar con las rutas
app.use(bodyParser.json());
app.use('/', router);
//Conectar con el puerto
app.listen(PORT, ()=>{
    console.log(`Servidor conectado en el puerto ${PORT}`);
});