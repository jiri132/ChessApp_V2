<script lang="ts">
    import { onMount } from "svelte";
    import ChessBoard from "../Core/Board";
    import type { move } from "../Core/Moves/move.type";
    import type { playedMoves } from "../Core/Moves/playedMoves.type";
    import type { IPiece } from "../Core/Piece/IPiece";
    import { colorTable } from "../Core/Piece/enum/Color.table.enum";
    import Chess_API_Visuals from "../API/Visuals/Board.API.Visuals";
    import { playStyles } from "../Core/PlayStyles/Board.PlayStyles.enum";

    let Board : ChessBoard;
    
    let movingPiece : IPiece;
    let possibleMoves : move[] = [];
    let playstyle : playStyles = playStyles.Human_vs_MyBot;


    function SelectedOwnPiece(piece : IPiece) : boolean {
        if ((piece.pieceColor === colorTable.white && Board.isWhiteToMove) || 
            (piece.pieceColor === colorTable.black && !Board.isWhiteToMove)) {
            // Remove coloring
            Chess_API_Visuals.removeHighlightsPossibleMoves(possibleMoves);

            // Assign pieces and moves
            movingPiece = piece; 
            possibleMoves = piece.legalMoves(Board);

            // Highlight possible moves again
            Chess_API_Visuals.highlightPossibleMoves(possibleMoves);

            return true;
        }
        return false;
    }

    function movePiece(square : move) {
        if (!possibleMoves.includes(square)) {return;}

        // Move the piece and change turn
        const PieceSquare : move = movingPiece.location;
        const playingMove : playedMoves = (PieceSquare+square) as playedMoves;

        // Play the move
        Board.playMove(playingMove);

        // Render Squares 
        Chess_API_Visuals.RenderPlayedMove(playingMove, Board);
    }


    function onClickLogic(e : any) {
        //@ts-ignore
        const id : move = e.target.id as move;
        const piece : IPiece | null = Board.getPieceAtPosition(id);
        
        if (piece) {
            // Set Piece and legalMoves
            if (!SelectedOwnPiece(piece)) {
                // Play the  move if it is possible and otherwise remove selection and highlights
                movePiece(id);

                reset();

                return;
            }

            movingPiece = piece;
            possibleMoves = piece.legalMoves(Board);

            Chess_API_Visuals.highlightPossibleMoves(possibleMoves);
        }else {
            movePiece(id);
            
            reset();
        }
    }
    function reset() {
        Chess_API_Visuals.removeHighlightsPossibleMoves(possibleMoves);

        movingPiece = null!;
        possibleMoves = [];
    }
    function setPlayStyle(newPlayStyle : playStyles) {
        playstyle = newPlayStyle;
        Board.startGame(playstyle);
    }
    
    // When the class gets instantiated
    $: {
        Board = new ChessBoard();
    }

    // When the class is done loading
    onMount(() => {
        Board.startGame(playstyle);
        Chess_API_Visuals.RenderAllSquares(Board);
    }) 
</script>


<div class="visualContainer">
    <div class="infoStack">
        <button on:click={(e) => {setPlayStyle(playStyles.Human_vs_MyBot);}}>Human vs MyBot</button>
        <button on:click={(e) => {setPlayStyle(playStyles.MyBot_vs_MyBot);}}>MyBot vs MyBot</button>
        <button on:click={(e) => {setPlayStyle(playStyles.MyBot_vs_DevBot);}}>MyBot vs DevBot</button>
    </div>
    <div class="ChessBoard">
        {#each Board.game as row, file}
                {#each Board.game[file] as piece, rank}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div id={String.fromCharCode(65 + rank) + (8-file).toString()} class="card"
                        on:click={(e) => {
                            onClickLogic(e);
                        }}
                        >
                    </div>
                {/each}
        {/each}
    </div>
    <div class="infoStack">
        <div style="color: black;">Played Moves</div>
        <div id="moves" class="moves">

        </div>
    </div>
</div>
<style lang="scss">
    
    .visualContainer {
        background-color: white;
        display: flex;
        flex-direction: row;
        column-gap: 10px;
        padding: 5px;
        border-radius: 10px;
        width: 100%;
        max-width: 900px;
        .infoStack {
            width: 100%;
            border-radius: 10px;
            background-color: rgb(197, 197, 197);
            display: flex;
            flex-direction: column;
            row-gap: 10px;
            max-height: 480px;
            padding: 5px;
            text-align: center;
        }
        
        .moves {
            color: black;
            overflow-y: scroll;
            display: grid;
            grid-template-rows: repeat(2, 0fr);
            grid-template-columns: repeat(3,1fr);
            justify-items: center;
        }
        .moves::-webkit-scrollbar {
            width: 0px;
        }

        .ChessBoard {
            display: grid;
            grid-template-rows: repeat(8, 0fr);
            grid-template-columns: repeat(8, 0fr);
            max-width: calc(60px * 8);
            max-height: calc(60px * 8);
            background-image: url("/src/lib/assets/board.png");
            background-size: calc(60px * 8);
            background-repeat: no-repeat;

            .card {
                display: flex;
                justify-content: center;
                align-items: center;
                color: darkblue;
                background-color: rgb(173, 216, 230,0);
                width: 60px;
                height: 60px;
            }
	    }
    }
    

    
</style>