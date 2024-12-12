const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 8036;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Anan@123',
    database: 'cet'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err; // Terminate the application if unable to connect to the database
    }
    console.log('Connected to MySQL database');
});

app.post('/submit_form', (req, res) => {
    const { name, phn, address, cet, col_id, min_cet, max_cet } = req.body;

    console.log('Received form data:', req.body); // Log the request body

    if (!col_id || !cet || col_id.trim() === '' || cet.trim() === '') {
        console.error('col_id and CET are required');
        return res.status(400).send('col_ and CET are required');
    }

    const sql = 'INSERT INTO COLLEGE_LIST (name, phn, address, cet, col_id, min_cet, max_cet) VALUES (?, ?, ?, ?, ?, ?,?)';
    db.query(sql, [name, phn, address, cet, col_id, min_cet, max_cet], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).send('Error submitting form'); // Log the error
        }
        console.log('Form submitted successfully');
        res.status(200).send('Form submitted successfully');
    });
});

app.get('/student_data', (req, res) => {
    const sql = 'SELECT * FROM COLLEGE_LIST';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).send('Error fetching student data');
        }
        console.log('Student data:', result);
        res.json(result);
    });
});

process.on('exit', () => {
    db.end((err) => {
        if (err) {
            console.error('Error closing MySQL connection:', err);
            return;
        }
        console.log('MySQL connection closed');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
