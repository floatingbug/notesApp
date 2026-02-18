// stores/task/utils/date.js

/**
 * Normalize a date to midnight (00:00:00) for date-only comparison
 * @param {string|Date} date
 * @returns {Date}
 */
function toDay(date) {
    const d = new Date(date);

    return new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate()
    );
}

/**
 * Check if a given date is today
 * @param {string|Date|null} date - The date to check
 * @returns {boolean}
 */
export function isToday(date) {
    if (!date) {
        return false;
    }

    const day = toDay(date);
    const today = toDay(new Date());

    return day.getTime() === today.getTime();
}

/**
 * Check if a given date is in the past (overdue)
 * Only compares the calendar day, not the time
 * @param {string|Date|null} date - The date to check
 * @returns {boolean}
 */
export function isOverdue(date) {
    if (!date) {
        return false;
    }

    const day = toDay(date);
    const today = toDay(new Date());

    return day < today;
}

/**
 * Check if a given date is in the future (after today)
 * @param {string|Date|null} date - The date to check
 * @returns {boolean}
 */
export function isFuture(date) {
    if (!date) {
        return false;
    }

    const day = toDay(date);
    const today = toDay(new Date());

    return day > today;
}

/**
 * Format a date as YYYY-MM-DD
 * @param {string|Date|null} date
 * @returns {string}
 */
export function formatDate(date) {
    if (!date) {
        return '';
    }

    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
}
