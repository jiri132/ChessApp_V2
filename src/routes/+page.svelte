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

  import BitArray from "$lib/BitArray/Core/BitArray"
  import type {BinaryGroup} from "$lib/BitArray/Core/Types/Binary/BinaryGroup.type"

  const data : BinaryGroup<8>[] = ["10101010","00001111"];

  const ba = new BitArray(12,false,data);
  
</script>
  
<h1>Welcome to my chess application</h1>

