import { z } from "zod";

export const promocionSchema = z
  .object({
    nombre: z.string().min(1),
    descuento: z.number().min(0).max(100),
    inicio: z.coerce.date(),
    fin: z.coerce.date(),
  })
  .refine((data) => data.inicio < data.fin, {
    message: "La fecha de inicio debe ser menor a la de fin",
    path: ["fin"],
  });

export const relacionSchema = z.object({
  promocion_id: z.number().int(),
  productos: z.array(z.number().int()).nonempty(),
  tiendas: z.array(z.number().int()).nonempty(),
});
