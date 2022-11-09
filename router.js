import { Router } from "express";
import { 
    agregarProducto, 
    registrarUsuario,
    iniciarSesion, 
    leerProductos, 
    leerProducto, 
    finalizarCompra, 
    obtenerReporte, 
    eliminarProducto, 
    editarProducto
} from "./controllers/productoControllers.js";
const router = Router();

//----------Rutas Publicas----------------
router.post('/signup', registrarUsuario);
router.post('/login', iniciarSesion);

//----------Rutas Privadas----------------
router.get('/', (req, res)=>{
    res.send('Welcome');
})
router.post('/agregar', agregarProducto);
router.get('/productos', leerProductos);
router.get('/producto/:id', leerProducto);
router.post('/compra', finalizarCompra);
router.post('/reporte', obtenerReporte);
router.route('/producto/:id').delete(eliminarProducto).put(editarProducto);


export default router;