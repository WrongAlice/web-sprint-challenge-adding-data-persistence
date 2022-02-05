const projectRouter = require('express').Router();
const Projects = require('./model');

projectRouter.get('/', (req, res, next) => {
       Projects.getProjects() // get all projects
        .then(projects => { // send them back to the client
            projects.forEach(row => // for each row in the database, we want to return the id, name, and description
            !row.project_completed ? // if project is not completed
                row.project_completed = false : // set project_completed to false
                row.project_completed = true) // set project_completed to true
        res.status(200).json(projects); // send projects
            })
            .catch (next) 
});

// row points to the row in the database

projectRouter.post('/', async (req, res, next) => {
    try {
        const newProject = await Projects.createProject(req.body);
        !newProject.project_completed ?
            newProject.project_completed = false :
            newProject.project_completed = true
        res.status(201).json(newProject);
    } catch (error) {
        next(error);
    }
});

projectRouter.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message
    });
});

module.exports = projectRouter;

