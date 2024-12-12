const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 8090;

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
    const { aadhar,name,col_name,branch,col_id} = req.body;

    console.log('Received form data:', req.body);

    if (!col_id || !aadhar || col_id.trim() === '' || aadhar.trim() === '') {
        console.error('AADHAR and CET are required');
        return res.status(400).send('AADHAR and CET are required');
    }

    const sql = 'INSERT INTO APPLIED ( aadhar,name,col_name,branch,col_id) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [ aadhar,name,col_name,branch,col_id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).send('Error submitting form');
        }
        console.log('Form submitted successfully');
        res.status(200).json({ // Send back the form data
            aadhar:aadhar,
            name:name,
            col_name:col_name,
            branch:branch,
            col_id:col_id
        });
    });
});



app.get('/college_data', (req, res) => {
    const sql = 'SELECT * FROM APPLIED';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).send('Error fetching college data');
        }
        console.log('College data:', result);
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