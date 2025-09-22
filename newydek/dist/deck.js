"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
const ydke_1 = require("ydke");
const classify_1 = require("./classify");
const count_1 = require("./count");
const text_1 = require("./text");
const validate_1 = require("./validate");
const vector_1 = require("./vector");
const ydk_1 = require("./ydk");
class Deck {
    constructor(index, args) {
        this.index = index;
        if ("url" in args) {
            const urls = (0, ydke_1.extractURLs)(args.url);
            if (urls.length !== 1) {
                throw new Error("Could not parse exactly one YDKE URL!");
            }
            this.url = urls[0];
            this.contents = (0, ydke_1.parseURL)(this.url);
        }
        else {
            this.contents = (0, ydk_1.ydkToTypedDeck)(args.ydk);
            this.url = (0, ydke_1.toURL)(this.contents);
        }
    }
    get ydk() {
        return (this.cachedYdk ||= (0, ydk_1.typedDeckToYdk)(this.contents));
    }
    get mainTypeCounts() {
        return (this.cachedMainTypeCounts ||= (0, count_1.countMain)(this.contents.main, this.index));
    }
    get extraTypeCounts() {
        return (this.cachedExtraTypeCounts ||= (0, count_1.countExtra)(this.contents.extra, this.index));
    }
    get sideTypeCounts() {
        return (this.cachedSideTypeCounts ||= (0, count_1.countMain)(this.contents.side, this.index));
    }
    get mainText() {
        return (this.cachedMainText ||= (0, text_1.generateText)(this.contents.main, this.index));
    }
    get extraText() {
        return (this.cachedExtraText ||= (0, text_1.generateText)(this.contents.extra, this.index));
    }
    get sideText() {
        return (this.cachedSideText ||= (0, text_1.generateText)(this.contents.side, this.index));
    }
    get themes() {
        return (this.cachedThemes ||= (0, classify_1.classify)(this.contents, (0, vector_1.deckToVector)(this.contents, this.index), this.index));
    }
    /**
     * Is this a legal list?
     *
     * @param allowVector    Legal card pool and limits for this format
     * @param cards          If provided, normalises any aliased cards in the deck
     * @param options        If provided, overrides default Master Duel size limits
     * @returns
     */
    validate(allowVector, options) {
        const deckVector = (0, vector_1.deckToVector)(this.contents, this.index, allowVector);
        return [...(0, validate_1.checkSizes)(this.contents, options), ...(0, validate_1.checkLimits)(deckVector, allowVector, this.index), ...(0, validate_1.checkPoints)(deckVector, allowVector, this.index)];
    }
}
exports.Deck = Deck;
//# sourceMappingURL=deck.js.map