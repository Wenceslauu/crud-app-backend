const express = require('express');
const router = express.Router();
const { randomUUID } = require('crypto')
const User = require('.././models/Users')

var users = []

router.get("/", async (req, res) => {
    let resposta = await User.find()
    return res.json(resposta)
})

router.post("/", (req, res) => {

    var { nome, email } = req.body;

    var user = {
        id: randomUUID(),
        nome: nome, 
        email: email
    }

    users.push(user)

    console.log("Usuario adicionado com sucesso!")
    return res.json(
        {
            mensagem: "Usuario adicionado com sucesso!",
            user: user
        }
    )
})

router.put("/:id", (req, res) => {
    var id = req.params.id
    var { nome, email } = req.body;


    users.map( user => {
        if(user.id == id) {
            user.nome = nome,
            user.email = email
        }
    } )

    console.log("Usuario editado com sucesso!")

    return res.json(
        {
            mensagem: "Usuario adicionado com sucesso!",
            users: users
        }
    )
})

router.delete("/:id", (req, res) => {
    var id = req.params.id

    users = users.filter( user => {
        return user.id != id
    })

    console.log("Usuario deletado com sucesso!")

    return res.json(
        {
            mensagem: "Usuario deletado com sucesso!",
            users: users
        }
    )
})


module.exports = router;