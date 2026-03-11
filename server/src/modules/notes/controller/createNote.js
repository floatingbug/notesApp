const catchAsync = require("../../../utils/catchAsync");
const services = require("../services");


module.exports = catchAsync(async (req, res) => {
    const newNote = req.body;
    const userId = req.user.id;

    const result = services.createNote({userId, newNote});

    res.status(201).json(result);
});
