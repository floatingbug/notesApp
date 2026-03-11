const models = require("../models");
const {randomUUID} = require("crypto");


module.exports = async ({userId, taskId, key, value}) => {
    let normalizedValue = value;

    console.log(userId, taskId, key, value);

    // add id to checklist item
    if (key === 'checklist' && Array.isArray(value)){

        normalizedValue = value.map(item => ({
            id: item.id ? item.id : randomUUID(),
            text: item.text.trim(),
            done: Boolean(item.done),
        }));
    }

    // ensure tags
    if(key === "tags"){
        const resultEnsureTags = await models.ensureTags({
            userId,
            tags: value,
        });
    }

    const result = await models.patchTask({
        taskId,
        key,
        value: normalizedValue,
    });

    if(result.matchedCount === 0){
        throw {
            status: 404,
            message: "Task not found",
        };
    }

    return result;
};
