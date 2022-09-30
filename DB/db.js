import mongoose from "mongoose";

const db = mongoose;

const conectarDB = () => {
    try {
        db.connect(process.env.DB_URL);
        console.log("base de datos conectada");
    } catch (error) {
        console.log(error);
    }
}

export default conectarDB;