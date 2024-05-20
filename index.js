const express = require('express')
const mongoose = require('mongoose')
const studentRoutes = require('./routes/student.route')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.port
app.use(express.json())
app.use(cors());

mongoose.connect('mongodb://localhost:27017/JPMC')
    .then((response) => console.log("connected to database"))

app.use(studentRoutes)
app.use('/api/students', studentRoutes)


app.listen(port, () => {
    console.log("server running")
})