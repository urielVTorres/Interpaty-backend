import { Router } from "express";
import { agregarProducto, leerProductos, finalizarCompra, obtenerReporte } from "./controllers/productoControllers.js";
const router = Router();

router.post('/agregar', agregarProducto);
router.get('/productos', leerProductos);
router.post('/compra', finalizarCompra);
router.get('/reporte', obtenerReporte);


export default router;