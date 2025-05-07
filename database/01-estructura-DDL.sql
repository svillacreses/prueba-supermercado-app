-- Tabla de productos
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  url_imagen VARCHAR(255) NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de tiendas
CREATE TABLE tiendas (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  color_hex VARCHAR(6) NOT NULL, -- Solo para diferenciar las tiendas del lado del cliente
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de precios
CREATE TABLE precios (
  id SERIAL PRIMARY KEY,
  producto_id INTEGER NOT NULL REFERENCES productos(id),
  tienda_id INTEGER NOT NULL REFERENCES tiendas(id),
  valor NUMERIC(10,2) NOT NULL,
  inicio TIMESTAMP NOT NULL,
  fin TIMESTAMP NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de promociones
CREATE TABLE promociones (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descuento NUMERIC(5,2) NOT NULL,
  inicio TIMESTAMP NOT NULL,
  fin TIMESTAMP NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla intermedia #1: promociones_tiendas
CREATE TABLE promociones_tiendas (
  id SERIAL PRIMARY KEY,
  promocion_id INTEGER NOT NULL REFERENCES promociones(id),
  tienda_id INTEGER NOT NULL REFERENCES tiendas(id),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (promocion_id, tienda_id)
);

-- Tabla intermedia #2: promociones_productos (Para cumplir con la tercera forma normal: 3NF)
CREATE TABLE promociones_productos (
  id SERIAL PRIMARY KEY,
  promocion_id INTEGER NOT NULL REFERENCES promociones(id),
  producto_id INTEGER NOT NULL REFERENCES productos(id),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (promocion_id, producto_id)
);
