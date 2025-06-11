const db = require('../config/database');

const getAllUsers = async () => {
  const [rows] = await db.query('SELECT id, username, email, created_at FROM users');
  return rows;
};

const createUser = async (username, email, password) => {
  const [result] = await db.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]
  );
  return { id: result.insertId, username, email };
};

const findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows.length > 0 ? rows[0] : null;
};

const deleteUserById = async (id) => {
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  return result;
};

const createCheckin = async (Prediction) => {
  const [result] = await db.query('INSERT INTO Checkin (Prediction) VALUES (?)', [Prediction]);
  return { id: result.insertId, Prediction };
};

module.exports = { getAllUsers, createUser, findUserByEmail, deleteUserById, createCheckin };
