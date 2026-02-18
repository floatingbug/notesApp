const validator = require('validator');

const allowedPriorities = ['low', 'medium', 'high'];

function validateCreateTask(req, res, next) {
    const errors = [];
    const { title, description, date, priority, tags, checklist } = req.body;

    // title (required)
    if (typeof title !== 'string' || validator.isEmpty(title.trim())) {
        errors.push({ type: "title", message: 'title must be a non-empty string' });
    }

    // description (optional)
    if (description !== undefined) {
        if (typeof description !== 'string') {
            errors.push({ type: "description", message: 'description must be a string' });
        }
    }

    if (date) {
        if (typeof date !== 'string' || !validator.isISO8601(date)) {
            errors.push({ type: "dueDate", message: 'date must be a valid ISO 8601 string' });
        } 
        else{
            // convert string to JS Date
            req.body.date = new Date(date);
        }
    }

    // priority (optional)
    if (priority) {
        if (typeof priority !== 'string' || !allowedPriorities.includes(priority)) {
            errors.push({ type: "priority", message: 'priority must be one of: low, medium, high' });
        }
    }

    // tags (optional)
    if (tags !== undefined) {
        if (!Array.isArray(tags)) {
            errors.push({ type: "tags", message: 'tags must be an array' });
        } else {
            const normalizedTags = tags.map(tag => tag.trim().toLowerCase());

            normalizedTags.forEach((tag, index) => {
                if (validator.isEmpty(tag)) {
                    errors.push({ type: "tags", message: `tags[${index}] must be a non-empty string` });
                }
            });

            if (new Set(normalizedTags).size !== normalizedTags.length) {
                errors.push({ type: "tags", message: "Task contains duplicate tags" });
            }
        }
    }

    // checklist (optional)
    if (checklist !== undefined) {
        if (!Array.isArray(checklist)) {
            errors.push({ type: "checklist", message: "checklist must be an array" });
        } 
        else {
            checklist.forEach((item, index) => {

                if (typeof item !== 'object' || item === null) {
                    errors.push({
                        type: "checklist",
                        message: `checklist[${index}] must be an object`
                    });
                    return;
                }

                // text validation
                if (typeof item.text !== 'string' || validator.isEmpty(item.text.trim())) {
                    errors.push({
                        type: "checklist",
                        message: `checklist[${index}].text must be a non-empty string`
                    });
                }

                // done validation
                if (typeof item.done !== 'boolean') {
                    errors.push({
                        type: "checklist",
                        message: `checklist[${index}].done must be a boolean`
                    });
                }
            });
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            message: 'Validation failed',
            errors
        });
    }

    next();
}

module.exports = validateCreateTask;
