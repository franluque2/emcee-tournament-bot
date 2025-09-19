"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deckToVector = exports.createAllowVector = void 0;
/**
 * Only cards in this vector are considered for acceptance, and cards not in this
 * vector are rejected. If the evaluation function decides to accept an alias and
 * treat it as the same card, it should return a negative value.
 *
 * @param cards      Base card pool
 * @param evaluate   Evaluate the card and decide how many copies are allowed
 * @returns          Card vector where each component is the maximum number of that card allowed
 */
function createAllowVector(cards, evaluate) {
    const vector = new Map();
    for (const [password, card] of cards) {
        const limit = evaluate(card);
        if (limit != 0) {
            vector.set(password, limit);
        }
    }
    return vector;
}
exports.createAllowVector = createAllowVector;
/**
 * @param deck        The standard deck representation to vectorise
 * @param cards       Used to normalise aliases to the same card
 * @param allowVector If provided, used to decide whether to normalise an alias or leave it be
 * @returns           Card vector where each component is the quantity of that card and aliases
 */
function deckToVector(deck, cards, allowVector) {
    const vector = new Map();
    const deckReducer = (password) => {
        const index = (() => {
            if (!allowVector || (allowVector.get(password) || 0) < 0) {
                return cards.get(password)?.alias || password;
            }
            else {
                return password;
            }
        })();
        vector.set(index, 1 + (vector.get(index) || 0));
    };
    deck.main.forEach(deckReducer);
    deck.extra.forEach(deckReducer);
    deck.side.forEach(deckReducer);
    return vector;
}
exports.deckToVector = deckToVector;
//# sourceMappingURL=vector.js.map