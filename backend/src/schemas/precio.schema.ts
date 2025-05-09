import { z } from "zod";

export const precioSchema = z
  .object({
    producto_id: z.number().int(),
    tienda_id: z.number().int(),
    precio: z.number().positive("El precio debe ser mayor a 0"),
    inicio: z.coerce.date({ message: "La fecha de inicio es inválida" }),
    fin: z.coerce.date({ message: "La fecha de fin es inválida" }),
  })
  .refine((data) => data.inicio < data.fin, {
    message: "La fecha de inicio debe ser menor a la de fin",
    path: ["fin"],
  });
