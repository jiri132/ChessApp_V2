import type Board from "../Board/Board";
import type Tile from "../Board/Tile/Tile";
import type ChessBoard from "../ChessBoard";
import type { IPiece } from "../Interfaces/Board/Pieces/IPieces";
import type Move from "../Move/Move";
import type { BoardLocation } from "../Types/Location/Location.type";
import BoardHelper from "./BoardHelper";

class BoardVisualHelper {

    static HighlightPossibleMoves(possibleMoves : Move[]) : void {
        possibleMoves.forEach((move : Move) => {
            //  We use the move.to location because all the locations from that piece that can be made will be stored inside of this
             const webElement : HTMLElement | null = document.getElementById(move.to);
             
             if (!webElement) {return;}

             webElement.style.backgroundColor = '#FF00007F';
        });
    }
    

    static RemoveHighlightPossibleMoves(possibleMoves : Move[]) : void {
        possibleMoves.forEach((move : Move) => {
            //  We use the move.to location because all the locations from that piece that can be made will be stored inside of this
             const webElement : HTMLElement | null = document.getElementById(move.to);
             
             if (!webElement) {return;}

             webElement.style.backgroundColor = '#FF000000';
        });
    }
   

    
    static RenderAllTiles(API : Board) : void {
        API.tiles.forEach((tile : Tile) => {
            this.RenderSingleTile(API, tile.name);
        })
    }
    

    static RenderPlayedMove(API : Board, move : Move) : void {
        this.RenderSingleTile(API,move.from);
        this.RenderSingleTile(API, move.to);
    }

    static RenderSingleTile(API : Board, square : BoardLocation) : void {
        const index = BoardHelper.boardLocationToIndex(square)
        const piece : IPiece | undefined  = API.tiles[index].piece
        const webElement = document.getElementById(square);
        
        if (!webElement)  {return;}
                        
        let url = "";
        if (piece) { url = `/src/lib/assets/${piece?.data}.png` }

        webElement.style.backgroundImage = `url(${url})`;
    }
    

    /*  New static function to render the container of an existing game  */
    static RenderFullPlayedMovesContainer(API : ChessBoard) : void {
        throw new Error("Function not implemented");
    }


    static RenderSinglePlayedMoveInContainer(API : Board) : void {
        const playedMoves : Move[] = API.playedMoves;
        const webElement = document.getElementById("movesContainer");

        if (!webElement) {return;}

        const newElement = document.createElement('div')

        if (playedMoves.length % 2 === 1) {
            const numElement = document.createElement('div');

            numElement.innerText = (playedMoves.length / 2 + 0.5).toString();
            webElement.appendChild(numElement);
        }

        newElement.innerHTML = playedMoves[playedMoves.length-1].algebraic_notation;
        webElement.appendChild(newElement);
    }

    static RenderEmptyPlayedMovesContainer() : void {
        const webElement  = document.getElementById("movesContainer");

        if (!webElement) {return;}

        webElement.innerHTML = "";
    }
}

export default BoardVisualHelper;