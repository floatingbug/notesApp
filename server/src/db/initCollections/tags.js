const { getDb } = require('../mongo');

async function initTags() {
    const db = getDb();

    await db.collection('tags').createIndex(
        { label: 1 },
        { unique: true }
    );
}

module.exports = {
    initTags
};
