const { Pool } = require('pg');

// Replace with your PostgreSQL database credentials
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'student_management',
    password: '77Bujji%',
    port: 5432,
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
    
    // Perform a query to check if there are any rows in the table
    connection.query('SELECT * FROM students', (error, results, fields) => {
        if (error) throw error;
        console.log('Number of rows in students table:', results.length);
        if (results.length > 0) {
            console.log('Data exists in the students table.');
        } else {
            console.log('No data found in the students table.');
        }
        
        // Close the connection
        connection.end();
    });
});
