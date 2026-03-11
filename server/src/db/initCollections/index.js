const { initTags } = require('./tags');
const { initTasks} = require('./tasks');
const { initNotes } = require('./notes');

module.exports = async function initCollections() {
    await initTags();
    await initTasks();
    await initNotes();
}

