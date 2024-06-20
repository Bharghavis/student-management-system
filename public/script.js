// Example client-side JavaScript to interact with server endpoints
// Function to show a specific section and hide others
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');

    document.getElementById(sectionId).style.display = 'block';
    document.querySelector('.landing-page').style.display = 'none';

    // Smooth scroll to the section
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Function to navigate back to the landing page
function backToPortal() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');

    document.querySelector('.landing-page').style.display = 'flex';

    // Smooth scroll to the top of the landing page
    document.querySelector('.landing-page').scrollIntoView({ behavior: 'smooth' });
}

// Event listener for Add Student Details image
const addStudentImage = document.getElementById('add-student-btn');
addStudentImage.addEventListener('click', function() {
    showSection('student-form');
});

// Event listener for Back to portal image
const backToPortalImage = document.getElementById('back-to-portal');
backToPortalImage.addEventListener('click', function() {
    backToPortal();
});

const studentDetailsForm = document.getElementById('student-details-form');
const displayStudentDetails = document.getElementById('display-student');

// Event listener for form submission
studentDetailsForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get form data
    const formData = new FormData(studentDetailsForm);
    const firstName = formData.get('first-name');
    const lastName = formData.get('last-name');
    const studentId = formData.get('student-id');
    const course = formData.get('course');
    const email = formData.get('email');
    const phone = formData.get('phone');

       // Validate phone number format (only digits)
       if (!/^\d*$/.test(phone)) {
        document.getElementById('phone-error').style.display = 'block';
        return; // Stop form submission if phone number is invalid
    } else {
        document.getElementById('phone-error').style.display = 'none';
    }

    // Create a new row for the student in the table
    const table = document.getElementById('student-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // Insert cells into the row
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);

    // Populate cells with form data
    cell1.textContent = firstName;
    cell2.textContent = lastName;
    cell3.textContent = studentId;
    cell4.textContent = course;
    cell5.textContent = email;
    cell6.textContent = phone;

    studentDetailsForm.reset();
    // Show the display student details section
    showSection('display-student');

});

















const addStudentForm = document.getElementById('add-student-form');
const studentTable = document.getElementById('student-table');
const searchInput = document.getElementById('search-input');

// Function to handle form submission
addStudentForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(addStudentForm);
    const requestBody = Object.fromEntries(formData);

    try {
        const response = await fetch('/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.error);
        }

        alert('Student added successfully!');
        addStudentForm.reset();
    } catch (error) {
        console.error('Error adding student:', error.message);
        alert('Failed to add student. Please try again.');
    }
});

// Function to fetch all students and populate the table
async function fetchAllStudents() {
    try {
        const response = await fetch('/api/students');
        const students = await response.json();

        studentTable.innerHTML = ''; // Clear previous table rows

        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>${student.studentId}</td>
                <td>${student.course}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
            `;
            studentTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching students:', error.message);
    }
}

// Function to search students by student ID
searchInput.addEventListener('input', async function() {
    const searchValue = searchInput.value.trim();

    try {
        const response = await fetch(`/api/students/search?studentId=${searchValue}`);
        const students = await response.json();

        studentTable.innerHTML = ''; // Clear previous table rows

        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>${student.studentId}</td>
                <td>${student.course}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
            `;
            studentTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error searching students:', error.message);
    }
});

// Initial fetch of all students when the page loads
fetchAllStudents();
