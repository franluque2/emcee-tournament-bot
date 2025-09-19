"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLimits = exports.checkSizes = void 0;
function checkSize(contents, subdeck, sizes) {
    const errors = [];
    if (contents[subdeck].length < sizes[subdeck].min) {
        errors.push({
            type: "size",
            target: subdeck,
            min: sizes[subdeck].min,
            max: sizes[subdeck].max,
            actual: contents[subdeck].length
        });
    }
    if (contents[subdeck].length > sizes[subdeck].max) {
        errors.push({
            type: "size",
            target: subdeck,
            max: sizes[subdeck].max,
            actual: contents[subdeck].length
        });
    }
    return errors;
}
function checkSizes(deck, options) {
    const sizes = {
        main: { min: 40, max: 60 },
        extra: { min: 0, max: 15 },
        side: { min: 0, max: 15 },
        ...options
    };
    return [...checkSize(deck, "main", sizes), ...checkSize(deck, "extra", sizes), ...checkSize(deck, "side", sizes)];
}
exports.checkSizes = checkSizes;
function checkLimits(deckVector, allowVector, index) {
    const errors = [];
    for (const [password, count] of deckVector) {
        // We're actually computing the vector difference here, but we just don't particularly
        // care about the resulting difference vector per se
        const max = allowVector.get(password) || 0;
        if (count > max) {
            errors.push({
                type: "limit",
                target: password,
                name: index.get(password)?.name || `${password}`,
                max,
                actual: count
            });
        }
    }
    return errors;
}
exports.checkLimits = checkLimits;
//# sourceMappingURL=validate.js.map