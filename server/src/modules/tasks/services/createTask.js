const models = require('../models');

module.exports = async ({userId, task}) => {
    // normalize tags
    task.tags = (task.tags || []).map(tag => tag.trim().toLowerCase());

    const resultEnsureTags = await models.ensureTags({userId, tags: task.tags});

    const resultCreateTask = await models.createTask({userId, task});

    return resultCreateTask;
}
