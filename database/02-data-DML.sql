-- Insertar tiendas
INSERT INTO tiendas (nombre, color_hex) VALUES
  ('Tienda A', 'E6785C'),
  ('Tienda B', '5CA16C'),
  ('Tienda C', '586FE5'),
  ('Tienda D', 'E67E22'),
  ('Tienda E', '8E44AD');

-- Insertar productos
INSERT INTO productos (nombre, url_imagen) VALUES
  ('Pan', 'https://firebasestorage.googleapis.com/v0/b/gluzsite.appspot.com/o/External%2FPan.jpeg?alt=media&token=86a10a22-80b7-4ceb-acad-4f2966df1fe4'),
  ('Carne', 'https://firebasestorage.googleapis.com/v0/b/gluzsite.appspot.com/o/External%2FCarne.webp?alt=media&token=110c8b93-b772-4ddf-a9af-588721a1a82a'),
  ('Pescado', 'https://firebasestorage.googleapis.com/v0/b/gluzsite.appspot.com/o/External%2FPescado.jpg?alt=media&token=6b73226a-0082-4c86-b534-82278191ca13'),
  ('Frutas', 'https://firebasestorage.googleapis.com/v0/b/gluzsite.appspot.com/o/External%2FFrutas.jpg?alt=media&token=852004d8-397d-460a-9464-3fe88ce48046'),
  ('Snacks', 'https://firebasestorage.googleapis.com/v0/b/gluzsite.appspot.com/o/External%2FSnacks.jpg?alt=media&token=51aa2a99-dc04-4678-bfad-88923b314db9');

-- Insertar precios
INSERT INTO precios (producto_id, tienda_id, valor, inicio, fin) VALUES
  (1, 1, 1.50, '2025-05-06 00:00:00', '2025-05-13 23:59:59'),
  (2, 2, 0.80, '2025-05-06 00:00:00', '2025-05-13 23:59:59'),
  (3, 3, 3.60, '2025-05-06 00:00:00', '2025-05-13 23:59:59');

-- Insertar promoción
INSERT INTO promociones (nombre, descuento, inicio, fin) VALUES
  ('Año Nuevo 2025', 20.00, '2024-12-01 00:00:00', '2025-01-31 23:59:59'),
  ('Año Nuevo 2026', 20.00, '2025-12-01 00:00:00', '2026-01-31 23:59:59'),
  ('Mes de las Madres', 50.00, '2024-05-01 00:00:00', '2025-05-31 23:59:59');

-- Relacionar promoción con tiendas
INSERT INTO promociones_tiendas (promocion_id, tienda_id) VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5);

-- Relacionar promoción con productos
INSERT INTO promociones_productos (promocion_id, producto_id) VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5);
