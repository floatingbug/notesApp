const catchAsync = require("../../../utils/catchAsync");
const services = require("../services");


module.exports = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const taskId = req.params.taskId;
    const key = Object.keys(req.body)[0];
    const value = req.body[key];

    const result = await services.patchTask({
        userId,
        taskId,
        key,
        value,
    });

    res.status(204).end();
});
