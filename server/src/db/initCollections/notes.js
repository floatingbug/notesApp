const { getDb } = require('../mongo');

async function initNotes() {
    const db = getDb();

    await db.collection("notes").createIndexes([
        {
            key: { userId: 1, _id: -1 },
            name: "userId__id_desc",
        },
    ]);
}

module.exports = {
    initNotes
};
