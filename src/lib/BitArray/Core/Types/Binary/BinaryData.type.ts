import type { BinaryGroup } from "./BinaryGroup.type"

// export type BinaryData<Size extends number, Digits extends BinaryGroup<8>[] = [], Data extends string = ""> = 
//     Size extends Digits['length']
//     ?
//     Data 
//     :
//     BinaryData<Size,[...Digits], `${Data}${BinaryGroup<8>}`>

// export type bit1 = BinaryGroup<1>;
// export type bit2 = BinaryGroup<2>;
// export type bit3 = BinaryGroup<3>;
// export type bit4 = BinaryGroup<4>;
// export type bit8 = BinaryGroup<8>;
// export type bit12 = BinaryGroup<12>;
// export type bit16 = BinaryGroup<16>;

// export type bit24 = bit8[3];
// export type bit32 = bit8[4];
