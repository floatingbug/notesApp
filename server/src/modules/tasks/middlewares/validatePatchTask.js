// /middlewares/validatePatchTask.js
const validator = require('validator');

const allowedPriorities = ['low', 'medium', 'high'];
const allowedFields = ['title', 'description', 'date', 'priority', 'tags', 'checklist'];

// Utility to push standardized errors
function addError(errorsArray, type, field, message){
    errorsArray.push({ type, field, message });
}

function validatePatchTask(req, res, next){
    const errors = [];
    const { taskId } = req.params;

    // Validate taskId (MongoDB ObjectId)
    if(!validator.isMongoId(taskId)){
        addError(errors, "params", "taskId", "must be a valid MongoDB ObjectId");
    }

    const bodyKeys = Object.keys(req.body);

    // Must contain exactly one field
    if(bodyKeys.length !== 1){
        addError(errors, "body", null, "Exactly one field must be provided for patch update");
    }

    const field = bodyKeys[0];

    if(bodyKeys.length === 1){
        // Field must be allowed
        if(!allowedFields.includes(field)){
            addError(errors, "body", field, `Field "${field}" is not allowed`);
        }
        else{
            const value = req.body[field];

            switch(field){
                case 'title':
                    if(typeof value !== 'string' || validator.isEmpty(value.trim())){
                        addError(errors, "inputError", "title", "must be a non-empty string");
                    }
                    else{
                        req.body.title = value.trim();
                    }
                    break;

                case 'description':
                    if(typeof value !== 'string'){
                        addError(errors, "inputError", "description", "must be a string");
                    }
                    break;

                case 'date':
                    if(typeof value !== 'string' || !validator.isISO8601(value)){
                        addError(errors, "inputError", "date", "must be a valid ISO 8601 string");
                    }
                    else{
                        req.body.date = new Date(value);
                    }
                    break;

                case 'priority':
                    if(typeof value !== 'string' || !allowedPriorities.includes(value)){
                        addError(errors, "inputError", "priority", "must be one of: low, medium, high");
                    }
                    break;

                case 'tags':
                    if(!Array.isArray(value)){
                        addError(errors, "inputError", "tags", "must be an array");
                    }
                    else{
                        const normalizedTags = value.map(tag =>
                            typeof tag === 'string' ? tag.trim().toLowerCase() : ''
                        );

                        normalizedTags.forEach((tag, index) => {
                            if(validator.isEmpty(tag)){
                                addError(errors, "inputError", `tags`, "must be a non-empty string");
                            }
                        });

                        if(new Set(normalizedTags).size !== normalizedTags.length){
                            addError(errors, "inputError", "tags", "contains duplicate values");
                        }

                        req.body.tags = normalizedTags;
                    }
                    break;

                case 'checklist':
                    if(!Array.isArray(value)){
                        addError(errors, "inputError", "checklist", "must be an array");
                    }
                    else{
                        value.forEach((item, index) => {
                            if(typeof item !== 'object' || item === null){
                                addError(errors, "inputError", "checklist", "checklist: must be an object");
                                return;
                            }

                            // id validation (optional)
                            if(item.id !== undefined){
                                if(typeof item.id !== 'string' || !validator.isUUID(item.id)){
                                    addError(errors, "inputError", `id`, "id: must be a valid UUID");
                                }
                            }

                            // text validation
                            if(typeof item.text !== 'string' || validator.isEmpty(item.text.trim())){
                                addError(errors, "inputError", `text`, "text: must be a non-empty string");
                            }

                            // done validation
                            if(typeof item.done !== 'boolean'){
                                addError(errors, "inputError", "checklist", "done: must be a boolean");
                            }
                        });
                    }
                    break;

                default:
                    break;
            }
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

module.exports = validatePatchTask;
