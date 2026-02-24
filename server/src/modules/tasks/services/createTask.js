const { randomUUID } = require('crypto');
const models = require('../models');

module.exports = async ({ userId, task }) => {

    // normalize tags
    task.tags = (task.tags || []).map(tag => tag.trim().toLowerCase());

    // normalize checklist + add ids
    if (Array.isArray(task.checklist)){

        task.checklist = task.checklist.map(item => ({
            id: randomUUID(),
            text: item.text.trim(),
            done: Boolean(item.done),
        }));
    }
    else{
        task.checklist = [];
    }

    const resultEnsureTags = await models.ensureTags({
        userId,
        tags: task.tags,
    });

    const resultCreateTask = await models.createTask({
        userId,
        task,
    });

    return resultCreateTask;
};
