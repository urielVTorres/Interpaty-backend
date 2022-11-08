import {Producto, Venta, Usuario} from "../schemas/productoSchema.js";

const registrarUsuario = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const {nombres, apellidos, email, contraseña} = req.body.data;
    if([nombres, apellidos, email, contraseña].includes('')){
        return res.json({msg: "Todos los campos son obligatorios", error:true});
    }
    const existeUsuario = await Usuario.findOne({email:email});

    if(existeUsuario)
        return res.status(400).json({msg:"Este correo ya está vinculado a una cuenta", error: true});

    try {
        const usuario = new Usuario(req.body.data);
        usuario.save();
        return res.json({msg: "¡Usuario Registrado!"});
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg: "¡Ocurrió un error :O!", error:true});
    }
}

const iniciarSesion = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const {email, password} = req.body.data;
    if([email, password].includes('')){
        return res.json({msg:"Todos los campos son obligatorios", error: true});
    }

    try {
        const usuario = await Usuario.findOne({email: email});
        
        if(!usuario)
            return res.json({msg:"Este correo no se encuentra registrado.", error:true});
        
        if(password !== usuario.password)
            return res.json({msg:"Contraseña incorrecta", error: true});
        
        return res.json({
            _id: usuario._id,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg:"Ocurrió un error de conexión D:", error: true})
    }
    
}

const agregarProducto = async (req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    const {concepto, precio, categoria } = req.body.data;
    if([concepto, precio, categoria].includes('')){
        return res.json({msg: "El nombre, el precio y la categoría son obligatorios" , error: true});
    }
    try {
        //Agregar el producto a la base de datos con la información del formulario
        const nuevoProducto = new Producto(req.body.data);
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

const leerProducto = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const productos = await Producto.findById(req.params.id);
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

const editarProducto = async (req, res) => {
    console.log("modificando1");
    res.header("Access-Control-Allow-Origin", "*");
    const producto = await Producto.findById(req.params.id);
    if(!producto)
        return res.status(400).json({msg: "Producto no encontrado"});
    //actualizar producto
    producto.concepto = req.body.data.concepto || producto.concepto;
    producto.precio = req.body.data.precio || producto.precio;
    producto.categoria = req.body.data.categoria || producto.categoria;
    producto.linked = req.body.data.linked || producto.linked;
    console.log("modificando3");
    console.log(producto)
    try {
        const productoActualizado = await producto.save();
        console.log("modificando4");
        return res.json({msg: "¡Producto Actualizado!"});
    } catch (error){
        console.log(error);
    }
    return res.json(producto);
}


const eliminarProducto = async (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    const producto = await Producto.findById(req.params.id);
    
    if(!producto) {
        return res.status(404).json({msg: "Producto no encontrado"});
    }
    if(producto._id.toString() !== req.params.id){
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
    registrarUsuario,
    iniciarSesion,
    agregarProducto,
    leerProductos,
    finalizarCompra,
    obtenerReporte,
    eliminarProducto,
    editarProducto,
    leerProducto
}