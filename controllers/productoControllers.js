import {Producto, Venta} from "../schemas/productoSchema.js";

const agregarProducto = async (req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    const {concepto, precio, categoria } = req.body;
    console.log(req.body);
    if([concepto, precio, categoria].includes('')){
        return res.json({msg: "El nombre, el precio y la categoría son obligatorios" , error: true});
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
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const productos = await Producto.find({});
        return res.json(productos);
    } catch (error){
        res.status(404).json({msg:"No fue posible conectar con el servidor", error:true});

    }
}

const finalizarCompra = async (req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
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
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const reporte = await Venta.find({});
        return res.json(reporte);
    } catch(error) {
        console.log(error);
        return res.status(404).json({msg: "Hubo un error :O ", error:true});
    }
}

const eliminarProducto = async (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    const producto = await Producto.findById(req.body.id);
    console.log(producto);
    if(!producto) {
        return res.status(404).json({msg: "Producto no encontrado"});
    }
    if(producto.id.toString() !== req._id.toString){
    return res.json({msg: "Acción no valida"});
    }

    try {
        await producto.deleteOne();
        return res.json({msg: "Producto eliminado"});
    } catch (error) {
        console.log(error);
    }
    
}

export {
    agregarProducto,
    leerProductos,
    finalizarCompra,
    obtenerReporte,
    eliminarProducto
}