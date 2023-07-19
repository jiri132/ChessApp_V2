import type { IBitArray } from "./Interfaces/IBitArray.interface";
import type { BitArrayStorage } from "./Types/BitArray.BitArrayStorage.type";
import type { BinaryGroup } from "./Types/Binary/BinaryGroup.type";
import type { BinaryDigit } from "./Types/Binary/BinaryDigit.type";

class BitArray implements IBitArray {
    // The stored bits
    private readonly storage : BitArrayStorage;
    // Total bits that are left over
    private readonly buffer : number;
    // The amount of bits that are in use without the buffer
    private readonly bitArraySize : number;
    // The total amount of bits there are in use on memory even if they are not specified (this is with the buffer)
    private readonly totalBitArraySize : number;
    

    /*
    *   **Bit array type**
    *   
    *   When you instantiate the class `new BitArray(8)` here it is 8 so it creates an uint8array variable to store it
    *   Everything will automaticly be set the closes way of putting all bits in the least arrays possible with not much buffer space needed
    *   
    *   @examples
    *   ```ts 
    *   const ba = new BitArray(8)   // will be set to uint8Array(1)
    *   const ba2 = new BitArray(16) // will be set to uint8array(2) (with uint32array(1) you would have 16 buffer spaces)
    *   const ba4 = new BitArray(32) // will be set to uint32Array(1) (when you toggle on `bitControl = true` it gives you uint8array(4))
    *   ``` 
    */
    private readonly bitArrayType : string; 
    private readonly bitLength : number;

    /*
    *   **Constructor**
    *   
    *   `size` is the declaration of how many bits it uses
    * 
    *   @example
    *   ```ts
    *   // here the 8 means 8 bits so 1 full byte of storage
    *   const bit_arr = new BitArray(8);
    *   ```
    */
    constructor(size: number, bitControl : boolean = false, value? : string[]){
           
        // Getting the buffer values for each array type
        // To check for the most efficient way of storing values
        const [ba8b , ba32b] : [number, number] = calculateBufferSizes(size);
        
        const ba8l : number = size / 8;
        const ba32l : number = size / 32;
        
        // The most upper value of ba<8,32>l (nitArray<8,32>Lenght) the amounts of bitarray<8,32> needed to function
        const ba8a : number = Math.ceil(ba8l);
        const ba32a : number = Math.ceil(ba32l);

        // Get the best type
        let baType : string = bitControl ? "Uint8Array" : getBestType();

        // Set the storage to the correct bitArray type
        switch (baType) {
            case "Uint8Array":
                this.storage = new Uint8Array(ba8a);
                this.buffer = ba8b; 
                this.bitLength = 8;               
            break;
            case "Uint32Array": 
                this.storage = new Uint32Array(ba32a);
                this.buffer = ba32b;
                this.bitLength = 32;
            break;
            default: 
                this.storage = new Uint8Array(0);
                this.buffer = 0;
                this.bitLength = 0;
            break;
        } 

        // Set all the values needed for the constructor and class to function
        this.bitArraySize = size;
        this.totalBitArraySize = size + this.buffer;
        this.bitArrayType = baType;

        if (value !== undefined) {
            const bitLength = value.join("").length;
            if (bitLength > size) {
                //@ts-ignore
                throw new Error(
                `
                The specified amount of bits you want to set: ${bitLength}bits 
                Full value of setting bits: <${value.join(" ")}>

                Aren't available in the requested bit length of ${size}bits
                `);
            }else {
                this.set(value);
            }

        } 
        function getBestType() : string {
            let ba8 : number = 0;
            let ba32 : number = 0;
            //give points to ba8 because of the buffer size 
            //else give both a point because it has the same buffer size
            if (ba32b > ba8b) {
                ba8++;
            }else if (ba32b === ba8b) {
                ba8++;
                ba32++;
            }
            // give a point to ba32 if it uses less ba and if the ba8 is more then 3
            if (ba32l < ba8l) {
                ba32++;
            }
            
            return ba32 > ba8 ? "Uint32Array" : "Uint8Array";
        }
        function calculateBufferSizes(numBooleanValues: number): [number, number] {
            const uint8Size = Math.ceil(numBooleanValues / 8);
            const uint32Size = Math.ceil(numBooleanValues / 32);

            const uint8Buffer = uint8Size * 8 - numBooleanValues;
            const uint32Buffer = uint32Size * 32 - numBooleanValues;

            return [uint8Buffer, uint32Buffer];
        }
    }
    private checkIndex(index: number): void {
        if (index < 0 || index >= this.bitArraySize) {
          throw new Error('Index out of bounds');
        }
    }
    private getElementAndBitIndex(index: number): [number, number] {
        let elementIndex : number = Math.floor(index/this.bitLength);
        let bitIndex : number =this.bitLength - 1 - (index % this.bitLength);
        
        return [elementIndex, bitIndex];
    }
    private getBinaryNumber() : string {
        let binaryString : string = ""; 

        this.storage.forEach((value: number) => {
            binaryString += value.toString(2).padStart(this.bitLength, "0");
        });
        
        return binaryString;
    }  
    private setBinaryNumber(binaryString : string[]) : void {
        binaryString.forEach((bitAdresses : string,i : number) => {
            const converted = parseInt(bitAdresses, 2);
            this.storage[i] = converted;
        });
    }  

    get(index?: number): BinaryDigit | BitArrayStorage {
        if (index === undefined) {
            return this.storage;
        }else {
            this.checkIndex(index);
            const [elementIndex, bitIndex] = this.getElementAndBitIndex(index);
            const element = this.storage[elementIndex];
            return (element & (1 << bitIndex)) !== 0 ? "1" : "0";
        }
    };
    
    set(...args: [value: string[]] | [index: number, value: BinaryDigit]): void {
        if (args.length === 1) {
            const [value] : [string[]] = args;

            this.setBinaryNumber(value);

        } else if (args.length === 2) {
            const [index, value] = args;
            this.checkIndex(index);

            let binaryAdress : string = this.getBinaryNumber();
            let _ba : string[] = binaryAdress.split("").reverse();
            
            _ba[index] = value;
            binaryAdress = _ba.reverse().join("");
            if (this.bitLength === 8) {_ba = binaryAdress.split(/(.{8})/).filter(Boolean);}
            else if (this.bitLength === 32) {_ba = binaryAdress.split(/(.{32})/).filter(Boolean);}
            
            this.setBinaryNumber(_ba);

        } else {
            throw new Error("Invalid number of arguments");
        }
    }
    toggle(index: number): void {
        this.checkIndex(index);
        // get the variables
        let binaryAdress : string = this.getBinaryNumber();
        let _ba : string[] = binaryAdress.split("").reverse();
        
        //replace and combine
        _ba[index] = (_ba[index] === "0") ? "1" : "0";
        binaryAdress = _ba.reverse().join("");

        //setting _ba to a binary value
        if (this.bitLength === 8) {_ba = binaryAdress.split(/(.{8})/).filter(Boolean);}
        else if (this.bitLength === 32) {_ba = binaryAdress.split(/(.{32})/).filter(Boolean);}

        this.setBinaryNumber(_ba);
    }
    clear(): void {
        // remove the whole binary string
        this.storage.forEach((value : number) => {
            value = 0;
        });
    }
    debugging(): void {
        console.log("total bit length   : " + this.totalBitArraySize);
        console.log("total usage length : " + this.bitArraySize);
        console.log("total buffer size  : " + this.buffer);
        console.log("array type         : " + this.bitArrayType);
        console.log("bit storage        : " + this.storage);
    }


}

export default BitArray;