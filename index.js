import  Express  from "express";
import router from "./router.js";
import conectarDB from "./DB/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = Express();
const PORT = process.env.PORT || 4000;


app.use(Express.json());
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

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', dominiosPermitidos);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Conectar con las rutas
app.use('/', router);
//Conectar con el puerto
app.listen(PORT, ()=>{
    console.log(`Servidor conectado en el puerto ${PORT}`);
});