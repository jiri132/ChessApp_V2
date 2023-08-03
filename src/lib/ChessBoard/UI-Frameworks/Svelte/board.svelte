<script lang="ts">
    import { onMount } from "svelte";
    import ChessBoard from "../../Core/[V2]/ChessBoard";
    import BoardHelper from "../../Core/[V2]/Helpers/BoardHelper";
    import BoardVisualHelper from "../../Core/[V2]/Helpers/BoardVisualHelper";
    import type { BoardLocation } from "../../Core/[V2]/Types/Location/Location.type";
    import type { IPiece } from "../../Core/[V2]/Interfaces/Board/Pieces/IPieces";
    import Move from "../../Core/[V2]/Move/Move";
    import { BoardStore } from "./Store";

    import DisplayMoves from "./displayMoves.svelte";
    import Settings from "./settings.svelte";
    import Player from "./player.svelte";
    import { writable } from "svelte/store";
    
    let Board : ChessBoard;

    let movingPiece : IPiece;
    let possibleMoves : Move[] = [];


    function SelectedOwnPiece(piece : IPiece) : boolean {

        if (Board.Board.isWhiteToMove && piece.color === "0") {

            BoardVisualHelper.RemoveHighlightPossibleMoves(possibleMoves);

            BoardVisualHelper.HighlightPossibleMoves(possibleMoves);

            return true;
        } else if (!Board.Board.isWhiteToMove && piece.color === "1") {
            BoardVisualHelper.RemoveHighlightPossibleMoves(possibleMoves);

            BoardVisualHelper.HighlightPossibleMoves(possibleMoves);

            return true;
        }
        
        return false;
    }

    function movePiece(move : Move) {
        const foundMove : Move | undefined = possibleMoves.find((item : Move) => item.from === move.from && item.to === move.to)
        if (!foundMove) {return;}

        // Play the move
        Board.Board.playMove(foundMove);
    }

    function onClickLogic(e : any) {
        //@ts-ignore
        const id : BoardLocation = e.target.id as BoardLocation;
        const piece : IPiece | undefined = BoardHelper.findPieceAtLocation(Board.Board,id);
        const boardMoves : Move[] = Board.Board.getLegalMoves();

        if (piece !== undefined) {
            if (!SelectedOwnPiece(piece)) {
                // Play the  move if it is possible and otherwise remove selection and highlights
                if (movingPiece) {
                    const move : Move = new Move(movingPiece,id,Board.Board);
                    movePiece(move);
                }
                reset();
                return;
            }
            BoardVisualHelper.RemoveHighlightPossibleMoves(possibleMoves)
            movingPiece = piece;
            const pieceMoves : Move[] = piece.getLegalMoves(Board.Board);
            boardMoves.forEach((legalMove : Move) => {
                pieceMoves.forEach((pMoves : Move) => {
                    if (pMoves.from === legalMove.from && pMoves.to === legalMove.to) {
                        possibleMoves.push(pMoves);
                    }
                });
            });
            BoardVisualHelper.HighlightPossibleMoves(possibleMoves);
        }else {
            if (movingPiece) {
                const move : Move = new Move(movingPiece,id,Board.Board);
                movePiece(move);
            }
            
            reset();
        }
    }

    function reset() {
        BoardVisualHelper.RemoveHighlightPossibleMoves(possibleMoves);
        movingPiece = null!;
        possibleMoves = [];
    }

    $: {
        Board = new ChessBoard();
        BoardStore.set(Board.Board)
    }
    // When the class is done loading
    onMount(() => {
        BoardVisualHelper.RenderAllTiles(Board.Board);
    })

    const width = Array.from({ length: 8 }, (_, index) => index + 1);
    const height = Array.from({ length: 8 }, (_, index) => index + 1);

    console.log(width)
</script>


<div class="visualContainer">
    <Settings ChessBoard={Board} />
    <div id="play-area" class="ChessBoardContainer">
        <Player color="1" />
        <div id="board" class="ChessBoard">
            {#each height as _y ,y }
                <div class="row">
                    {#each width as _x, x }
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div id={BoardHelper.indexToBoardLocation(y * 8  + x ) } class="card"
                            on:click={(e) => {
                                onClickLogic(e);
                            }}
                        ></div>
                    {/each}
                </div>
            {/each}
            <!-- {#each Board.Board.tiles as tile}
                
                <div id={tile.name} class="card"
                    on:click={(e) => {
                        onClickLogic(e);
                    }}
                >
                </div>
            {/each} -->
        </div>
        <Player color="0" />
    </div>
    
    <DisplayMoves ChessBoard={Board}/>
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
        min-height: 650px;
        
        
        
        .ChessBoardContainer {
            display: flex;
            flex-direction: column;
            padding: 5px;
            border-radius: 15px;
            background-color: rgb(139, 139, 139);
            justify-content:space-between;
            .ChessBoard {

                display: flex;
                flex-direction: column;
                //grid-template-rows: repeat(8, 0fr);
                //grid-template-columns: repeat(8, 0fr);
                min-width: calc(60px * 8);
                min-height: calc(60px * 8);
                max-width: calc(60px * 8);
                max-height: calc(60px * 8);
                background-image: url("/src/lib/assets/board.png");
                background-size: calc(60px * 8);
                background-repeat: no-repeat;

                .row {
                    display: flex;
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
	        }
        }
        
    }
    

    
</style>