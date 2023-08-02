<script lang="ts">
    import type ChessBoard from "../Core/[V2]/ChessBoard";
    import { GameType } from "../Core/[V2]/Types/Game/game.type";
    import { writable, type Writable } from 'svelte/store';

    export let Board : ChessBoard;

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
    }

</script>

<div id="settings" class="infoStack">
    <select id="playStyleSelection" on:change={updateSelectedGameType}>
        {#each gameTypesArray as type}
            <option value={type}>{type.replaceAll("_", " ")}</option> 
        {/each}
    </select>

    {#if (selectedType === GameType.Human_VS_Bot)} 
        <select id="bot1Selection">
            {#each Board.baseBotFileNames as botNames}
                <option value={botNames}>{botNames}</option> 
            {/each}
        </select>
    {/if}

    <p>Selected Game Type: {selectedType}</p>
    

    <button on:click={(e) => {Board.newGame(selectedType)}}>new game</button>
</div>

<style lang="scss">

</style>