<script lang="ts">
    import { onMount } from "svelte";
    import ChessBoard from "../Core/[V2]/ChessBoard";
    import BoardHelper from "../Core/[V2]/Helpers/BoardHelper";
    import BoardVisualHelper from "../Core/[V2]/Helpers/BoardVisualHelper";
    import type { BoardLocation } from "../Core/[V2]/Types/Location/Location.type";
    import type { IPiece } from "../Core/[V2]/Interfaces/Board/Pieces/IPieces";
    import Move from "../Core/[V2]/Move/Move";
    import DisplayMoves from "./displayMoves.svelte";
    import Settings from "./settings.svelte";
    import type { ImyBot } from "$lib/ChessEngine/ImyBot";
    import type { GameType } from "../Core/[V2]/Types/Game/game.enum";

    let Board : ChessBoard;
    
    let movingPiece : IPiece;
    let possibleMoves : Move[] = [];
    //let playstyle : playStyles = playStyles.Human_vs_MyBot;


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


    
    // When the class gets instantiated
    $: {
        Board = new ChessBoard();
    }
    // When the class is done loading
    onMount(() => {
        BoardVisualHelper.RenderAllTiles(Board.Board);
    })
</script>


<div class="visualContainer">
    <Settings ChessBoard={Board} />
    <div class="ChessBoard">
        {#each Board.Board.tiles as tile}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div id={tile.name} class="card"
                on:click={(e) => {
                    onClickLogic(e);
                }}
            >
            </div>
        {/each}
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