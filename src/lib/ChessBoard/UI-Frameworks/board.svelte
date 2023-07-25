<script lang="ts">
    import { onMount } from "svelte";
    import ChessBoard from "../Core/Board";
    import type { move } from "../Core/Moves/move.type";
    import type { playedMoves } from "../Core/Moves/playedMoves.type";
    import type { IPiece } from "../Core/Piece/IPiece";
    import { colorTable } from "../Core/Piece/enum/Color.table.enum";
    import { draw } from "svelte/transition";

    const Board = new ChessBoard();
    
    let movingPiece : IPiece;
    let possibleMoves : move[] = [];

    function SelectedOwnPiece(piece : IPiece) : boolean {
        if ((piece.pieceColor === colorTable.white && Board.isWhiteToMove) || 
            (piece.pieceColor === colorTable.black && !Board.isWhiteToMove)) {
            // Remove coloring
            //TODO: Update with board_API_visuals
                //removeHighlightsPossibleMoves();

            // Assign pieces and moves
            movingPiece = piece; 
            possibleMoves = piece.legalMoves(Board);

            // Highlight possible moves again
            //TODO: Update with board_API_visuals
                //highlightPossibleMoves();

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
        // TODO: update with new board_API_visuals
            //DrawPlayedMove(playingMove);
    }

    function onClickLogic(e : PointerEvent) {
        //@ts-ignore
        const id : move = e.target.id;
        const piece : IPiece | null = Board.getPieceAtPosition(id);
        
        if (piece) {
            // Set Piece and legalMoves
            if (!SelectedOwnPiece(piece)) {
                // Play the  move if it is possible and otherwise remove selecion and highlights
                movePiece(id);

                reset();

                return;
            }

            movingPiece = piece;
            possibleMoves = piece.legalMoves(Board);

            highlightPossibleMoves();
        }else {
            movePiece(id);
            
            reset();
        }
    }
    function reset() {
        //TODO: Update with board_API_visuals
            //removeHighlightsPossibleMoves();
        movingPiece = null!;
        possibleMoves = [];
    }
    
    
    onMount(() => {
        //TODO: update with new board_API_visuals 
            //DrawAllSquares();
    }) 
</script>

<div>
    <div class="container">
        {#each Board.game as row, file}
                {#each Board.game[file] as piece, rank}
                    <div id={String.fromCharCode(65 + rank) + (8-file).toString()} class="card"
                        on:click={(e) => {
                            onClickLogic(e);
                        }}
                        >
                    </div>
                {/each}
        {/each}
    </div>
</div>
<style lang="scss">
    .container {
		display: grid;
		grid-template-rows: repeat(8, 0fr);
		grid-template-columns: repeat(8, 0fr);
        max-width: calc(60px * 8);
        max-height: calc(60px * 8);
        background-image: url("/src/lib/assets/board.png");
        background-size: calc(60px * 8);
        background-repeat: no-repeat;
	}
    .card {
		display: flex;
		justify-content: center;
		align-items: center;
        color: darkblue;
		background-color: rgb(173, 216, 230,0);
		width: 60px;
        height: 60px;
	}

    .coordinates {
        // left: 0;
        position: absolute;
        // top: 0;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
    }
    .coordinate-dark, .coordinate-light {
        font-weight: 600;
    }
    .coordinate-light {
        fill: #779952;
    }
</style>