import mongoose, { Schema } from "mongoose";

const productoSchema = new mongoose.Schema({
    
    concepto: {
        type: String,
        required: true
    },
    
    precio: {
        type: Number,
        required: true
    },
    
    unidad: {
        type: String,
        default: "c/u"
    },

    cantidad: Number,

    imagen: String,
    
    linked: String,

    categoria: {
        type: String
    }
});

const ventaSchema = new mongoose.Schema({
    lista: [
        productoSchema,
       
    ],
    total: Number,
    fecha: {
        type: Date,
        default: ()=>{
            return Date.now() - 5*60*60*1000;
        }
    },
    vendedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

const usuarioSchema = new mongoose.Schema({
    nombres: {
        type: String,
        required: true,
        trim: true
    },
    apellidos: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    // token: {
    //     type: String,
    //     default: ()=>{return Date.now().toString(32) + Math.random().toString(32).substring(2)}
    // }

});

export const Producto = mongoose.model('Producto', productoSchema);
export const Venta = mongoose.model('Venta', ventaSchema);
export const Usuario = mongoose.model('Usuario', usuarioSchema);
