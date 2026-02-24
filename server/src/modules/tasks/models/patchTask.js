const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({taskId, key, value}) => {
    const filter = {
        _id: new ObjectId(taskId),
    };
    const update = {
        $set:{
            [key]: value,
        }
    };

    const db = getDb();

    return await db.collection("tasks").updateOne(filter, update);
}
