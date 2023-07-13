<script lang="ts">
    import Greet from '../lib/Greet.svelte'
    import Database from "@tauri-apps/plugin-sql";

    const url = "mysql://user:mypassword@localhost:3306/testdb";

    const db : Promise<Database> = Database.load(url);
      db.then((database : Database) => {
        // Adding a new column to the db
        database.execute(`CREATE TABLE IF NOT EXISTS users (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) UNIQUE,
            username VARCHAR(255),
            email_address VARCHAR(255) UNIQUE,
            password VARCHAR(255)
          );
        `);

        // Selecting a column
        database.select(
          "SELECT id from users"
        ).then((result) => {
          console.log(result);
        });
      });
</script>
  
<h1>Welcome to SvelteKit</h1>
<Greet />