var http = require('http')
var fs = require('fs')
var server = http.createServer((req, res) => {
    var myReadStream = fs.createReadStream(__dirname + '/index.html', { 'encoding': 'utf8' })
    var writeStream = fs.createWriteStream(__dirname + '/write.html')
    myReadStream.on('data', (chunk) => {
        //console.log(chunk)
        writeStream.write(chunk)
        res.write(chunk)
        res.end()
    })
})

server.listen(2000)

