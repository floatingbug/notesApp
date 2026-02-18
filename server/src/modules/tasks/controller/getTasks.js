const catchAsync = require("../../../utils/catchAsync");
const services = require ("../services");


module.exports = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const query = req.parsedQuery;

    console.log(query);

    const result = await services.getTasks({userId, query});

    res.json(result);
});
