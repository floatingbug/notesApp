const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({task, userId}) => {
    const db = getDb();
    const doc = {
        userId: new ObjectId(userId),
        ...task,
    }; 

    const result = await db.collection("tasks").insertOne(doc);

    return result;
};
