const router = require("express").Router();
const controller = require("./controller");
const authUser = require("../../middlewares/authUser");
const {validateCreateNote, validateGetNotes, validatePatchNote} = require("./middlewares");


router.post("/", authUser, validateCreateNote, controller.createNote);
router.get("/", authUser, validateGetNotes, controller.getNotes);
router.patch("/:noteId", authUser, validatePatchNote, controller.patchNote);


module.exports = router;
