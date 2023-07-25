import type ChessBoard from "$lib/ChessBoard/Core/Board";
import type { move } from "$lib/ChessBoard/Core/Moves/move.type";
import type { playedMoves } from "$lib/ChessBoard/Core/Moves/playedMoves.type";
import type { IPiece } from "$lib/ChessBoard/Core/Piece/IPiece";

class Chess_API_Visuals {
    private readonly API : ChessBoard;
    private readonly visual_container : HTMLElement;

    constructor(board : ChessBoard) {
        if (!document.getElementById("ChessBoard")) {
            throw new Error("Create a div with the ID name 'ChessBoard'")
        }

        this.API = board;
        this.visual_container = document.getElementById("ChessBoard") as HTMLElement;

        this.RenderAllSquares();
    }

    public highlightPossibleMoves(possibleMoves : move[]) : void {
        // give the color to the squares
        possibleMoves.forEach((move : move) => {
             const webElement : HTMLElement | null = document.getElementById(move);
             
             if (!webElement) {return;}

             webElement.style.backgroundColor = '#FF00007F';

             console.log(webElement.style.backgroundColor, move);
        });
    }
    
    public removeHighlightsPossibleMoves(possibleMoves : move[]) : void {
        // give the color to the squares
        possibleMoves.forEach((move : move) => {
             const webElement : HTMLElement | null = document.getElementById(move);
             
             if (!webElement) {return;}

             webElement.style.backgroundColor = '#FF000000';

             console.log(webElement.style.backgroundColor, move);
        });
    }


    public RenderPlayedMove(playedMove : playedMoves) : void {
        const position : move = playedMove.substring(0, 2) as move;
        const to : move = playedMove.substring(2, 4) as move;

        this.RenderSingleSquare(position);
        this.RenderSingleSquare(to);
    }



    private RenderSingleSquare(square : move) : void {
        const piece : IPiece | null  = this.API.getPieceAtPosition(square);
        const webElement = document.getElementById(square);

        if (!webElement)  {return;}
                
        let url = "";
        if (piece) { url = `/src/lib/assets/${piece.pieceColor+piece.pieceData}.png` }

        webElement.style.backgroundImage = `url(${url})`;
    }

    
    private RenderAllSquares() : void {
        // Get 1 array
        this.API.game.forEach((pieceArray : IPiece[], file) => {
            // Get 1 element that array
            pieceArray.forEach((piece : IPiece, rank) => {
                const square : move =  String.fromCharCode(65 + rank) + (8-file).toString() as move;
                this.RenderSingleSquare(square);
            })
        })
    }
}

export default Chess_API_Visuals;