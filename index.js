const express = require("express");
const userRouter = require("./controllers/userController");
const taskRouter = require("./controllers/todoController");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@backend-ac2.2p3fhjc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=backend-ac2`;

const app = express();
app.use(express.json());

app.use(cors());
app.use("/users", userRouter);
app.use("/todo", taskRouter);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta :${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Erro ao conectar no banco de dados. ${error}`);
  });

app.get("/", (req, res) => {
  res.send("Funcionando");
});
