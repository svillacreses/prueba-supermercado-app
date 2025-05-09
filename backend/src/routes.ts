import { Router } from "express";
import {
  crearPrecio,
  consultarPrecioFinal,
} from "./controllers/precios.controller";
import {
  crearPromocion,
  asociarPromocion,
  consultarPromociones,
} from "./controllers/promociones.controller";
import { consultarProductos } from "./controllers/productos.controller";
import {
  consultarTienda,
  consultarTiendas,
} from "./controllers/tiendas.controller";

const router = Router();

router.use(
  // Middleware para simular un delay en TODAS las peticiones
  (_, __, next) => {
    setTimeout(() => {
      next();
    }, 500);
  }
);

router.get("/productos", consultarProductos as any);
router.get("/tiendas", consultarTiendas as any);
router.get("/tiendas/:id", consultarTienda as any);
router.get("/precio-final", consultarPrecioFinal as any);
router.post("/precios", crearPrecio as any);
router.post("/promociones", crearPromocion as any);
router.get("/promociones", consultarPromociones as any);
router.post("/asociar-promocion", asociarPromocion as any);

export default router;
