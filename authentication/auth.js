const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())
app.post('/login', (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    jwt.sign({ user }, "secret key", { expiresIn: 20 }, (err, token) => {
        res.send({ token })
    })

})
app.post('/profile', verifyToken, (req, res) => {
    jwt.verify(req.token, "secret key", (err, data) => {
        if (err) {
            res.send("Invalid token")
        }
        else {
            res.send(data)
        }

    })
})

function verifyToken(req, res, next) {
    const head = req.headers
    if ('authorization' in head) {
        const token = req.headers["authorization"].split(' ')[1]
        req.token = token
        next()
    } else {
        return res.status(401).send("Unauthorized")
    }


}
app.listen(2000)