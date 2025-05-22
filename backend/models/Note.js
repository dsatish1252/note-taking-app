const pool = require("../config/db");

class Note {
  static async create({ title, content, user_id }) {
    const query =
      "INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *";
    const values = [title, content, user_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findByUserId(user_id) {
    const query =
      "SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC";
    const { rows } = await pool.query(query, [user_id]);
    return rows;
  }

  static async findByIdAndUserId(id, user_id) {
    const query = "SELECT * FROM notes WHERE id = $1 AND user_id = $2";
    const { rows } = await pool.query(query, [id, user_id]);
    return rows[0];
  }

  static async update({ id, title, content, user_id }) {
    const query =
      "UPDATE notes SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 AND user_id = $4 RETURNING *";
    const values = [title, content, id, user_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async delete(id, user_id) {
    const query =
      "DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *";
    const { rows } = await pool.query(query, [id, user_id]);
    return rows[0];
  }
}

module.exports = Note;
