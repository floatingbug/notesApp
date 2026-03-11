// /middlewares/validateCreateNote.js
const validator = require("validator");

// Utility to push standardized errors
function addError(errorsArray, type, field, message){
    errorsArray.push({ type, field, message });
}

function validateCreateNote(req, res, next){
    const errors = [];
    const { title, content, tags, pinNote, archiveNote } = req.body;

    // title (required)
    if(typeof title !== "string" || validator.isEmpty(title.trim())){
        addError(errors, "inputError", "title", "must be a non-empty string");
    }

    // pinNote (required)
    if(typeof pinNote !== "boolean"){
        addError(errors, "inputError", "pinNote", "must be a boolean");
    }

    // archiveNote (required)
    if(typeof archiveNote !== "boolean"){
        addError(errors, "inputError", "archiveNote", "must be a boolean");
    }

    // content (optional)
    if(content !== undefined){
        if(typeof content !== "string"){
            addError(errors, "inputError", "content", "must be a string");
        }
    }

    // tags (optional)
    if(tags !== undefined){
        if(!Array.isArray(tags)){
            addError(errors, "inputError", "tags", "must be an array");
        }
        else{
            const normalizedTags = tags.map(tag =>
                typeof tag === "string" ? tag.trim().toLowerCase() : ''
            );

            normalizedTags.forEach((tag, index) => {
                if(validator.isEmpty(tag)){
                    addError(errors, "inputError", `tags[${index}]`, "must be a non-empty string");
                }
            });

            if(new Set(normalizedTags).size !== normalizedTags.length){
                addError(errors, "inputError", "tags", "contains duplicate values");
            }

            // overwrite with normalized values
            req.body.tags = normalizedTags;
        }
    }

    if(errors.length > 0){
        return res.status(400).json({
            message: "Validation failed",
            errors
        });
    }

    next();
}

module.exports = validateCreateNote;
