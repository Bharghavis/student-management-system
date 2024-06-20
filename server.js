const express = require('express');
const bodyParser = require('body-parser');
const studentController = require('./controllers/studentController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.post('/api/students', studentController.addStudent);
app.get('/api/students', studentController.getAllStudents);
app.get('/api/students/search', studentController.searchStudentsById);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
