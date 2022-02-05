
// build your `/api/resources` router here

const resourceRouter = require('express').Router();
const Resources = require('./model');

resourceRouter.get('/', async (req, res, next) => {
    try {
        const resources = await Resources.getResources(); // get all resources from the database
        res.status(200).json(resources); // send the resources
    } catch (error) { // if there is an error
        next(error); // pass the error to the error handler
    } 
});

resourceRouter.post('/', async (req, res, next) => {
    try {
        const newResource = await Resources.createResources(req.body);
        res.status(201).json(newResource);
    } catch (error) {
        next(error);
    } 
});


module.exports = resourceRouter;
