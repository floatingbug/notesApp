const catchAsync = require("../../../utils/catchAsync");
const services = require("../services");


module.exports = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const query = req.parsedQuery;

    const result = await services.getNotes({
        userId,
        query,
    });

    res.json(result);
});
