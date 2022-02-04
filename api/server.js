const express = require('express');
// const projectRouter = require('./project/router');
// const resourceRouter = require('./resource/router');
// const taskRouter = require('./task/router');

const server = express();
server.use(express.json());

// server.use('/api/projects', projectRouter);
// server.use('/api/resources', resourceRouter);
// server.use('/api/tasks', taskRouter);

server.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
})

server.get('./', (req, res) => {
    res.send(`<h1> WELCOME TO MY {{{NIGHTMARE}}} AKA: ADDING DATA PERSISTENCE SPRINT CHALLENGE </h1>`)
})

module.exports = server

