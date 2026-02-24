const validator = require('validator');

const allowedPriorities = ['low', 'medium', 'high'];
const allowedFields = ['title', 'description', 'date', 'priority', 'tags', 'checklist'];

function validatePatchTask(req, res, next){
    const errors = [];

    const { taskId } = req.params;

    // Validate taskId (MongoDB ObjectId)
    if (!validator.isMongoId(taskId)){
        errors.push({
            type: "params",
            message: "taskId must be a valid MongoDB ObjectId"
        });
    }

    const bodyKeys = Object.keys(req.body);

    // Must contain exactly one field
    if (bodyKeys.length !== 1){
        errors.push({
            type: "body",
            message: "Exactly one field must be provided for patch update"
        });
    }

    const field = bodyKeys[0];

    if (bodyKeys.length === 1){

        // Field must be allowed
        if (!allowedFields.includes(field)){
            errors.push({
                type: "body",
                message: `Field "${field}" is not allowed`
            });
        }
        else{

            const value = req.body[field];

            switch(field){

                case 'title':
                    if (typeof value !== 'string' || validator.isEmpty(value.trim())){
                        errors.push({
                            type: "title",
                            message: "title must be a non-empty string"
                        });
                    }
                    else{
                        req.body.title = value.trim();
                    }
                    break;

                case 'description':
                    if (typeof value !== 'string'){
                        errors.push({
                            type: "description",
                            message: "description must be a string"
                        });
                    }
                    break;

                case 'date':
                    if (typeof value !== 'string' || !validator.isISO8601(value)){
                        errors.push({
                            type: "date",
                            message: "date must be a valid ISO 8601 string"
                        });
                    }
                    else{
                        req.body.date = new Date(value);
                    }
                    break;

                case 'priority':
                    if (typeof value !== 'string' || !allowedPriorities.includes(value)){
                        errors.push({
                            type: "priority",
                            message: "priority must be one of: low, medium, high"
                        });
                    }
                    break;

                case 'tags':
                    if (!Array.isArray(value)){
                        errors.push({
                            type: "tags",
                            message: "tags must be an array"
                        });
                    }
                    else{
                        const normalizedTags = value.map(tag =>
                            typeof tag === 'string' ? tag.trim().toLowerCase() : ''
                        );

                        normalizedTags.forEach((tag, index) => {
                            if (validator.isEmpty(tag)){
                                errors.push({
                                    type: "tags",
                                    message: `tags[${index}] must be a non-empty string`
                                });
                            }
                        });

                        if (new Set(normalizedTags).size !== normalizedTags.length){
                            errors.push({
                                type: "tags",
                                message: "Task contains duplicate tags"
                            });
                        }

                        req.body.tags = normalizedTags;
                    }
                    break;

                case 'checklist':
                    if (!Array.isArray(value)){
                        errors.push({
                            type: "checklist",
                            message: "checklist must be an array"
                        });
                    }
                    else{
                        value.forEach((item, index) => {

                            if (typeof item !== 'object' || item === null){
                                errors.push({
                                    type: "checklist",
                                    message: `checklist[${index}] must be an object`
                                });
                                return;
                            }

                            if (item.id !== undefined){
                                if (typeof item.id !== 'string' || !validator.isUUID(item.id)){
                                    errors.push({
                                        type: "checklist",
                                        message: `checklist[${index}].id must be a valid UUID`
                                    });
                                }
                            }

                            if (typeof item.text !== 'string' || validator.isEmpty(item.text.trim())){
                                errors.push({
                                    type: "checklist",
                                    message: `checklist[${index}].text must be a non-empty string`
                                });
                            }

                            if (typeof item.done !== 'boolean'){
                                errors.push({
                                    type: "checklist",
                                    message: `checklist[${index}].done must be a boolean`
                                });
                            }
                        });
                    }
                    break;

                default:
                    break;
            }
        }
    }

    if (errors.length > 0){
        return res.status(400).json({
            message: "Validation failed",
            errors
        });
    }

    next();
}

module.exports = validatePatchTask;
