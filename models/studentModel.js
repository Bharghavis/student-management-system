const db = require('./db');

class Student {
    constructor(firstName, lastName, studentId, course, email, phone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.studentId = studentId;
        this.course = course;
        this.email = email;
        this.phone = phone;
    }

    // Method to add a student to the database
    static async addStudent(student) {
        const { firstName, lastName, studentId, course, email, phone } = student;
        const query = `
            INSERT INTO students (first_name, last_name, student_id, course, email, phone)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = [firstName, lastName, studentId, course, email, phone];

        try {
            await db.query(query, values);
            return true;
        } catch (err) {
            console.error('Error adding student:', err);
            return false;
        }
    }

    // Method to retrieve all students from the database
    static async getAllStudents() {
        const query = `
            SELECT * FROM students
        `;

        try {
            const { rows } = await db.query(query);
            return rows;
        } catch (err) {
            console.error('Error fetching students:', err);
            return [];
        }
    }

    // Method to search students by student ID
    static async searchStudentsById(studentId) {
        const query = `
            SELECT * FROM students WHERE student_id ILIKE $1
        `;
        const value = [`%${studentId}%`];

        try {
            const { rows } = await db.query(query, value);
            return rows;
        } catch (err) {
            console.error('Error searching students:', err);
            return [];
        }
    }
}

module.exports = Student;
