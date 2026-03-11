const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({userId, noteId, payload}) => {
    const db = getDb();

    const filter = {
        _id: new ObjectId(noteId),
        userId: new ObjectId(userId),
    };

    const update = {
        $set: payload,
    };

    const result = await db.collection("notes").updateOne(filter, update);

    return result;
};
