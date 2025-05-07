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
