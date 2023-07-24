<script lang="ts">
  // import ExtendedDatabase from '$lib/DatabaseExtention/Core/DatabaseExtention'
  // import type { InputParams, TableParams } from '$lib/DatabaseExtention/Core/interfaces/DatabaseExtention.TableParams.interface';

  // const url = "mysql://user:mypassword@localhost:3306/";
  // const db = new ExtendedDatabase(url, 'testdb');
    
  // const exampleData : TableParams = {
  //   id: {
  //     type: "INT(10)",
  //     primaryKey: true,
  //     autoIncrement: true,
  //     unique: true
  //   },
  //   username: {
  //     type:"VARCHAR(255)",
  //     notNull: true,
  //   },
  //   email: {
  //     type:"VARCHAR(255)",
  //     unique: true,
  //     notNull: true
  //   },
  //   password: {
  //     type: "VARCHAR(255)",
  //     notNull: true
  //   }
  // }
  // db.CreateTable('users',exampleData);

  //import BitArray from "$lib/BitArray/Core/BitArray"
  //import type {BinaryGroup} from "$lib/BitArray/Core/Types/Binary/BinaryGroup.type"
    
  // const pawn_data : BinaryGroup<4>[] = [
  //   "0000",
  //   "1010",
  //   "0000",
  //   "1101",
  // ];

  // const board_data : BinaryGroup<8>[] = [
  //   "11111111",
  //   "11111111",
  //   "00000000",
  //   "00000000",
  //   "00000000",
  //   "00000000",
  //   "11111111",
  //   "11111111",
  // ];

  // const ba = new BitArray(64,true,board_data);
  // console.log(ba.get());

    import ChessBoard from "$lib/ChessBoard/Core/Board";

    const game = new ChessBoard();

    // console.log(game.getPieceAtPosition("B2"))
    // game.movePiece("D2","D4");
    // game.movePiece("D1","D3");
    // game.movePiece("D3","E4");
    
    // console.log(game.getPieceAtPosition("A4"))
    // game.getYourLegalMoves();
    game.playMove("A2A4");
    game.playMove("A7A6");
    game.playMove("B2B4");
    game.playMove("B7B6");
</script>
  
<h1>Welcome to my chess application</h1>

