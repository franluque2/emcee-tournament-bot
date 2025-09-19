import { CardIndex } from "./vector";
export interface MainTypeCounts {
    monster: number;
    spell: number;
    trap: number;
}
export interface ExtraTypeCounts {
    fusion: number;
    synchro: number;
    xyz: number;
    link: number;
}
export declare function countMain(deck: Uint32Array, index: CardIndex): MainTypeCounts;
export declare function countExtra(deck: Uint32Array, index: CardIndex): ExtraTypeCounts;
