require("dotenv").config();
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authentication");
const { TaskModel } = require("../models/todo");

router.get("/list", auth, async (req, res) => {
  try {
    const tasks = await TaskModel.find({});
    return res.status(200).json(tasks);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro buscando tarefas", error: error.message });
  }
});

router.put("/edit", auth, async (req, res) => {
  const {
    tasktitle,
    username,
    newTasktitle,
    newTaskdescription,
    newTaskaction,
  } = req.body;

  if (!tasktitle || !username) {
    return res.status(400).json({
      mensagem: "Alguns campos obrigatórios não foram preenchidos",
    });
  }

  try {
    const task = await TaskModel.findOne({
      tasktitle,
      username,
    });
    if (!task) {
      return res
        .status(404)
        .json({ message: "Tarefa não encontrada para este usuário" });
    }

    if (newTasktitle !== undefined) {
      task.tasktitle = newTasktitle;
    }
    if (newTaskdescription !== undefined) {
      task.taskdescription = newTaskdescription;
    }
    if (newTaskaction !== undefined) {
      task.taskaction = newTaskaction;
    }

    await task.save();

    return res
      .status(200)
      .json({ message: "Tarefa atualizada com sucesso", task });
  } catch (error) {
    console.error("Erro atualizando tarefa:", error);
    return res.status(500).json({ error: error.message });
  }
});

router.put("/edit-state", auth, async (req, res) => {
  const { taskaction } = req.body;

  try {
    if (taskaction === undefined) {
      return res
        .status(400)
        .json({ mensagem: "Um campo obrigatório não foi preenchido" });
    }

    await TaskModel.updateMany(
      { taskaction: { $ne: taskaction } },
      { taskaction: taskaction }
    );

    return res.status(200).json({ message: "Tarefas atualizadas com sucesso" });
  } catch (error) {
    console.error("Erro atualizando tarefas:", error);
    return res.status(500).json({ error: error.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  const { username, tasktitle } = req.body;

  if (!username || !tasktitle) {
    return res.status(400).json({
      message: "Alguns campos não obrigatórios não foram preenchidos",
    });
  }

  try {
    const task = await TaskModel.findOne({
      tasktitle: tasktitle,
      username: username,
    });
    if (!task) {
      return res
        .status(404)
        .json({ message: "Tarefa não encontrada para este usuário" });
    }

    await TaskModel.deleteOne({ tasktitle: tasktitle, username: username });

    return res.status(200).json({ message: "Tarefa apagada com sucesso " });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/create", auth, async (req, res) => {
  const { tasktitle, taskdescription, taskaction, username } = req.body;
  const task = {
    tasktitle,
    taskdescription,
    taskaction,
  };

  if (username) {
    task.username = username;
  }

  if (!tasktitle || !taskdescription) {
    return res.status(400).json({
      message: "Alguns campos não obrigatórios não foram preenchidos",
    });
  }

  try {
    await TaskModel.create(task);
    return res.status(201).json({
      message: "Tarefa criada com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/tasks-without-owner", async (req, res) => {
  try {
    const tasks = await TaskModel.find({ username: { $exists: false } });

    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.put("/add-owner", auth, async (req, res) => {
  const { tasktitle, username } = req.body;

  try {
    const task = await TaskModel.findOne({
      tasktitle,
      username: { $exists: false },
    });
    if (!task) {
      return res.status(404).json({
        message: "Tarefa não encontrada ou já possui um proprietário",
      });
    }

    task.username = username;
    await task.save();

    return res.status(200).json({
      message: "Proprietário adicionado à tarefa com sucesso",
      task: task,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
