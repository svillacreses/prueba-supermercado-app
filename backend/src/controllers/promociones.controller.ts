import { Request, Response } from "express";
import pool from "../db";
import { promocionSchema, relacionSchema } from "../schemas/promocion.schema";
import {
  existenProductos,
  existenTiendas,
  existePromocion,
} from "../utils/validaciones";

export async function crearPromocion(req: Request, res: Response) {
  const result = promocionSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }

  const { nombre, descuento, inicio, fin } = result.data;
  const client = await pool.connect();

  try {
    await client.query(
      `INSERT INTO promociones (nombre, descuento, inicio, fin)
       VALUES ($1, $2, $3::timestamp, $4::timestamp)`,
      [nombre, descuento, inicio, fin]
    );

    res.status(201).json({ message: "Promoción creada correctamente" });
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    client.release();
  }
}

export async function asociarPromocion(req: Request, res: Response) {
  const result = relacionSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }

  const { promocion_id, tiendas, productos } = result.data;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const hayPromocion = await existePromocion(client, promocion_id);
    if (!hayPromocion) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "La promoción no existe." });
    }

    const hayTiendas = await existenTiendas(client, tiendas);
    if (!hayTiendas) {
      await client.query("ROLLBACK");
      return res.status(400).json({ error: "Una o más tiendas no existen." });
    }

    const hayProductos = await existenProductos(client, productos);
    if (!hayProductos) {
      await client.query("ROLLBACK");
      return res.status(400).json({ error: "Uno o más productos no existen." });
    }

    // Asociamos las tiendas
    for (const tienda_id of tiendas) {
      await client.query(
        `INSERT INTO promociones_tiendas (promocion_id, tienda_id)
         VALUES ($1, $2)`,
        [promocion_id, tienda_id]
      );
    }

    // Asociamos los productos
    for (const producto_id of productos) {
      await client.query(
        `INSERT INTO promociones_productos (promocion_id, producto_id)
         VALUES ($1, $2)`,
        [promocion_id, producto_id]
      );
    }

    await client.query("COMMIT");
    res.status(201).json({ message: "Promoción asociada correctamente" });
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({ error });
  } finally {
    client.release();
  }
}
