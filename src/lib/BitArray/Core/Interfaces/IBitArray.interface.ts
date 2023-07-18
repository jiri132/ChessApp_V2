import type { BinaryDigit } from "../Types/Binary/BinaryDigit.type";
import type { BitArrayStorage } from "../Types/BitArray.BitArrayStorage.type";

export interface IBitArray {
    
    get(index? : number) : BinaryDigit | BitArrayStorage;
    set(value : string[]) : void;
    set(index : number,value : BinaryDigit) : void;
    toggle(index : number) : void;
    clear() : void;
    debugging() : void; 
}