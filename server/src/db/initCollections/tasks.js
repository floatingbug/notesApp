const { getDb } = require('../mongo');

async function initTasks() {
    const db = getDb();

    await db.collection("tasks").createIndexes([
        {
            key: { userId: 1, _id: -1 },
            name: "userId__id_desc",
        },
        {
            key: { userId: 1, date: 1, _id: -1 },
            name: "userId_date__id_desc",
        },
    ]);
}

module.exports = {
    initTasks
};
