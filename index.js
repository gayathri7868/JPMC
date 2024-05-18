const express = require('express')
const mongoose = require('mongoose')
const studentRoutes = require('./routes/student.route')

require('dotenv').config()

const app = express()
const port = process.env.port
app.use(express.json())
app.use(studentRoutes)

mongoose.connect('mongodb://localhost:27017/JPMC')
    .then((response) => console.log("connected to database"))

app.use('/api/students', studentRoutes)


app.listen(port, () => {
    console.log("server running")
})