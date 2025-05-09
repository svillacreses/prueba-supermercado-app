export default class Tienda {
  id: number;
  nombre: string;
  color_hex: string;

  constructor(id: number, nombre: string, color_hex: string) {
    this.id = id;
    this.nombre = nombre;
    this.color_hex = color_hex;
  }

  static fromJson(json: any): Tienda {
    return new Tienda(json.id, json.nombre, json.color_hex);
  }
}
