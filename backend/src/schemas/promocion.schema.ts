import { z } from "zod";

export const promocionSchema = z
  .object({
    nombre: z.string().min(1, "El nombre de la promoción es requerido"),
    descuento: z
      .number()
      .min(1, "El descuento debe ser mayor a 0")
      .max(100, "El descuento no puede ser mayor a 100"),
    inicio: z.coerce.date({ message: "La fecha de inicio es inválida" }),
    fin: z.coerce.date({ message: "La fecha de fin es inválida" }),
  })
  .refine((data) => data.inicio < data.fin, {
    message: "La fecha de inicio debe ser menor a la de fin",
    path: ["fin"],
  });

export const relacionSchema = z.object({
  promocion_id: z.number().int(),
  productos: z
    .array(z.number().int())
    .nonempty("Se requiere al menos un producto"),
  tiendas: z
    .array(z.number().int())
    .nonempty("Se requiere al menos una tienda"),
});
