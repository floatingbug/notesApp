const models = require("../models");


module.exports = async ({newNote, userId}) => {
    const result = await models.createNote({newNote, userId});

    return result;
};
