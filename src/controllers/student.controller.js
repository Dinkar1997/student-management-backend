const studentService = require("../services/studentServices");

const createStudent = async (req, res, next) => {
  try {
    let { name, email, age, subject } = req.body;

    if (!name || !email || !age || !subject) {
      return res.status(400).json({
        status: false,
        message: "Name, email, age and subject is required",
      });
    }

    const result = await studentService.create(name, email, age, subject);

    return res.status(201).json({
      status: true,
      message: "Student Created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getStudents = async (req, res, next) => {
  try {
    const students = await studentService.getAll();

    return res.status(200).json({
      status: true,
      message: "Students fetched successfully",
      count: students.length,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await studentService.getById(id);

    return res.status(200).json({
      status: true,
      message: "Student fetched successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, age, subject } = req.body;

    if (!name && !email && !age && !subject) {
      return res.status(400).json({
        status: false,
        message: "At least one field (name, email, age, subject) is required to update",
      });
    }

    const updatedStudent = await studentService.update(id, {
      name,
      email,
      age,
      subject,
    });

    return res.status(200).json({
      status: true,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedStudent = await studentService.deleteStudent(id);

    return res.status(200).json({
      status: true,
      message: "Student deleted successfully",
      data: deletedStudent,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};