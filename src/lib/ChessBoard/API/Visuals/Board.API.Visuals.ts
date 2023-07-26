import type ChessBoard from "$lib/ChessBoard/Core/Board";
import type { move } from "$lib/ChessBoard/Core/Moves/move.type";
import type { playedMoves } from "$lib/ChessBoard/Core/Moves/playedMoves.type";
import type { IPiece } from "$lib/ChessBoard/Core/Piece/IPiece";

class Chess_API_Visuals {
    static highlightPossibleMoves(possibleMoves : move[]) : void {
        // give the color to the squares
        possibleMoves.forEach((move : move) => {
             const webElement : HTMLElement | null = document.getElementById(move);
             
             if (!webElement) {return;}

             webElement.style.backgroundColor = '#FF00007F';
        });
    }

    static removeHighlightsPossibleMoves(possibleMoves : move[]) : void {
        // give the color to the squares
        possibleMoves.forEach((move : move) => {
             const webElement : HTMLElement | null = document.getElementById(move);
             
             if (!webElement) {return;}

             webElement.style.backgroundColor = '#FF000000';
        });
    }


    

    static RenderAllSquares(API : ChessBoard) : void {
        // Get 1 array
        API.game.forEach((pieceArray : IPiece[], file : number) => {
            // Get 1 element that array
            pieceArray.forEach((piece : IPiece, rank) => {
                const square : move =  String.fromCharCode(65 + rank) + (8-file).toString() as move;
                this.RenderSingleSquare(square, API);
            })
        })
    }

    

    static RenderPlayedMove(playedMove : playedMoves, API:ChessBoard) : void {
        const position : move = playedMove.substring(0, 2) as move;
        const to : move = playedMove.substring(2, 4) as move;

        this.RenderSingleSquare(position, API);
        this.RenderSingleSquare(to, API);
    }

    
    static RenderSingleSquare(square : move, API : ChessBoard) : void {
        const piece : IPiece | null  = API.getPieceAtPosition(square);
        const webElement = document.getElementById(square);

        if (!webElement)  {return;}
                    
        let url = "";
        if (piece) { url = `/src/lib/assets/${piece.pieceColor+piece.pieceData}.png` }

        webElement.style.backgroundImage = `url(${url})`;
    }

    static RenderPlayedMoves(API : ChessBoard) : void {
        const playedMoves = API.playedMoves;
        const webElement = document.getElementById("moves");

        if (!webElement) {return;}

        const newElement = document.createElement('div')

        if (playedMoves.length % 2 === 1) {
            const numElement = document.createElement('div');

            numElement.innerText = (playedMoves.length / 2 + 0.5).toString();
            webElement.appendChild(numElement);
        }

        newElement.innerHTML = playedMoves[playedMoves.length-1];
        webElement.appendChild(newElement);
    }
    
    static RenderNewPLayedMovesContainer() : void{
        const webElement  = document.getElementById("moves");

        if (!webElement) {return;}

        webElement.innerHTML = "";
    }
    
    
}

export default Chess_API_Visuals;