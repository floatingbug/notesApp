const { getDb, ObjectId } = require("../../../db/mongo");

module.exports = async ({ userId, query }) => {
    const db = getDb();
    const collection = db.collection("tasks");

    const limit = query.limit > 0
        ? query.limit
        : 10;

    const now = new Date();

    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date(now);
    endOfToday.setHours(23, 59, 59, 999);

    const buildCursorMatch = (cursorId) => {
        if (!cursorId){
            return {};
        }
        else{
            return {
                _id: {
                    $lt: new ObjectId(cursorId),
                },
            };
        }
    };

    const pipeline = [
        {
            $match: {
                userId: new ObjectId(userId),
            },
        },
        {
            $facet: {
                overdueTasks: [
                    {
                        $match: {
                            date: {
                                $ne: null,
                                $lt: startOfToday,
                            },
                            ...buildCursorMatch(query.overdueCursorId),
                        },
                    },
                    { $sort: { _id: -1 } },
                    { $limit: limit },
                ],
                dueTodayTasks: [
                    {
                        $match: {
                            date: {
                                $gte: startOfToday,
                                $lte: endOfToday,
                            },
                            ...buildCursorMatch(query.dueTodayCursorId),
                        },
                    },
                    { $sort: { _id: -1 } },
                    { $limit: limit },
                ],
                nextUpTasks: [
                    {
                        $match: {
                            date: {
                                $gt: endOfToday,
                            },
                            ...buildCursorMatch(query.nextUpCursorId),
                        },
                    },
                    { $sort: { _id: -1 } },
                    { $limit: limit },
                ],
                tasks: [
                    {
                        $match: {
                            ...buildCursorMatch(query.tasksCursorId),
                        },
                    },
                    { $sort: { _id: -1 } },
                    { $limit: limit },
                ],
            },
        },
    ];

    const [result] = await collection.aggregate(pipeline).toArray();

    const buildResponse = (items) => {
        return {
            items,
            nextCursor: items.length
                ? items[items.length - 1]._id
                : null,
        };
    };

    return {
        overdue: buildResponse(result.overdueTasks),
        dueToday: buildResponse(result.dueTodayTasks),
        nextUp: buildResponse(result.nextUpTasks),
        tasks: buildResponse(result.tasks),
    };
};
