const projectRouter = require('express').Router();
const Projects = require('./model');

projectRouter.get('/', (req, res, next) => {
       Projects.getProjects() 
        .then(projects => { 
            projects.forEach(row => 
            !row.project_completed ? 
                row.project_completed = false : 
                row.project_completed = true) 
        res.status(200).json(projects); 
            })
            .catch (next) // if error, pass it to the error handler below
});



projectRouter.post('/', async (req, res, next) => {
    try {
        const newProject = await Projects.createProject(req.body);
        !newProject.project_completed ?
            newProject.project_completed = false :
            newProject.project_completed = true
        res.status(201).json(newProject);
    } catch (error) {
        next(error); //
    }
});

projectRouter.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message
    });
});

module.exports = projectRouter;

