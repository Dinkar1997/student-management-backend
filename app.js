console.log("Hello");

const express  = require("express");
const pool = require("./src/config/db");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
const errorHandler = require("./src/middleware/errorMiddleware");

const app = express();
const CORS = require("cors");

app.use(CORS());
app.use(express.json());

const PORT = process.env.PORT || 800;

//health Check
app.get('/health', (req, res) => {
    res.status(200).json({
        'message': 'Server is running'
    })
})

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

//Error Handler should be in last
app.use(errorHandler);

app.listen(PORT , () => {
    console.log(`Server is running on ${PORT}`);
})