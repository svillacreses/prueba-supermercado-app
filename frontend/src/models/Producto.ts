export default class Producto {
  id: number;
  nombre: string;
  url_imagen: string;

  constructor(id: number, nombre: string, url_imagen: string) {
    this.id = id;
    this.nombre = nombre;
    this.url_imagen = url_imagen;
  }

  static fromJson(json: any): Producto {
    return new Producto(json.id, json.nombre, json.url_imagen);
  }
}
