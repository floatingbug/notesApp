const {getDb, ObjectId} = require("../../../db/mongo");


module.exports = async ({userId, query}) => {
    const db = getDb();

    const filter = {
        userId: new ObjectId(userId),
    };

    if(query.cursorId){
        filter._id = {
            $lt: new ObjectId(query.cursorId),
        };
    }

    const result = await db.collection("notes")
        .find(filter)
        .sort({ _id: -1 })
        .limit(query.limit + 1)
        .toArray();

    const hasMore = result.length > query.limit;

    if(hasMore){
        result.pop();
    }

    return {
        data: result,
        nextCursor: hasMore
            ? result[result.length - 1]._id
            : null
    };
};
