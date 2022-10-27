import mongoose from "mongoose";


const conectarDB = async () => {
    try {
        const db = mongoose.connect(process.env.DB_URL, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("base de datos conectada");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default conectarDB;