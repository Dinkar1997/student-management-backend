const pool = require("../config/db");

const createStudent = async (name, email, age, subject) => {
  const query = `
    INSERT INTO students (name, email, age, subject)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [name, email, age, subject];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getAllStudents = async () => {
  const query = `
    SELECT *
    FROM students
    ORDER BY id ASC;
  `;
  const result = await pool.query(query);
  return result.rows;
};

const findStudentById = async (id) => {
  const query = `
    SELECT *
    FROM students
    WHERE id = $1;
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const findStudentByEmail = async (email) => {
  const query = `
    SELECT *
    FROM students
    WHERE email = $1;
  `;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

const updateStudent = async (id, name, email, age, subject) => {
  const query = `
    UPDATE students
    SET name = COALESCE($1, name),
        email = COALESCE($2, email),
        age = COALESCE($3, age),
        subject = COALESCE($4, subject)
    WHERE id = $5
    RETURNING *;
  `;
  const values = [
    name !== undefined ? name : null,
    email !== undefined ? email : null,
    age !== undefined ? age : null,
    subject !== undefined ? subject : null,
    id,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteStudent = async (id) => {
  const query = `
    DELETE FROM students
    WHERE id = $1
    RETURNING *;
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  createStudent,
  getAllStudents,
  findStudentById,
  findStudentByEmail,
  updateStudent,
  deleteStudent,
};

