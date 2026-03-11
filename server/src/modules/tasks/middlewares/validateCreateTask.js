// /middlewares/validateCreateTask.js
const validator = require('validator');

const allowedPriorities = ['low', 'medium', 'high'];

// Utility to push a standardized error
function addError(errorsArray, type, field, message){
    errorsArray.push({ type, field, message });
}

function validateCreateTask(req, res, next){
    const errors = [];
    const { title, description, date, priority, tags, checklist } = req.body;

    console.log(req.body);

    // title (required)
    if(typeof title !== 'string' || validator.isEmpty(title.trim())){
        addError(errors, "inputError", "title", "must be a non-empty string");
    }

    // description (optional)
    if(description !== undefined){
        if(typeof description !== 'string'){
            addError(errors, "inputError", "description", "must be a string");
        }
    }

    // date (optional)
    if(date !== undefined){
        if(typeof date !== 'string' || !validator.isISO8601(date)){
            addError(errors, "inputError", "date", "must be a valid ISO 8601 string");
        }
        else{
            // convert string to JS Date
            req.body.date = new Date(date);
        }
    }

    // priority (optional)
    if(priority !== undefined){
        if(typeof priority !== 'string' || !allowedPriorities.includes(priority)){
            addError(errors, "inputError", "priority", "must be one of: low, medium, high");
        }
    }

    // tags (optional)
    if(tags !== undefined){
        if(!Array.isArray(tags)){
            addError(errors, "inputError", "tags", "must be an array");
        }
        else{
            const normalizedTags = tags.map(tag => tag.trim().toLowerCase());

            normalizedTags.forEach((tag, index) => {
                if(validator.isEmpty(tag)){
                    addError(errors, "inputError", `tags`, "must be a non-empty string");
                }
            });

            if(new Set(normalizedTags).size !== normalizedTags.length){
                addError(errors, "inputError", "tags", "contains duplicate values");
            }
        }
    }

    // checklist (optional)
    if(checklist !== undefined){
        if(!Array.isArray(checklist)){
            addError(errors, "inputError", "checklist", "must be an array");
        }
        else{
            checklist.forEach((item, index) => {
                if(typeof item !== 'object' || item === null){
                    addError(errors, "inputError", "checklist", "must be an object");
                    return;
                }

                // text validation
                if(typeof item.text !== 'string' || validator.isEmpty(item.text.trim())){
                    addError(errors, "inputError", `checklist`, "text: must be a non-empty string");
                }

                // done validation
                if(typeof item.done !== 'boolean'){
                    addError(errors, "inputError", `checklist`, "done: must be a boolean");
                }
            });
        }
    }

    console.log(errors);

    if(errors.length > 0){
        return res.status(400).json({
            message: "Validation failed",
            errors
        });
    }

    next();
}

module.exports = validateCreateTask;
