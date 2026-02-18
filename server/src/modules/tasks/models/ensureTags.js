const { getDb, ObjectId } = require('../../../db/mongo');

module.exports = async ({ userId, tags }) => {
    const db = getDb();

    const result = await db.collection('tags').updateOne(
        { userId: new ObjectId(userId) },
        {
            $addToSet: {
                tags: { $each: tags}
            }
        },
        { upsert: true }
    );

    return result;
}
