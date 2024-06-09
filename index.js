const express = require('express')
const userRoutes = require('./controllers/usersController')
const mongoose = require("mongoose")

const porta = 8080

const app = express()
app.use(express.json())

app.use("/users", userRoutes)

mongoose.connect("mongodb+srv://admin:admin@crup-app.qn2y6aw.mongodb.net/crud-app?retryWrites=true&w=majority&appName=crup-app")
.then( () => {
    app.listen(porta, () => {
        console.log("Banco de dados conectado com")
        console.log(`Servidor rodando em http://localhost:${porta}`)
    })
})
.catch( (err) => {
    console.log(err)
} )

