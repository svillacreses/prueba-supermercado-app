import PrecioFinal from "@/models/PrecioFinal";
import Promocion from "@/models/Promocion";
import { createTheme } from "@mui/material";
import { esES } from "@mui/x-date-pickers/locales";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";

export const fetchPrecioFinal = (url: string) =>
  axios.get(url).then((res) => PrecioFinal.fromJson(res.data));

export const fetchPromociones = (url: string) =>
  axios
    .get(url)
    .then((res) => res.data.map((promo: any) => Promocion.fromJson(promo)));

export const postToBackend = async (url: string, data: any) => {
  try {
    const res = await axios.post(url, data);
    return res.data;
  } catch (error: AxiosError | any) {
    const errors = error?.response?.data;
    if (Array.isArray(errors)) {
      const firstError: any = errors?.[0]?.message;
      throw new Error(firstError);
    } else {
      throw new Error(
        errors?.message || error?.message || "Error al procesar la solicitud."
      );
    }
  }
};

export const currencyFormat = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const formatISODate = (date: dayjs.Dayjs) =>
  date.format("YYYY-MM-DDTHH:mm:ss");

export const muiTheme = createTheme(
  {
    palette: {
      mode: "dark",
      primary: { main: "#0d9488" },
    },
    shape: {
      borderRadius: 15,
    },
  },
  esES
);
