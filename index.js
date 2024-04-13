const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const path=require('path')
app.use(express.static('public'));
app.use(express.json());
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
  res.send("Hi please use /getcourse")
})

// Define a route to read the CSV file
app.get('/getcourse', (req, res) => {
  const results = [];

  // Read the CSV file
  fs.createReadStream('udemy_courses.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results); // Send the CSV data as JSON
    });
});

const PORT = process.env.PORT || 3000;
app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
})
