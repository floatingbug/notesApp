const catchAsync = require("../../../utils/catchAsync");
const services = require("../services");


module.exports = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const noteId = req.params.noteId;
    const payload = req.body;

    console.log(noteId, payload);

    const result = await services.patchNote({
        userId,
        noteId,
        payload,
    });

    res.status(200).json(result);
});
