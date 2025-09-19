import { TypedDeck } from "ydke";
export declare class YDKParseError extends Error {
    readonly message: string;
    constructor(message: string);
}
export declare function ydkToTypedDeck(ydk: string): TypedDeck;
export declare function typedDeckToYdk(deck: TypedDeck): string;
