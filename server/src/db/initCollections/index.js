const { initTags } = require('./tags');
const { initTasks} = require('./tasks');

module.exports = async function initCollections() {
    await initTags();
    await initTasks();
}

