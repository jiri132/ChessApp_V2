import type { BinaryDigit } from "./BinaryDigit.type";

export type BinaryGroup<Size extends number, Digits extends 0[] = [], Data extends string = ""> = 
    Size extends Digits['length'] 
    ? 
    Data
    : 
    BinaryGroup<Size, [0, ...Digits], `${Data}${BinaryDigit}`>;
    
// export type BinaryGroup<Size extends number, Digits extends 0[] = [], Data extends string = ""> =
// Digits["length"] extends Size
//   ? Data
//   : Extract<Digits["length"], Size> extends Size
//     ? `${Data}${BinaryDigit}`
//     : BinaryGroup<Size, [0, ...Digits], Data>;