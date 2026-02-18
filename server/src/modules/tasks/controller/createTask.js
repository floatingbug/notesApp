const catchAsync = require("../../../utils/catchAsync");
const services = require("../services");


module.exports = catchAsync(async (req, res) => {
    const task = req.body;
    const userId = req.user.id;

    console.log(task);

    const result = await services.createTask({task, userId});

    res.end();
});
