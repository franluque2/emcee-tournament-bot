"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedDeckToYdk = exports.ydkToTypedDeck = exports.YDKParseError = void 0;
class YDKParseError extends Error {
    constructor(message) {
        super(`Error in YDK format: ${message}.`);
        this.message = message;
    }
}
exports.YDKParseError = YDKParseError;
function ydkIndexOf(deck, heading) {
    const index = deck.indexOf(heading);
    if (index < 0) {
        throw new YDKParseError(`missing section ${heading}`);
    }
    return index;
}
function parseYdkSection(deck, begin, end) {
    const numbers = [];
    // begin is the line with the heading, so we start at the next one
    for (let i = begin + 1, line = deck[i]; i < end; line = deck[++i]) {
        if (!line) {
            continue; // Skip blank lines
        }
        const decimalInteger = parseInt(line, 10);
        if (isNaN(decimalInteger)) {
            throw new YDKParseError(`unexpected value on line ${i + 1}; ${line}`);
        }
        numbers.push(decimalInteger);
    }
    return Uint32Array.from(numbers);
}
function ydkToTypedDeck(ydk) {
    const deck = ydk.split("\n").map(s => s.trim());
    const mainIndex = ydkIndexOf(deck, "#main");
    const extraIndex = ydkIndexOf(deck, "#extra");
    const sideIndex = ydkIndexOf(deck, "!side");
    if (!(mainIndex < extraIndex && extraIndex < sideIndex)) {
        throw new YDKParseError("invalid section ordering; expected #main, #extra, !side");
    }
    return {
        main: parseYdkSection(deck, mainIndex, extraIndex),
        extra: parseYdkSection(deck, extraIndex, sideIndex),
        side: parseYdkSection(deck, sideIndex, deck.length)
    };
}
exports.ydkToTypedDeck = ydkToTypedDeck;
function typedDeckToYdk(deck) {
    let out = "#created by YDeck\n#main\n";
    out += [...deck.main].map(code => code.toString()).join("\n");
    // should only add the newline if there is a main deck
    if (!out.endsWith("\n")) {
        out += "\n";
    }
    out += "#extra\n";
    out += [...deck.extra].map(code => code.toString()).join("\n");
    // should only add the newline if there is an extra deck
    if (!out.endsWith("\n")) {
        out += "\n";
    }
    out += "!side\n";
    out += [...deck.side].map(code => code.toString()).join("\n");
    // should only add the newline if there is a side deck
    if (!out.endsWith("\n")) {
        out += "\n";
    }
    return out;
}
exports.typedDeckToYdk = typedDeckToYdk;
//# sourceMappingURL=ydk.js.map