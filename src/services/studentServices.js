const studentModel = require("../models/studentModels");

const create = async (name, email, age, subject) => {
  email = email.trim().toLowerCase();

  const existingStudent = await studentModel.findStudentByEmail(email);
  if (existingStudent) {
    const error = new Error("Student with this email already exists");
    error.statusCode = 409;
    throw error;
  }

  const newStudent = await studentModel.createStudent(
    name.trim(),
    email,
    age,
    typeof subject === "string" ? subject.trim() : subject
  );

  return newStudent;
};

const getAll = async () => {
  return await studentModel.getAllStudents();
};

const getById = async (id) => {
  const student = await studentModel.findStudentById(id);
  if (!student) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  return student;
};

const update = async (id, updateData) => {
  const existingStudent = await studentModel.findStudentById(id);
  if (!existingStudent) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  let { name, email, age, subject } = updateData;

  if (email !== undefined) {
    email = email.trim().toLowerCase();
    const studentWithEmail = await studentModel.findStudentByEmail(email);
    if (studentWithEmail && String(studentWithEmail.id) !== String(id)) {
      const error = new Error("Email is already in use by another student");
      error.statusCode = 409;
      throw error;
    }
  }

  if (name !== undefined) {
    name = name.trim();
  }

  if (subject !== undefined && typeof subject === "string") {
    subject = subject.trim();
  }

  const updatedStudent = await studentModel.updateStudent(
    id,
    name,
    email,
    age,
    subject
  );

  return updatedStudent;
};

const deleteStudent = async (id) => {
  const existingStudent = await studentModel.findStudentById(id);
  if (!existingStudent) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  const deleted = await studentModel.deleteStudent(id);
  return deleted;
};

module.exports = {
  create,
  createStudent: create,
  getAll,
  getAllStudents: getAll,
  getById,
  getStudentById: getById,
  update,
  updateStudent: update,
  deleteStudent,
  remove: deleteStudent,
};

