const express = require("express");
const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/student.controller");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, createStudent);
router.get("/", authenticate, getStudents);
router.get("/:id", authenticate, getStudentById);
router.put("/:id", authenticate, updateStudent);
router.delete("/:id", authenticate, deleteStudent);

module.exports = router;

