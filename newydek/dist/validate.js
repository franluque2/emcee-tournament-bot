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
        // Convert password to string for allowVector lookup since CardVector now uses string keys
        const max = allowVector.get(String(password)) || 0;
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
function checkPoints(deckVector, allowVector, index) {
    const errors = [];
    const genesysMax = allowVector.get("genesys");
    if (genesysMax === undefined) {
        return errors; // No genesys limit set, skip point checking
    }
    
    let totalPoints = 0;
    const offendingCards = [];
    
    for (const [password, count] of deckVector) {
        // Convert password to string for consistent key format
        const genesysKey = `genesys${String(password)}`;
        const pointValue = allowVector.get(genesysKey) || 0;
        const cardPoints = pointValue * count;
        totalPoints += cardPoints;
        
        if (pointValue > 0) {
            offendingCards.push({
                password,
                name: index.get(password)?.name || `${password}`,
                pointValue,
                count,
                totalCardPoints: cardPoints
            });
        }
    }
    
    if (totalPoints > genesysMax) {
        errors.push({
            type: "genesysPoints",
            max: genesysMax,
            actual: totalPoints,
            offendingCards: offendingCards
        });
    }
    
    return errors;
}
exports.checkPoints = checkPoints;
//# sourceMappingURL=validate.js.map