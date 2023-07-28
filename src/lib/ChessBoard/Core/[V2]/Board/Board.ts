import type { IBoard } from "../Interfaces/Board/IBoard";
import type Move from "../Move/Move";
import type Tile from "./Tile/Tile";

class Board implements IBoard {
    public readonly tiles: Tile[] = [];
    public readonly playedMoves: Move[] = new Proxy<Move[]>([], {
        set: (target: Move[], property : string, value: number) => {
            if (property === "length") {
                if (value === 0) {return Reflect.set(target, property, 0);}
                // Handle length property change (e.g., push)
                // You can also add further checks if needed
        
                // Call the RenderPlayedMove function passing the value and the current ChessBoard API
                // TODO: Change it from Depricated visual API to BoardVisualHelper.
                //Chess_API_Visuals.RenderPlayedMoves(this);
                //Chess_API_Visuals.RenderPlayedMove(target[value-1], this);
            }
            

            return Reflect.set(target, property, value);
        },
    }) as Move[]; // Cast the proxy to the desired type (playedMoves[]);
    
    constructor() {

    }    
}

export default Board;