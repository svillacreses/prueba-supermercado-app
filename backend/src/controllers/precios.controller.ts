import { Request, Response } from "express";
import pool from "../db";
import { precioSchema } from "../schemas/precio.schema";
import {
  existeConflictoPrecio,
  existeProducto,
  existeTienda,
} from "../utils/validaciones";

export async function crearPrecio(req: Request, res: Response) {
  const result = precioSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error.errors);
  }

  const { producto_id, tienda_id, precio, inicio, fin } = result.data;
  const client = await pool.connect();

  try {
    const hayProducto = await existeProducto(client, producto_id);
    if (!hayProducto) {
      return res.status(404).json({ message: "El producto no existe." });
    }

    const hayTienda = await existeTienda(client, tienda_id);
    if (!hayTienda) {
      return res.status(404).json({ message: "La tienda no existe." });
    }

    const hayConflicto = await existeConflictoPrecio(
      client,
      producto_id,
      tienda_id,
      inicio,
      fin
    );
    if (hayConflicto) {
      return res.status(400).json({
        message:
          "Ya existe un precio activo para ese producto en esa tienda en ese intervalo.",
      });
    }

    // Insertamos el precio
    await client.query(
      `INSERT INTO precios (producto_id, tienda_id, valor, inicio, fin)
       VALUES ($1, $2, $3, $4::timestamp, $5::timestamp)`,
      [producto_id, tienda_id, precio, inicio, fin]
    );

    res.status(201).json({ message: "Precio creado correctamente" });
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    client.release();
  }
}

export async function consultarPrecioFinal(req: Request, res: Response) {
  const { producto_id, tienda_id, fecha } = req.query;

  if (!producto_id || !tienda_id || !fecha) {
    return res.status(400).json({ message: "Faltan parámetros requeridos" });
  }

  const client = await pool.connect();

  try {
    // Buscamos el precio ACTIVO
    const precioResult = await client.query(
      ` SELECT P.valor 
        FROM precios P 
        WHERE 
          P.producto_id = $1 AND 
          P.tienda_id = $2 AND 
          $3::timestamp BETWEEN P.inicio AND P.fin 
        ORDER BY P.inicio DESC 
        LIMIT 1`,
      [producto_id, tienda_id, fecha]
    );

    if (precioResult.rows.length === 0) {
      return res.status(404).json({ message: "Precio no encontrado" });
    }

    const base = Number(precioResult.rows[0].valor); // Parseamos a number

    // Buscamos todas las promociones activas
    const promosResult = await client.query(
      ` SELECT P.nombre, P.descuento 
        FROM 
          promociones P 
            JOIN promociones_tiendas PT 
              ON PT.promocion_id = P.id 
            JOIN promociones_productos PP 
              ON PP.promocion_id = P.id 
        WHERE 
          PT.tienda_id = $1 AND 
          PP.producto_id = $2 AND 
          $3::timestamp BETWEEN P.inicio AND P.fin`,
      [tienda_id, producto_id, fecha]
    );

    // Parseamos el descuento a number y ordenamos las promociones de mayor a menor
    const descuentos = promosResult.rows
      .map((row) => ({
        ...row,
        descuento: Number(row.descuento),
      }))
      .sort((a, b) => b.descuento - a.descuento);
    const mejorDescuento = descuentos?.[0]?.descuento || 0;

    const precioFinal = base * (1 - mejorDescuento / 100);

    res.json({
      descuento: {
        nombre: mejorDescuento > 0 ? descuentos[0].nombre : "N/A",
        porcentaje: mejorDescuento,
      },
      precio_actual: base,
      precio_final: precioFinal,
    });
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    client.release();
  }
}
