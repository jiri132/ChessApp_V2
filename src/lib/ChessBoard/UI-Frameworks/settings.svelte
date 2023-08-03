<script lang="ts">
    import type ChessBoard from "../Core/[V2]/ChessBoard";
    import { GameType } from "../Core/[V2]/Types/Game/game.enum";
    import { writable, type Writable } from 'svelte/store';

    export let ChessBoard : ChessBoard;

    const gameTypesArray = Object.keys(GameType)

    export const selectedGameType : Writable<GameType> = writable(GameType.Human_VS_Human);
    
    let selectedBot1 : string = "";
    let selectedBot2 : string = "";

    /// Subscribe to the selectedGameType store
    $: selectedType = $selectedGameType;

    // Function to update the selected game type
    function updateSelectedGameType(event : any) {
        const newSelectedType = event.target.value;
        selectedGameType.set(newSelectedType);

        // Add the new front end selection
        switch(selectedType) {
            case GameType.Human_VS_Human:
            case GameType.Human_VS_Bot:
            case GameType.Bot_VS_Bot:
        }
    }

</script>

<div id="settings" class="infoStack">
    <div>
        style:
        <select id="playStyleSelection" on:change={updateSelectedGameType}>
            {#each gameTypesArray as type}
                <option value={type.replaceAll("_", " ")}>{type.replaceAll("_", " ")}</option> 
            {/each}
        </select>
    </div>
    <div>
        bot 1: 
        <select id="bot1Selection" bind:value={selectedBot1}>
            {#each ChessBoard.baseBotFileNames as botNames}
                <option value={botNames}>{botNames}</option> 
            {/each}
        </select>
    </div>
    <div>
        bot 2: 
        <select id="bot2Selection" bind:value={selectedBot2}>
            {#each ChessBoard.baseBotFileNames as botNames}
                <option value={botNames}>{botNames}</option> 
            {/each}
        </select>
    </div>
    
    

    <button on:click={(e) => {ChessBoard.newGame(selectedType, selectedBot1, selectedBot2)}}>new game</button>
</div>

<style lang="scss">
    #settings {
        color: black;
        justify-content: center;
        width: 120%;
        select {
            max-width: fit-content;
        }
    }
</style>