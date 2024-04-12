const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');

const path=require('path')
const bodyParser = require('body-parser');





const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Define a route to read the CSV file
app.get("/",(req,res)=>{
    res.send("hii")
})
app.get('/allcourse', (req, res) => {
  const results = [];

  // Read the CSV file
  fs.createReadStream('udemy_courses.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results); // Send the CSV data as JSON
    });
});


app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
  })
