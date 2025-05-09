import Tienda from "@/models/Tienda";
import axios from "axios";
import { notFound } from "next/navigation";

export const getTiendas = async () => {
  const url = `${process.env.BACKEND_URL}/api/tiendas`;

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
    const tiendas = data.map((tienda: any) => {
      return Tienda.fromJson(tienda);
    });
    return tiendas;
  } else {
    return [];
  }
};

export const getTienda = async (id: string) => {
  const url = `${process.env.BACKEND_URL}/api/tiendas/${id}`;

  const res = await axios.get(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (res.status !== 200) {
    notFound();
  }
  const data = Tienda.fromJson(res.data);
  return data;
};
