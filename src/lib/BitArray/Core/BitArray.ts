import type { IBitArray } from "./Interfaces/IBitArray.interface";
import type { BitArrayStorage } from "./Types/BitArray.BitArrayStorage.type";

class BitArray implements IBitArray {
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
    constructor(size: number, bitControl : boolean = false) {
        // Getting the buffer values for each array type
        // To check for the most efficient way of storing values
        const [ba8b , ba32b] : [number, number] = calculateBufferSizes(size);
        
        const ba8l : number = size / 8;
        const ba32l : number = size / 32;
       
        console.log(ba8b , ba32b)
        
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
            break;
            case "Uint32Array": 
                this.storage = new Uint32Array(ba32a);
                this.buffer = ba32b;
            break;
            default: 
                this.storage = new Uint8Array();
                this.buffer = 0;
            break;
        } 

        // Set all the values needed for the constructor and class to function
        this.bitArraySize = size;
        this.totalBitArraySize = size + this.buffer;
        this.bitArrayType = baType;

        console.log("total bit length   : " + this.totalBitArraySize);
        console.log("total usage length : " + this.bitArraySize);
        console.log("total buffer size  : " + this.buffer);
        console.log("array type         : " + this.bitArrayType);
        console.log("bit storage        : " + this.storage);

        // Function to evaluate the best choice of uint type
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
}

export default BitArray;