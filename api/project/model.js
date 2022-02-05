/const db = require('../../data/dbConfig.js'); // import the database

function getProjects() { // get all projects
    return db('projects') // return all projects
       .select( // select the id, name, and description
           'project_id', // id
           'project_name', // name
           'project_description', // description
           'project_completed'// completed
        );
}

async function createProject(project) { // create a new project
    const projectId = await db('projects').insert(project); // insert the project into the database
    const newProject = await getProjects() // get all projects
        .where('project_id', projectId) // where the id is the id we just inserted
        .first();   // get the first row
    return newProject;  // return the new project
}

module.exports = { // export the functions
    getProjects, // get all projects
    createProject // create a new project
};


