const express = require('express')


const server = express()

 

const port = 5000

server.use(express.json())

server.get('/*', (req, res) => {
    res.send('This is my first USSD Application')
})


server.listen(port,()=>console.log(`Server is running on port ${port}`))