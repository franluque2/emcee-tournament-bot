import { TypedDeck } from "ydke";
import { CardIndex, CardVector } from "./vector";
export declare type DeckSizes = {
    [subdeck in keyof TypedDeck]: {
        min: number;
        max: number;
    };
};
interface BaseError {
    max: number;
    actual: number;
}
interface SizeError extends BaseError {
    type: "size";
    target: keyof TypedDeck;
    min?: number;
}
interface LimitError extends BaseError {
    type: "limit";
    target: number;
    name: string;
}
export declare type DeckError = SizeError | LimitError;
export declare function checkSizes(deck: TypedDeck, options?: Partial<DeckSizes>): SizeError[];
export declare function checkLimits(deckVector: CardVector, allowVector: CardVector, index: CardIndex): LimitError[];
export {};
