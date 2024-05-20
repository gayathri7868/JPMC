const studentModel = require('../models/student.model.js')

async function getStudents(req, res) {
    try {
        const students = await studentModel.find()
        if (students) {
            res.status(200).send(students)
        }
        else {
            res.status(404).send("no student details")
        }
    }
    catch (err) {

        res.status(404).send("Cannot display student details ")
    }
}

async function getStudentsById(req, res) {
    try {
        const { id } = req.params
        const student = await studentModel.findById(id)
        if (!student) {
            res.status(404).send("Student does not exist")
        }
        else {
            res.status(200).send(student)
        }

        // const id = document.getElementById("id").value
        // const name = document.getElementById("name").value
        // const branch = document.getElementById("branch").value
        // const student = await studentModel.findById(id)
        // res.send(student)
    }
    catch (err) {
        res.status(404).send("Cannot display student details ")
    }
}

async function createStudent(req, res) {
    try {
        const id = req.body.id
        const student = await studentModel.create({
            _id: id,
            name: req.body.name,
            branch: req.body.branch,
            marks: req.body.marks
        })
        res.status(200).send(student)
    }
    catch (err) {
        res.send("err")
    }
}

async function editStudent(req, res) {
    const { id } = req.params
    const student = await studentModel.findByIdAndUpdate(id, {
        _id: id,
        name: req.body.name,
        branch: req.body.branch,
        marks: req.body.marks
    })

    if (!student) {
        res.status(404).send("Student does not exist")
    }
    else {
        const updated = await studentModel.findById(id)
        res.status(200).send(updated)
    }
}

async function deleteStudent(req, res) {
    const { id } = req.params
    const student = await studentModel.findByIdAndDelete(id, {
        _id: id,
        name: req.body.name,
        branch: req.body.branch,
        marks: req.body.marks

    })

    if (!student) {
        res.status(404).send("Student does not exist")
    }
    else {
        const updated = await studentModel.findById(id)
        res.status(200).send(updated)
    }
}



methods = { getStudents, getStudentsById, createStudent, editStudent, deleteStudent }
module.exports = methods