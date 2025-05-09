interface Descuento {
  nombre: string;
  porcentaje: number;
}

export default class PrecioFinal {
  descuento: Descuento;
  precio_actual: number;
  precio_final: number;
  get tieneDescuento(): boolean {
    return this.descuento.porcentaje > 0;
  }

  constructor(
    descuento: Descuento,
    precio_actual: number,
    precio_final: number
  ) {
    this.descuento = descuento;
    this.precio_actual = precio_actual;
    this.precio_final = precio_final;
  }

  static fromJson(json: any): PrecioFinal {
    return new PrecioFinal(
      {
        nombre: json.descuento?.nombre || "N/A",
        porcentaje: json.descuento?.porcentaje || 0,
      },
      json.precio_actual,
      json.precio_final
    );
  }
}
