const { ObjectId } = require("mongodb");

const MAX_LIMIT = 10;

module.exports = (req, res, next) => {
    const parsedQuery = {};

    // --- limit ---
    if (!req.query.limit) {
        return res.status(400).json({ error: "limit is required." });
    }

    const limit = Number(req.query.limit);
    if (isNaN(limit) || limit < 1) {
        return res.status(400).json({ error: "limit must be a positive Number." });
    }
    if (limit > MAX_LIMIT) {
        return res.status(400).json({ error: `max limit is ${MAX_LIMIT}.` });
    }
    parsedQuery.limit = limit;

    // --- cursor IDs ---
    const cursorKeys = [
        "overdueCursorId",
        "dueTodayCursorId",
        "nextUpCursorId",
        "tasksCursorId",
    ];

    cursorKeys.forEach((key) => {
        const value = req.query[key];
        if (value !== undefined) {
            if (!ObjectId.isValid(value)) {
                return res.status(400).json({ error: `${key} must be a valid ObjectId.` });
            }
            parsedQuery[key] = value;
        }
    });

    // --- optional category ---
    if (req.query.category) {
        const allowedCategories = ["overdue", "dueToday", "nextUp", "tasks"];
        if (!allowedCategories.includes(req.query.category)) {
            return res.status(400).json({ error: "invalid category." });
        }
        parsedQuery.category = req.query.category;
    }

    req.parsedQuery = parsedQuery;
    next();
};
