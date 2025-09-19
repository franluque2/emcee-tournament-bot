import { TypedDeck } from "ydke";
import { ExtraTypeCounts, MainTypeCounts } from "./count";
import { DeckError, DeckSizes } from "./validate";
import { CardIndex, CardVector } from "./vector";
export declare type YDKE = {
    url: string;
};
export declare type YDK = {
    ydk: string;
};
export declare class Deck {
    private readonly index;
    readonly url: string;
    readonly contents: TypedDeck;
    constructor(index: CardIndex, args: YDKE | YDK);
    private cachedYdk?;
    get ydk(): string;
    private cachedMainTypeCounts?;
    get mainTypeCounts(): MainTypeCounts;
    private cachedExtraTypeCounts?;
    get extraTypeCounts(): ExtraTypeCounts;
    private cachedSideTypeCounts?;
    get sideTypeCounts(): MainTypeCounts;
    private cachedMainText?;
    get mainText(): string;
    private cachedExtraText?;
    get extraText(): string;
    private cachedSideText?;
    get sideText(): string;
    private cachedThemes?;
    get themes(): string[];
    /**
     * Is this a legal list?
     *
     * @param allowVector    Legal card pool and limits for this format
     * @param cards          If provided, normalises any aliased cards in the deck
     * @param options        If provided, overrides default Master Duel size limits
     * @returns
     */
    validate(allowVector: CardVector, options?: Partial<DeckSizes>): DeckError[];
}
