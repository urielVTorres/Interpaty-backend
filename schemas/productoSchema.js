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
    }
});
export const Producto = mongoose.model('Producto', productoSchema);
export const Venta = mongoose.model('Venta', ventaSchema);
