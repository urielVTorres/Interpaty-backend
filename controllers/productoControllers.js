import {Producto, Venta} from "../schemas/productoSchema.js";

const agregarProducto = async (req, res)=>{
    const {concepto, precio } = req.body;
    console.log(req.body);
    if([concepto, precio].includes('')){
        return res.json({msg: "El nombre y el precio son obligatorios" , error: true});
    }
    try {
        //Agregar el producto a la base de datos con la información del formulario
        const nuevoProducto = new Producto(req.body);
        nuevoProducto.save();

        //Enviar respuesta positiva
        return res.json({msg:"El producto ha sido añadido"});
    } catch (error) {
        return res.status(400).json({msg:"No se pudo", error:true});
    }
}

const leerProductos = async (req, res) => {
    try {
        const productos = await Producto.find({});
        return res.json(productos);
    } catch (error){
        res.status(404).json({msg:"No fue posible conectar con el servidor", error:true});

    }
}

const finalizarCompra = async (req, res)=>{
    try {
        const carrito = new Venta(req.body);
        carrito.save();
        return res.json({msg: "¡Compra Finalizada!"});
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg: "¡Ocurrió un error :O!", error:true});
    }
}

const obtenerReporte = async (req, res)=>{
    try {
        const reporte = await Venta.find({});
        return res.json(reporte);
    } catch(error) {
        console.log(error);
        return res.status(404).json({msg: "Hubo un error :O ", error:true});
    }
}

export {
    agregarProducto,
    leerProductos,
    finalizarCompra,
    obtenerReporte
}