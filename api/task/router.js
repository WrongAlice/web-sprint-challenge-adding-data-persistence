// build your `/api/tasks` router here
const taskRouter = require('express').Router();
const Tasks = require('./model');

taskRouter.get('/', (req, res, next) => {
    Tasks.getTasks()
     .then(tasks => {
         tasks.forEach(row =>
         !row.task_completed ?
             row.task_completed = false :
             row.task_completed = true)
     res.status(200).json(tasks);
         })
         .catch (next) 
});

taskRouter.post('/', async (req, res, next) => {
 try {
     const newTask = await Tasks.createTask(req.body);
     !newTask.task_completed ?
         newTask.task_completed = false :
         newTask.task_completed = true
     res.status(201).json(newTask);
 } catch (error) {
     next(error);
 }
});

taskRouter.use((err, req, res, next) => { //eslint-disable-line
 res.status(err.status || 500).json({
     message: err.message
 });
});

module.exports = taskRouter;


