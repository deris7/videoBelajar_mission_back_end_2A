import db from "../database/databases.js";
import bcrypt from "bcryptjs";

// === GET ALL USERS ===
export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id, name, email, phone, avatar FROM users",
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// === GET USER BY ID ===
export const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id, name, email, phone, avatar FROM users WHERE id = ?",
      [id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result[0]);
      }
    );
  });
};

// === REGISTER USER (CREATE) ===
export const registerUser = (data) => {
  return new Promise((resolve, reject) => {
    const hashedPassword = bcrypt.hashSync(data.password, 10);

    const query = `
      INSERT INTO users (name, email, phone, password, avatar, createdAt)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;

    db.query(
      query,
      [
        data.name,
        data.email,
        data.phone,
        hashedPassword,
        data.avatar || "/images/profile.png",
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve({
          message: "User registered successfully",
          id: result.insertId,
        });
      }
    );
  });
};

// === LOGIN USER ===
export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) return reject(err);
      if (result.length === 0)
        return reject(new Error("Email tidak ditemukan!"));

      const user = result[0];
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) return reject(new Error("Password salah!"));

      resolve({
        message: "Login berhasil",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
        },
      });
    });
  });
};

// === UPDATE USER ===
export const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedPassword = data.password
        ? await bcrypt.hash(data.password, 10)
        : null;
      const query = `
        UPDATE users 
        SET name = ?, email = ?, phone = ?, avatar = ?, password = COALESCE(?, password)
        WHERE id = ?
      `;
      db.query(
        query,
        [data.name, data.email, data.phone, data.avatar, hashedPassword, id],
        (err) => {
          if (err) return reject(err);
          resolve({ message: "User updated successfully" });
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

// === DELETE USER ===
export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
      if (err) return reject(err);
      resolve({ message: "User deleted successfully" });
    });
  });
};
