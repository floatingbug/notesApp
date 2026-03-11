db.notes.insertMany([
{
    _id: ObjectId("69b100000000000000000001"),
    tags: ["work", "backend"],
    title: "API Refactor",
    content: "Refactor note service and improve validation logic.",
    pinNote: true,
    archiveNote: false,
    userId: ObjectId("697373b6375b94bdc67e29dc"),
    createdAt: ISODate("2026-03-01T08:12:21.000Z")
},
{
    _id: ObjectId("69b100000000000000000002"),
    tags: ["ideas", "project"],
    title: "Side Project Idea",
    content: "Build a minimal note app with offline sync.",
    pinNote: false,
    archiveNote: false,
    userId: ObjectId("697373b6375b94bdc67e29dc"),
    createdAt: ISODate("2026-03-01T09:45:10.000Z")
},
{
    _id: ObjectId("69b100000000000000000003"),
    tags: ["todo"],
    title: "Shopping List",
    content: "Milk, coffee beans, bread, tomatoes.",
    pinNote: false,
    archiveNote: false,
    userId: ObjectId("697373b6375b94bdc67e29dc"),
    createdAt: ISODate("2026-03-02T10:01:05.000Z")
},
{
    _id: ObjectId("69b100000000000000000004"),
    tags: ["vue", "frontend"],
    title: "Vue Notes",
    content: "Investigate reactivity issues with nested objects.",
    pinNote: true,
    archiveNote: false,
    userId: ObjectId("697373b6375b94bdc67e29dc"),
    createdAt: ISODate("2026-03-02T13:20:55.000Z")
},
{
    _id: ObjectId("69b100000000000000000005"),
    tags: ["archive", "old"],
    title: "Old Meeting Notes",
    content: "Discussion about migrating to a new architecture.",
    pinNote: false,
    archiveNote: true,
    userId: ObjectId("697373b6375b94bdc67e29dc"),
    createdAt: ISODate("2026-03-03T07:33:41.000Z")
},
{
    _id: ObjectId("69b100000000000000000006"),
    tags: ["learning", "mongodb"],
    title: "MongoDB Indexes",
    content: "Test compound indexes for userId and createdAt.",
    pinNote: false,
    archiveNote: false,
    userId: ObjectId("697373b6375b94bdc67e29dc"),
    createdAt: ISODate("2026-03-03T15:18:12.000Z")
},
{
    _id: ObjectId("69b100000000000000000007"),
    tags: ["personal"],
    title: "Weekend Plan",
    content: "Hiking trip and finish reading the programming book.",
    pinNote: false,
    archiveNote: false,
    userId: ObjectId("697373b6375b94bdc67e29dc"),
    createdAt: ISODate("2026-03-04T11:55:09.000Z")
},
{
    _id: ObjectId("69b100000000000000000008"),
    tags: ["bug", "frontend"],
    title: "Fix Tag Rendering",
    content: "Bug occurs when updating tags inside modal.",
    pinNote: true,
    archiveNote: false,
    userId: ObjectId("697373b6375b94bdc67e29dc"),
    createdAt: ISODate("2026-03-04T16:02:44.000Z")
}
]);
