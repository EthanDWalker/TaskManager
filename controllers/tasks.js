const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});

  res.status(201).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task with ID ${taskID}`, 404));
  }
  res.status(201).json({ task });
});

const editTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.updateOne({ _id: taskID }, req.body);

  if (!task) {
    return next(createCustomError(`No task with ID ${taskID}`, 404));
  }

  res.json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.deleteOne({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task with ID ${taskID}`, 404));
  }

  res.send({ task });
});

module.exports = {
  getTask,
  getTasks,
  createTask,
  editTask,
  deleteTask,
};
