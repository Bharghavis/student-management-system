const { Pool } = require('pg');

// PostgreSQL configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'student_management',
    password: '77Bujji%',
    port: 5432,
});

// Function to add a new student
const addStudent = async (req, res, next) => {
    const { first_name, last_name, student_id, course, email, phone } = req.body;
    try {
        const query = 'INSERT INTO students (first_name, last_name, student_id, course, email, phone) VALUES ($1, $2, $3, $4, $5, $6)';
        const values = [first_name, last_name, student_id, course, email, phone];
        await pool.query(query, values);
        res.status(201).send('Student added successfully');
    } catch (err) {
        console.error('Error adding student:', err);
        res.status(500).send('Error adding student');
    }
};

// Function to fetch all students
const getAllStudents = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM students');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).send('Error fetching students');
    }
};

// Function to search students by ID
const searchStudentsById = async (req, res, next) => {
    const { id } = req.query;
    try {
        const result = await pool.query('SELECT * FROM students WHERE student_id = $1', [id]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error searching for student:', err);
        res.status(500).send('Error searching for student');
    }
};

module.exports = {
    addStudent,
    getAllStudents,
    searchStudentsById,
};
