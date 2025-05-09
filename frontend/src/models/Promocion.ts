export default class Promocion {
  id: number;
  nombre: string;
  descuento: number;
  inicio: string;
  fin: string;

  constructor(
    id: number,
    nombre: string,
    descuento: number,
    inicio: string,
    fin: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descuento = descuento;
    this.inicio = inicio;
    this.fin = fin;
  }

  static fromJson(json: any): Promocion {
    return new Promocion(
      json.id,
      json.nombre,
      Number(json.descuento),
      json.inicio,
      json.fin
    );
  }
}
