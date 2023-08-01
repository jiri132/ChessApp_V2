
class Random {
    static getRandomInteger(min : number, max : number) : number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    static getRandomFloat(min : number, max : number) : number {
        return Math.random() * (max - min) + min;
    }
    
    static getRandomDouble(min : number, max : number) : number {
        return Math.random() * (max - min) + min;
    }
    
    static getRandomBoolean() : boolean {
        return Math.random() < 0.5;
    }
    
    static getRandomElementFromArray(arr : any[]) : any {
        const index = Math.floor(Math.random() * arr.length);
        return arr[index];
    }
    
    static getRandomColor() : string {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}


export default Random;