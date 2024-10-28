const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const mysql = require('mysql'); 
const db = require('./db');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(cors({origin : 'http://localhost:3000'}));
app.use(bodyParser.json());

app.use("/user", require("./route/userRoute"));


  app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
  
    const query = 'INSERT INTO tbl_human (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ success: false, message: 'Registration failed' });
      } else {
        res.json({ success: true, message: 'Registration successful' });
      }
    });
  }); 


app.listen(3100, ()=>{
    console.log("server start!");
})