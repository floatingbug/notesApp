const models = require("../models");


module.exports = async ({userId, query}) => {
    const result = await models.getTasks({userId, query});

    return result;
};
