const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const results = [];

  // Read the CSV file
  const fileStream = fs.createReadStream(path.join(__dirname, 'udemy_courses.csv'));
  fileStream.on('error', (err) => {
    console.error('Error reading CSV file:', err);
   
  });

  fileStream.pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log('CSV parsing successful');
    
    })
    .on('error', (err) => {
      console.error('Error parsing CSV:', err);
      
    });

app.get('/', (req, res) => {
  res.send("Hi please use `/getcourse`")
});

// Define a route to read the CSV file
app.get('/getcourse', (req, res) => {
  if(results){
    res.status(200).json(results);
  }

});
app.post('/getcourse/filter',(req,res)=>{

  let subject=req.body.subject;
  let level=req.body.level
  res.redirect(`/getcourse/subject=${subject}&level=${level}`)
})

app.get('/getcourse/subject=:subject&level=:level',(req,res)=>{
  let subject=req.params.subject;
  let level=req.params.level;
 
  let result_sub=[]

  results.forEach(newresult=>{
    if(newresult.subject==subject && newresult.level==level){
      result_sub.push(newresult)
      
    }

  })

  if(result_sub){
    res.status(200).json(result_sub)
  }else{
    res.json({message:"no result found"})
  }

})

app.post('/getcourse/level',(req,res)=>{
  let level=req.body.level;
   res.redirect(`/getcourse/level=${level}`)
  
})

app.get('/getcourse/level=:level',(req,res)=>{
   res.setHeader('Cache-Control', 'no-store');
  let level=req.params.level
  let result_level=[]

  results.forEach(newresult=>{
    if(newresult.level==level){
      result_level.push(newresult)
      
    }

  })

  if(result_level){
    res.status(200).json(result_level)
  }else{
    res.json({message:"no result found"})
  }

})


app.post('/getcourse/sub',(req,res)=>{
  let level=req.body.sub;
   res.redirect(`/getcourse/level=${level}`)
  
})

app.get('/getcourse/level=:sub',(req,res)=>{
   res.setHeader('Cache-Control', 'no-store');
  let sub=req.params.sub
  let result_sub=[]

  results.forEach(newresult=>{
    if(newresult.subject==sub){
      result_sub.push(newresult)
      
    }

  })

  if(result_level){
    res.status(200).json(result_level)
  }else{
    res.json({message:"no result found"})
  }

})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
