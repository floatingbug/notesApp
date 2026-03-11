const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({newNote, userId}) => {
    const db = getDb();

    const doc = {
        ...newNote,
        userId: new ObjectId(userId),
        createdAt: new Date(),
    };

    const result = await db.collection("notes").insertOne(doc);

    return result;
};
