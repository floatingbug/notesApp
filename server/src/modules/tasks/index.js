const router = require("express").Router();
const controller = require("./controller");
const {validateCreateTask, validateGetTasks} = require("./middlewares");
const authUser = require("../../middlewares/authUser");


router.post("/", authUser, validateCreateTask, controller.createTask);
router.get("/", authUser, validateGetTasks, controller.getTasks);


module.exports = router;
