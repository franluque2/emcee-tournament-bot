"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateText = void 0;
function generateText(deck, data) {
    const names = [...deck].map(code => data.get(code)?.name || code.toString());
    const counts = names.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});
    return Object.keys(counts)
        .map(name => `${counts[name]} ${name}`)
        .join("\n");
}
exports.generateText = generateText;
//# sourceMappingURL=text.js.map