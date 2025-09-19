import { TypedDeck } from "ydke";
export interface ICard {
    name: string;
    type: number;
    setcode: number;
    alias?: number;
    limitTCG: number;
    limitOCG: number;
    isPrerelease: boolean;
}
export declare type CardIndex = Map<number, ICard>;
export declare type CardVector = Map<number, number>;
/**
 * Only cards in this vector are considered for acceptance, and cards not in this
 * vector are rejected. If the evaluation function decides to accept an alias and
 * treat it as the same card, it should return a negative value.
 *
 * @param cards      Base card pool
 * @param evaluate   Evaluate the card and decide how many copies are allowed
 * @returns          Card vector where each component is the maximum number of that card allowed
 */
export declare function createAllowVector(cards: CardIndex, evaluate: (card: ICard) => number): CardVector;
/**
 * @param deck        The standard deck representation to vectorise
 * @param cards       Used to normalise aliases to the same card
 * @param allowVector If provided, used to decide whether to normalise an alias or leave it be
 * @returns           Card vector where each component is the quantity of that card and aliases
 */
export declare function deckToVector(deck: TypedDeck, cards: CardIndex, allowVector?: CardVector): CardVector;
