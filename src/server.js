const path = require('path')
const express = require('express')
const csp = require('helmet-csp')

const app = express()

{
    app.use(csp({
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "http://127.0.0.1:8081"],
                imgSrc: ["data:", "http://127.0.0.1:8081"],
                scriptSrc: ["http://127.0.0.1:8081", "'nonce-uasdimAsNXCzP5AG6Rvux'"]
            },
            reportUri: '/report-violation'
    }))
}

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/style.css', function(req, res){
    res.sendFile(path.join(__dirname, '/style.css'))
})

app.get('/sucess', function(req, res){
    console.log(`Sucess calling`)
    res.status(200).json({ msg: "Sucess"})
})

app.listen(8080)