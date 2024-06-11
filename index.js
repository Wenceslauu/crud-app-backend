const express = require("express");
const userRouter = require("./controllers/userController");
const taskRouter = require("./controllers/todoController");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL

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
