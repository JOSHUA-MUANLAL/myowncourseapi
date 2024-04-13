const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("Hi please use `/getcourse`")
});

// Define a route to read the CSV file
app.get('/getcourse', (req, res) => {
  const results = [];

  // Read the CSV file
  const fileStream = fs.createReadStream(path.join(__dirname, 'udemy_courses.csv'));
  fileStream.on('error', (err) => {
    console.error('Error reading CSV file:', err);
    res.status(500).send('Internal Server Error');
  });

  fileStream.pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log('CSV parsing successful');
      res.json(results); // Send the CSV data as JSON
    })
    .on('error', (err) => {
      console.error('Error parsing CSV:', err);
      res.status(500).send('Internal Server Error');
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
