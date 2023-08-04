<!-- Logo start -->
<img align="right" width="40" src="src-tauri/icons/Square310x310Logo.png"></a>
<!-- Logo end -->

<!-- Documentation start -->
# Chess App v2
>**Welcome to the Rust-Svelte Chess App v2!** This is an open-source project that combines the power of Rust for the backend, Svelte for the frontend, and TypeScript for type-safe interactions. This app allows users to play chess against bots, giving them an enjoyable and interactive gaming experience.

### Table of Contents
<!--Todo: Adding Links to headings 
    Hi @jiri132, you have to add in the paranthesis the links for the headings. 

    The links would be:
        1. https://github.com/jiri132/ChessApp_V2#features

        2. https://github.com/jiri132/ChessApp_V2#technologies-used

        3. https://github.com/jiri132/ChessApp_V2#getting-started

        3.1 https://github.com/jiri132/ChessApp_V2#prerequisites

        3.2 https://github.com/jiri132/ChessApp_V2#installation

        4. https://github.com/jiri132/ChessApp_V2#contributing

        5. https://github.com/jiri132/ChessApp_V2#license

        6. https://github.com/jiri132/ChessApp_V2#acknowledgments

        >if you have any questions, feel free to ask me
        >You can find my email address on my profile:
        >https://github.com/N3v1
-->
1. [Features]()
2. [Technologies Used]()
3. [Getting Started]()
   - [Prerequisites]()
   - [Installation]()
4. [Contributing]()
5. [License]()
6. [Acknowledgments]()

## Features
With this app, you can **program your own bot** and engage in fierce **competition** against either **my bot** or a **human player**. In the forthcoming versions, you'll be empowered to **upload** and **store bots** fashioned by other users.

## Technologies Used

- **Backend**: The server-side of the application is built using Rust, a systems programming language known for its performance and safety features.

- **Frontend**: The user interface is built with Svelte, a modern JavaScript framework that compiles components to highly efficient vanilla JavaScript.

- **TypeScript**: TypeScript is used to add static typing to JavaScript, providing enhanced development tools and reducing errors.

## Design
The design is very simple, which makes it easier to overview and navigate through the app. The app consists of three windows: 
1. The bot selection menu
2. The chessboard where the moves are visualized
3. The chess notation

You can find screenshots from the app [**here**](documentation/Design.md).

## Getting Started
### Prerequisites
- [**Rust**](https://www.rust-lang.org/tools/install) installed.
- [**Node.js**](https://nodejs.org/) and **npm** (Node Package Manager) installed.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jiri132/ChessApp_V2.git
   ```
2. Navigate to the backend directory: `cd src-tauri/src/` and run `cargo run` to start the Rust backend server.
3. Open another terminal window, navigate to the frontend directory: `cd src` and run the following commands:
    - `npm install` to install the required frontend dependencies.
    - `npm run dev` to start the Svelte development server.

The app should now be running and accessible at `http://localhost:5000`.

## Contributing
>We welcome contributions to improve the Rust-Svelte Chess App! If you'd like to contribute, please follow the steps in the [**`Contribute.md`**](documentation/Contribute.md) file.

## License
>This project is licensed under the GNU GPLv3 license. See [**`LICENSE`**](LICENSE).

## Acknowledgments
This project was inspired by the love for chess and the desire to learn and collaborate on new technologies.

## Translation
This guide is also available in other languages:
<!-- Languages start -->
- [**🇩🇪 German**](documentation/translation/README_de.md)
<!-- Languages end -->
<!-- Documentation end -->