const models = require("../models");


module.exports = async ({userId, query}) => {
    const result = await models.getNotes({userId, query});

    return result;
};
