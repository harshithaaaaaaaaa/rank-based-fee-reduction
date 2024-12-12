const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 8081;

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
    const { name, email, phn, address, cet, aadhar } = req.body;

    console.log('Received form data:', req.body);

    if (!aadhar || !cet || aadhar.trim() === '' || cet.trim() === '') {
        console.error('AADHAR-ID and CET are required');
        return res.status(400).send('AADHAR-ID and CET are required');
    }

    // Query to fetch colleges based on the range of CET rank
    const sql = 'SELECT * FROM COLLEGE_LIST WHERE min_cet <= ? AND max_cet >= ?';
    db.query(sql, [cet, cet], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).send('Error fetching colleges');
        }
        console.log('Colleges fetched successfully:', result);
        res.status(200).json(result); // Send back the list of colleges
    });

    const insertSql = 'INSERT INTO STUDENT_DET (name, email, phn, address, cet, aadhar) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(insertSql, [name, email, phn, address, cet, aadhar], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).send('Error submitting form');
        }
        console.log('Form submitted successfully');
        res.status(200).json({ // Send back the form data
            name: name,
            email: email,
            phn: phn,
            address: address,
            cet: cet,
            aadhar: aadhar
        });
    });
});


app.get('/student_data', (req, res) => {
    const sql = 'SELECT * FROM STUDENT_DET';
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
