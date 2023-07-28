import type ChessBoard from "../ChessBoard";
import type Move from "../Move/Move";
import type { BoardLocation } from "../Types/Location/Location.type";

class BoardVisualHelper {

    static HighlightPossibleMoves(possibleMoves : Move[]) : void {
        throw new Error("Function not implemented");
    }
    // static highlightPossibleMoves(possibleMoves : move[]) : void {
    //     // give the color to the squares
    //     possibleMoves.forEach((move : move) => {
    //          const webElement : HTMLElement | null = document.getElementById(move);
             
    //          if (!webElement) {return;}

    //          webElement.style.backgroundColor = '#FF00007F';
    //     });
    // }

    static RemoveHighlightPossibleMoves(possibleMoves : Move[]) : void {
        throw new Error("Function not implemented");
    }
    // static removeHighlightsPossibleMoves(possibleMoves : move[]) : void {
    //     // give the color to the squares
    //     possibleMoves.forEach((move : move) => {
    //          const webElement : HTMLElement | null = document.getElementById(move);
             
    //          if (!webElement) {return;}

    //          webElement.style.backgroundColor = '#FF000000';
    //     });
    // }


    
    static RenderAllTiles(API : ChessBoard) : void {
        throw new Error("Function not implemented");
    }
    // static RenderAllSquares(API : ChessBoard) : void {
    //     // Get 1 array
    //     API.game.forEach((pieceArray : IPiece[], file : number) => {
    //         // Get 1 element that array
    //         pieceArray.forEach((piece : IPiece, rank) => {
    //             const square : move =  String.fromCharCode(65 + rank) + (8-file).toString() as move;
    //             this.RenderSingleSquare(square, API);
    //         })
    //     })
    // }

    /*  This feature is probably going to get removed  */
    static RenderPlayedMove(API : ChessBoard, move : Move) : void {
        throw new Error("Function not implemented");
    }
    // static RenderPlayedMove(playedMove : playedMoves, API:ChessBoard) : void {
    //     const position : move = playedMove.substring(0, 2) as move;
    //     const to : move = playedMove.substring(2, 4) as move;

    //     this.RenderSingleSquare(position, API);
    //     this.RenderSingleSquare(to, API);
    // }

    static RenderSingleTile(API : ChessBoard, square : BoardLocation) : void {
        throw new Error("Function not implemented");
    }
    // static RenderSingleSquare(square : move, API : ChessBoard) : void {
    //     const piece : IPiece | null  = API.getPieceAtPosition(square);
    //     const webElement = document.getElementById(square);

    //     if (!webElement)  {return;}
                    
    //     let url = "";
    //     if (piece) { url = `/src/lib/assets/${piece.pieceColor+piece.pieceData}.png` }

    //     webElement.style.backgroundImage = `url(${url})`;
    // }

    /*  New static function to render the container of an existing game  */
    static RenderFullPlayedMovesContainer(API : ChessBoard) : void {
        throw new Error("Function not implemented");
    }


    static RenderSinglePlayedMoveInContainer(API : ChessBoard) : void {
        throw new Error("Function not implemented")
    }
    // static RenderPlayedMoves(API : ChessBoard) : void {
    //     const playedMoves = API.playedMoves;
    //     const webElement = document.getElementById("moves");

    //     if (!webElement) {return;}

    //     const newElement = document.createElement('div')

    //     if (playedMoves.length % 2 === 1) {
    //         const numElement = document.createElement('div');

    //         numElement.innerText = (playedMoves.length / 2 + 0.5).toString();
    //         webElement.appendChild(numElement);
    //     }

    //     newElement.innerHTML = playedMoves[playedMoves.length-1];
    //     webElement.appendChild(newElement);
    // }

    static RenderEmptyPlayedMovesContainer() : void {
        throw new Error("Function not implemented");
    }
    // static RenderNewPLayedMovesContainer() : void{
    //     const webElement  = document.getElementById("moves");

    //     if (!webElement) {return;}

    //     webElement.innerHTML = "";
    // }
}

export default BoardVisualHelper;