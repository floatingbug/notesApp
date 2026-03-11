// /middlewares/validatePatchNote.js
const validator = require('validator');

const allowedFields = ['title', 'content', 'tags', 'pinNote', 'archiveNote'];

// Utility to push standardized errors
function addError(errorsArray, type, field, message){
    errorsArray.push({ type, field, message });
}

function validatePatchNote(req, res, next){
    const errors = [];
    const { noteId } = req.params;

    // Validate noteId (MongoDB ObjectId)
    if(!validator.isMongoId(noteId)){
        addError(errors, "params", "noteId", "must be a valid MongoDB ObjectId");
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

                case 'content':
                    if(typeof value !== 'string'){
                        addError(errors, "inputError", "content", "must be a string");
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
                                addError(errors, "inputError", `tags[${index}]`, "must be a non-empty string");
                            }
                        });

                        if(new Set(normalizedTags).size !== normalizedTags.length){
                            addError(errors, "inputError", "tags", "contains duplicate values");
                        }

                        req.body.tags = normalizedTags;
                    }
                    break;

                case 'pinNote':
                    if(typeof value !== 'boolean'){
                        addError(errors, "inputError", "pinNote", "must be a boolean");
                    }
                    break;

                case 'archiveNote':
                    if(typeof value !== 'boolean'){
                        addError(errors, "inputError", "archiveNote", "must be a boolean");
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

module.exports = validatePatchNote;
