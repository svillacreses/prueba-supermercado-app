import { z } from "zod";

export const precioSchema = z
  .object({
    producto_id: z.number().int(),
    tienda_id: z.number().int(),
    valor: z.number().positive(),
    inicio: z.coerce.date(),
    fin: z.coerce.date(),
  })
  .refine((data) => data.inicio < data.fin, {
    message: "La fecha de inicio debe ser menor a la de fin",
    path: ["fin"],
  });
