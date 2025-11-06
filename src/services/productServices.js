import db from "../database/databases.js";

// Get all products
export const getAllProducts = async () => {
  const [rows] = await db.query("SELECT * FROM products");
  return rows;
};

// Get product by ID
export const getProductById = async (id) => {
  const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
  return rows[0];
};

// Create new product
export const createProduct = async (data) => {
  const { tutor_name, title, description, price, image } = data;

  await db.query(
    `INSERT INTO products (tutor_name, title, description, price, image)
     VALUES (?, ?, ?, ?, ?)`,
    [tutor_name, title, description, price, image]
  );

  return { message: "Product added successfully" };
};

// Update product
export const updateProduct = async (id, data) => {
  const { tutor_name, title, description, price, image } = data;

  await db.query(
    `UPDATE products 
     SET tutor_name=?, title=?, description=?, price=?, image=? 
     WHERE id=?`,
    [tutor_name, title, description, price, image, id]
  );

  return { message: "Product updated successfully" };
};

// Delete product
export const deleteProduct = async (id) => {
  await db.query("DELETE FROM products WHERE id = ?", [id]);
  return { message: "Product deleted successfully" };
};
