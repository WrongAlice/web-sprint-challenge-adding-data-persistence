// build your `Resource` model here
const db = require('../../data/dbConfig');

function getResources() {
    return db('resources') // return all resources from the database
        .select( // select the id, name, and description
            'resource_id', 
            'resource_name', 
            'resource_description'
            );
}

async function createResources(resource) {
    const resourceId = await db('resources').insert(resource);
    const newResource = await getResources()
        .where('resource_id', resourceId)
        .first();
    return newResource;
}

module.exports = {
    getResources,
    createResources
}

