const mongoose = require("mongoose");

const TaskModel = mongoose.model("tasks", {
  tasktitle: String,
  taskdescription: String,
  taskaction: Boolean,
  username: String,
});

module.exports = {
  TaskModel,
};
