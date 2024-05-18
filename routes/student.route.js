const express = require('express')
const routes = express.Router()
const studentModel = require('../models/student.model')
const methods = require('../controllers/student.controller')

routes.use(express.json())
routes.use(express.urlencoded({ extended: true }))

routes.get('/', methods.getStudents)
routes.get('/:id', methods.getStudentsById)
routes.post('/', methods.createStudent)
routes.put('/:id', methods.editStudent)
routes.delete('/:id', methods.deleteStudent)




module.exports = routes