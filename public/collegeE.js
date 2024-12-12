const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Set EJS as view engine
app.set('view engine', 'ejs');

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Anan@123',
  database: 'cet'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/collegeEntry.html');
});

// Insert Route
app.post('/insert', (req, res) => {
  const { name, phone, address, cet, collegeId, minCet, maxCet } = req.body;
  const INSERT_COLLEGE_QUERY = `INSERT INTO college_list (name, phn, address, cet, col_id, min_cet, max_cet) VALUES ('${name}', ${phone}, '${address}', ${cet}, '${collegeId}', ${minCet}, ${maxCet})`;
  connection.query(INSERT_COLLEGE_QUERY, (err, results) => {
    if (err) throw err;
    res.redirect('/colleges'); // Redirect to colleges route after insertion
  });
});

// Colleges Route
app.get('/colleges', (req, res) => {
  const SELECT_COLLEGES_QUERY = 'SELECT * FROM college_list';
  connection.query(SELECT_COLLEGES_QUERY, (err, results) => {
    if (err) throw err;
    res.render('collegeList', { colleges: results }); // Render collegeList.ejs view
  });
});

// Delete Route
app.delete('/delete/:collegeId', (req, res) => {
  const collegeId = req.params.collegeId;
  const DELETE_COLLEGE_QUERY = `DELETE FROM college_list WHERE col_id='${collegeId}'`;
  connection.query(DELETE_COLLEGE_QUERY, (err, results) => {
    if (err) {
      res.status(500).send({ error: 'Failed to delete college' });
      throw err;
    }
    res.status(200).send({ message: 'College deleted successfully' });
  });
});

// Server Listening
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});