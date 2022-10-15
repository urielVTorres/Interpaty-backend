import { Router } from "express";
import { agregarProducto, leerProductos, finalizarCompra, obtenerReporte, eliminarProducto } from "./controllers/productoControllers.js";
const router = Router();

router.post('/agregar', agregarProducto);
router.get('/productos', leerProductos);
router.post('/compra', finalizarCompra);
router.get('/reporte', obtenerReporte);
// router.delete('/productos', eliminarProducto);


export default router;