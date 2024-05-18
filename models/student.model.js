const mongoose = require('mongoose')


const studentSchema = mongoose.Schema({
    _id: {
        type: Number,
        require: true,
    },
    name: String,
    branch: String,
    marks: Array
})

const studentModel = mongoose.model('student', studentSchema)
module.exports = studentModel