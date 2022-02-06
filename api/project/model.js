const db = require('../../data/dbConfig.js'); 

function getProjects() { 
    return db('projects') 
       .select( 
           'project_id', 
           'project_name', 
           'project_description', 
           'project_completed'
        );
}

async function createProject(project) { 
    const projectId = await db('projects').insert(project); 
    const newProject = await getProjects() 
        .where('project_id', projectId) 
        .first();  
    return newProject;  
}

module.exports = { 
    getProjects, 
    createProject 
};


