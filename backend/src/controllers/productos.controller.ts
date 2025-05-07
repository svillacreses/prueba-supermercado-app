import { Request, Response } from "express";
import pool from "../db";

export async function consultarProductos(req: Request, res: Response) {
  const client = await pool.connect();

  try {
    // Consultamos todos los productos
    const productosResult = await client.query(
      ` SELECT P.id, P.nombre, P.url_imagen
        FROM productos P`
    );

    res.json(productosResult.rows);
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    client.release();
  }
}
