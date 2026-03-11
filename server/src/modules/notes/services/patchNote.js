const models = require("../models");


module.exports = async ({userId, noteId, payload}) => {
    const result = await models.patchNote({
        userId,
        noteId,
        payload,
    });

    if(!result.matchedCount){
        throw {
            message: "Note not found",
            status: 404,
        };
    }

    return result;
};
