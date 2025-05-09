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
    return res.status(400).json(result.error.errors);
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

export async function consultarPromociones(req: Request, res: Response) {
  const client = await pool.connect();

  try {
    const query = `
      SELECT P.id, P.nombre, P.descuento, P.inicio, P.fin
      FROM promociones P
    `;
    const result = await client.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    client.release();
  }
}

export async function asociarPromocion(req: Request, res: Response) {
  const result = relacionSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error.errors);
  }

  const { promocion_id, tiendas, productos } = result.data;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const hayPromocion = await existePromocion(client, promocion_id);
    if (!hayPromocion) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "La promoción no existe." });
    }

    const hayTiendas = await existenTiendas(client, tiendas);
    if (!hayTiendas) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "Una o más tiendas no existen." });
    }

    const hayProductos = await existenProductos(client, productos);
    if (!hayProductos) {
      await client.query("ROLLBACK");
      return res
        .status(400)
        .json({ message: "Uno o más productos no existen." });
    }

    // Validamos si la promoción ya está asociada a las tiendas y productos
    const { rows: promocionesExistentes } = await client.query(
      `SELECT P.id
       FROM promociones P
       JOIN promociones_tiendas PT ON P.id = PT.promocion_id
       JOIN promociones_productos PP ON P.id = PP.promocion_id
       WHERE P.id = $1 AND PT.tienda_id = ANY($2) AND PP.producto_id = ANY($3)`,
      [promocion_id, tiendas, productos]
    );
    if (promocionesExistentes.length > 0) {
      await client.query("ROLLBACK");
      return res.status(400).json({
        message: "Esta promoción ya fue asociada.",
      });
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
