import axios from "axios";
import { notFound } from "next/navigation";
import Producto from "@/models/Producto";

export const getProductos = async () => {
  const url = `${process.env.BACKEND_URL}/api/productos`;

  const res = await axios.get(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (res.status !== 200) {
    notFound();
  }

  const data = res.data;
  if (Array.isArray(data)) {
    const productos = data.map((producto: any) => {
      return Producto.fromJson(producto);
    });
    return productos;
  } else {
    return [];
  }
};
