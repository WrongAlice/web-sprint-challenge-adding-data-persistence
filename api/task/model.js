// build your `Task` model here

const db = require('../../data/dbConfig');

async function getTasks() {
    const tasks = await db('tasks as t')
        .join('projects as p', 
            't.project_id', 
            'p.project_id'
        )
        .select(
           't.task_id',
           't.task_description',
           't.task_notes', 
           't.task_completed',
           'p.project_name',
           'p.project_description'
        );
    return tasks;
}

async function createTask(task) {
    const taskId = await db('tasks').insert(task);
    const newTask = await db('tasks')
        .where('task_id', taskId)
        .first();
    return newTask;
}

module.exports = {
    getTasks,
    createTask
};

