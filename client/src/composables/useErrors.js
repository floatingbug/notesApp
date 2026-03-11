import { ref } from "vue";

export default function useErrors() {
    const errors = ref({});

    /**
     * Set new errors.
     * Automatically clears previous errors before setting.
     * Only includes errors of type "inputError".
     * @param {Array<{field:string, message:string, type:string}>} newErrors
     */
    function setErrors(newErrors) {
        clearErrors(); // clear all previous errors first

        newErrors.forEach(err => {
            if (err.type !== "inputError") return;

            // initialize array for this field if not exist
            if (!errors.value[err.field]) {
                errors.value[err.field] = [];
            }

            errors.value[err.field].push(err.message);
        });
    }

    /**
     * Clear errors.
     * If field is provided, clears only that field.
     * Otherwise clears all fields.
     * @param {string} [field]
     */
    function clearErrors(field) {
        if (field) {
            delete errors.value[field];
            return;
        }

        errors.value = {};
    }

    /**
     * Check if a specific field has any errors.
     * @param {string} field
     * @returns {boolean}
     */
    function hasError(field) {
        return !!errors.value[field]?.length;
    }

    /**
     * Return the first error message for a field.
     * @param {string} field
     * @returns {string|null}
     */
    function firstError(field) {
        return errors.value[field]?.[0] ?? null;
    }

    /**
     * Return all error messages for a field.
     * @param {string} field
     * @returns {Array<string>}
     */
    function getErrors(field) {
        return errors.value[field] ?? [];
    }

    return {
        errors,
        setErrors,
        clearErrors,
        hasError,
        firstError,
        getErrors
    };
}
