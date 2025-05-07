import { PoolClient } from "pg";

export const existeConflictoPrecio = async (
  client: PoolClient,
  producto_id: number,
  tienda_id: number,
  inicio: Date,
  fin: Date
) => {
  // Verificamos el solapamiento con precios existentes
  const conflicto = await client.query(
    ` SELECT 1 
      FROM precios P
      WHERE 
        P.producto_id = $1 AND 
        P.tienda_id = $2 AND 
        NOT (
          $4::timestamp <= P.inicio OR
          $3::timestamp >= P.fin
        )`,
    [producto_id, tienda_id, inicio, fin]
  );
  return conflicto.rows.length > 0;
};

// Se definieron validaciones separadas para optimizar recursos cuando se validen individualmente vs cuando se validen en conjunto
export const existeProducto = async (
  client: PoolClient,
  producto_id: number
) => {
  // Validamos que el producto exista
  const producto = await client.query(`SELECT 1 FROM productos WHERE id = $1`, [
    producto_id,
  ]);
  return producto.rows.length > 0;
};

export const existenProductos = async (
  client: PoolClient,
  productos: number[]
) => {
  // Validamos que los productos existan
  const productosValidos = await client.query(
    `SELECT 1 FROM productos WHERE id = ANY($1::int[])`,
    [productos]
  );
  return productosValidos.rows.length === productos.length;
};

export const existeTienda = async (client: PoolClient, tienda_id: number) => {
  // Validamos que la tienda exista
  const tienda = await client.query(`SELECT 1 FROM tiendas WHERE id = $1`, [
    tienda_id,
  ]);
  return tienda.rows.length > 0;
};

export const existenTiendas = async (client: PoolClient, tiendas: number[]) => {
  // Validamos que las tiendas existan
  const tiendasValidas = await client.query(
    `SELECT 1 FROM tiendas WHERE id = ANY($1::int[])`,
    [tiendas]
  );
  return tiendasValidas.rows.length === tiendas.length;
};

export const existePromocion = async (
  client: PoolClient,
  promocion_id: number
) => {
  // Validamos que la promoción exista
  const promocion = await client.query(
    `SELECT 1 FROM promociones WHERE id = $1`,
    [promocion_id]
  );
  return promocion.rows.length > 0;
};

// Tampoco se reutilizaron algunas funciones porque violariamos algunos principios SOLID
