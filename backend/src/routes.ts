import { Router } from "express";
import {
  crearPrecio,
  consultarPrecioFinal,
} from "./controllers/precios.controller";
import {
  crearPromocion,
  asociarPromocion,
} from "./controllers/promociones.controller";
import { consultarProductos } from "./controllers/productos.controller";
import { consultarTiendas } from "./controllers/tiendas.controller";

const router = Router();

router.get("/productos", consultarProductos as any);
router.get("/tiendas", consultarTiendas as any);
router.get("/precio-final", consultarPrecioFinal as any);
router.post("/precios", crearPrecio as any);
router.post("/promociones", crearPromocion as any);
router.post("/asociar-promocion", asociarPromocion as any);

export default router;
