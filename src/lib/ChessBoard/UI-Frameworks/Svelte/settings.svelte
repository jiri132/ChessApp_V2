<script lang="ts">
    import type ChessBoard from "../../Core/[V2]/ChessBoard";
    import { GameType } from "../../Core/[V2]/Types/Game/game.enum";
    import { writable, type Writable } from 'svelte/store';

    export let ChessBoard : ChessBoard;

    const gameTypesArray = Object.keys(GameType)

    export const selectedGameType : Writable<GameType> = writable(GameType.Human_VS_Human);
    export const total_rounds : Writable<number> = writable(1)

    let selectedBot1 : string = "";
    let selectedBot2 : string = "";

    let selectedType : GameType;
    let rounds : number = 1;
    /// Subscribe to the selectedGameType store
    $: {
        selectedType = $selectedGameType;
    }
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

<div id="settings" >
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
    <div>
        <input type="range" min="1" max="100" bind:value={rounds} on:change={() => {total_rounds.set(rounds); console.log(rounds)}} class="slider" />
        <div class="sliderNamesContainer">
            <div>
            1
            </div>
            <div>
            50
            </div>
            <div>
            100
            </div>
        </div>
    </div>
    <button on:click={(e) => {ChessBoard.totalRounds = rounds;  ChessBoard.newGame(selectedType, selectedBot1, selectedBot2)}}>new game</button>
</div>

<style lang="scss">
    #settings {
        color: black;
        background-color: gray;
        padding: 10px;
        border-radius: 15px;

        //justify-content: center;
        //width: 120%;
        select {
            max-width: fit-content;
        }

        .slider {
            padding: 0;
        }
        .sliderNamesContainer {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: -5px 0px 0px 7.5px;
            padding-left: -5px;
            color: rgba(0, 0, 0, 0.37);
        }
    }
    
</style>