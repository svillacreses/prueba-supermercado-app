import { Request, Response } from "express";
import pool from "../db";

export async function consultarTiendas(req: Request, res: Response) {
  const client = await pool.connect();

  try {
    // Consultamos todas las tiendas
    const tiendasResult = await client.query(
      ` SELECT T.id, T.nombre, T.color_hex
        FROM tiendas T`
    );

    res.json(tiendasResult.rows);
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    client.release();
  }
}

export async function consultarTienda(req: Request, res: Response) {
  const client = await pool.connect();
  const { id } = req.params;

  try {
    // Consultamos la tienda por su id
    const tiendaResult = await client.query(
      ` SELECT T.id, T.nombre, T.color_hex
        FROM tiendas T
        WHERE T.id = $1`,
      [id]
    );

    if (tiendaResult.rows.length === 0) {
      return res.status(404).json({ message: "Tienda no encontrada" });
    }

    res.json(tiendaResult.rows[0]);
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    client.release();
  }
}
