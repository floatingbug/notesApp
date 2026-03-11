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

    // --- cursorId ---
    if (req.query.cursorId) {
        if (!ObjectId.isValid(req.query.cursorId)) {
            return res.status(400).json({ error: `Cursor must be a valid ObjectId.` });
        }
        parsedQuery.cursorId = req.query.cursorId;
    }

    req.parsedQuery = parsedQuery;
    next();
};
