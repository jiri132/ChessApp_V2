<script lang="ts">
  import Greet from '../lib/Greet.svelte'
  import ExtendedDatabase from '$lib/DatabseExtention/DatabaseExtention';
  import type { InputParams, TableParams } from '$lib/DatabseExtention/DatabaseExtention.TableParams.interface';

  const url = "mysql://user:mypassword@localhost:3306/";
  const db = new ExtendedDatabase(url, 'testdb');
    
  const exampleData : TableParams = {
    id: {
      type: "INT(10)",
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    displayName: {type:"VARCHAR(255)"},
    userName: {
      type:"VARCHAR(255)",
      unique: true,
    },
    age: {type:"INT(3)"},
    email: {type:"VARCHAR(255)"},
  }
 
  db.CreateTable('humans', exampleData);

  const exampleData2 : InputParams = {
    displayName: "x",
    username: "xx",
    age: 3,
    email: "jiri28beurskens@gmail.com"
  };

  db.AppendTable('humans', exampleData2)

  db.SelectTable('humans').then((value) => {
    console.log(value)
  });

  // const exampleData2 : InputParams = { 
  //   displayName: "HelloMyMan"
  // }


  // db.UpdateTable('humans',exampleData2, 0);
</script>
  
<h1>Welcome to SvelteKit</h1>
<Greet />