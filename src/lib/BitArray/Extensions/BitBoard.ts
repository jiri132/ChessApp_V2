import type { BinaryGroup } from "../Core/Types/Binary/BinaryGroup.type";
import BitArray from "../Core/BitArray";
import type { BitArrayStorage } from "../Core/Types/BitArray.BitArrayStorage.type";

function parseBinaryInput(input: string | number): number {
    const binaryString = typeof input === "string" ? input : input.toString(2).padStart(8, "0");
    console.log(input)
    let decimalValue = 0;
  
    for (let i = binaryString.length - 1; i >= 0; i--) {
      if (binaryString[i] === "1") {
        decimalValue += 2 ** (binaryString.length - 1 - i);
      }
    }
  
    return decimalValue;
  }

class Bitboard {
    public readonly size : number;
    public readonly data : BitArray;

    constructor(dataSize : number,data: BinaryGroup<8>[]) {
        this.data = new BitArray(dataSize,true,data);
        this.size = dataSize;
    }

    static AND(bitboard1: Bitboard, bitboard2: Bitboard): Bitboard {
        const combinedBitboard: BinaryGroup<8>[] = [];
    
        for (let i = 0; i < bitboard1.data.get().length; i++) {
          const decimalValue : number = parseBinaryInput(bitboard1.data.get()[i]) & parseBinaryInput(bitboard2.data.get()[i]);
          const combinedRow : string = decimalValue.toString(2).padStart(8, "0");
          //@ts-ignore
          combinedBitboard.push(combinedRow);
        }
    
        return new Bitboard(bitboard1.size,combinedBitboard);
      }
    
      static OR(bitboard1: Bitboard, bitboard2: Bitboard): Bitboard {
        const combinedBitboard: BinaryGroup<8>[] = [];
    
        for (let i = 0; i < bitboard1.data.get().length; i++) {
          const decimalValue = parseBinaryInput(bitboard1.data.get()[i]) | parseBinaryInput(bitboard2.data.get()[i]);
          const combinedRow = decimalValue.toString(2).padStart(8, "0");

          //@ts-ignore
          combinedBitboard.push(combinedRow);
        }
    
        return new Bitboard(bitboard1.size,combinedBitboard);
      }
    
      static XOR(bitboard1: Bitboard, bitboard2: Bitboard): Bitboard {
        const combinedBitboard: BinaryGroup<8>[] = [];

        for (let i = 0; i < bitboard1.data.get().length; i++) {
          const decimalValue = parseBinaryInput(bitboard1.data.get()[i]) ^ parseBinaryInput(bitboard2.data.get()[i]);
          const combinedRow = decimalValue.toString(2).padStart(8, "0");
          //@ts-ignore
          combinedBitboard.push(combinedRow);
        }
    
        return new Bitboard(bitboard1.size,combinedBitboard);
      }

      
}

export default Bitboard