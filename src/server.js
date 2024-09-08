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
                scriptSrc: ["http://127.0.0.1:8081", "'nonce-uasdimAsNXCzP5AG6Rvux'", "'sha256-vM3C9QY5hDRLJ6QVCFG8kJw6Im8OLHznLcH00GohNAU='"],
                connectSrc: ["'self'", "http://127.0.0.1:8081", "http://127.0.0.1:8080"]
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

app.get('/api', function(req, res){
    console.log(`Sucess calling`)
    res.status(200).json({ msg: 'Sucess'})
})


app.get('/secure-cookies', function(req, res){
    const dataToSendIntoCookie = {
        safetyData: 'This is the secret data in the cookie'
    }

    res.cookie("secureCookie", JSON.stringify(dataToSendIntoCookie), {
        httpOnly: true,
        secure: true
    })

    res.status(201).json({msg: 'Sended safety my cookies to server'})
})

app.listen(8080)