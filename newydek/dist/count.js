"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countExtra = exports.countMain = void 0;
function typeReducer(typeBit, index) {
    // If the card has the type bit set, increment the total
    return (total, password) => (typeBit & (index.get(password)?.type || 0) ? total + 1 : total);
}
function countMain(deck, index) {
    return {
        monster: deck.reduce(typeReducer(1, index), 0),
        spell: deck.reduce(typeReducer(2, index), 0),
        trap: deck.reduce(typeReducer(4, index), 0)
    };
}
exports.countMain = countMain;
function countExtra(deck, index) {
    return {
        fusion: deck.reduce(typeReducer(64, index), 0),
        synchro: deck.reduce(typeReducer(8192, index), 0),
        xyz: deck.reduce(typeReducer(8388608, index), 0),
        link: deck.reduce(typeReducer(67108864, index), 0)
    };
}
exports.countExtra = countExtra;
//# sourceMappingURL=count.js.map