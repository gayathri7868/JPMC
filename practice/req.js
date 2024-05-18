// var http = require('http')
// var express = require('express')
// var fs = require('fs')

// const app = express()
// app.get('/', (req, res) => {
//     var myReadStream = fs.createReadStream(__dirname + '/read.txt', 'utf8')
//     myReadStream.on('data', (chunk) => {
//         res.send(chunk)
//         res.end()
//     })
// })

// app.get('/index', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })
// app.listen(2000, () => console.log("server running"))

var http = require('http')
var express = require('express')
var fs = require('fs')
const s = require('./students.json')

const app = express()

app.use(express.json())
app.get('/', (req, res) => {
    var myReadStream = fs.createReadStream(__dirname + '/read.txt', 'utf8')
    myReadStream.pipe(res)
})

app.get('/api/students/:id', (req, res) => {
    const stu = s.students.find(student => student.id === req.params.id)
    res.send(stu)

})

app.get('/api/students', (req, res) => {
    res.send(s)
})

app.post('/api/students', (req, res) => {
    const stu = {
        id: req.body.id,
        name: req.body.name,
        branch: req.body.branch
    }
    s.students.push(stu)
    res.send(stu)
    const x = JSON.stringify(s)
    fs.writeFile('students.json', x, (err) => { console.log(x) })
})
app.put('/api/students/:id', (req, res) => {
    const stu = s.students.find(student => student.id === req.params.id)
    if (!stu) { res.status(404).send("id does not exist") }
    stu.name = req.body.name
    stu.branch = req.body.branch
    res.send(stu)
    const x = JSON.stringify(s, null, 2)
    fs.writeFile('students.json', x, (err) => { console.log(x) })
})

app.delete('/api/students/:id', (req, res) => {
    const stu = s.students.find(student => student.id === req.params.id)
    if (!stu) { res.status(404).send("id does not exist") }

    s.students.splice(s.students.indexOf(stu), 1)
    res.send(stu)
    const x = JSON.stringify(s)
    fs.writeFile('students.json', x, (err) => { console.log(x) })
})

app.listen(2000, () => console.log("server running"))