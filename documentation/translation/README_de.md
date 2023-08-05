<!-- Logo start -->
<img align="right" width="40" src="../../src-tauri/icons/Square310x310Logo.png"></a>
<!-- Logo end -->

<!-- Documentation start -->
# Schach App v2
>**Wilkommen zur Dokumentation für fie Rust-Svelte Schach App v2!** Dies ist ein Open-Source-Projekt, das die Leistungsfähigkeit von Rust für das Backend, Svelte für das Frontend und TypeScript für typsichere Interaktionen kombiniert. Mit dieser App können Benutzer Schach gegen Bots spielen und erhalten so ein unterhaltsames und interaktives Spielerlebnis.

### Inhaltsverzeichnis
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
1. [Funktionen]()
2. [Benutzte Technologien]()
3. [Design]()
3. [Einstieg]()
   - [Voraussetzungen]()
   - [Installation]()
4. [Mitwirken]()
5. [Lizenz]()
6. [Acknowledgments]()
7. [Übersetzung]()

## Funktionen
Mit dieser App können Sie **Ihren eigenen Bot programmieren** und an harten **Wettbewerben** entweder gegen **meinen Bot** oder einen **menschlichen Spieler** teilnehmen. In den kommenden Versionen können Sie von anderen Benutzern erstellte Bots **hochladen** und **speichern**.

## Benutzte Technologien

- **Backend**: Die Serverseite der Anwendung wird mit Rust erstellt, einer Systemprogrammiersprache, die für ihre Leistungs- und Sicherheitsfunktionen bekannt ist.

- **Frontend**: Die Benutzeroberfläche ist mit Svelte erstellt, einem modernen JavaScript-Framework, das Komponenten zu hocheffizientem Vanilla-JavaScript kompiliert.

- **TypeScript**: TypeScript wird verwendet, um statische Typisierung zu JavaScript hinzuzufügen, wodurch verbesserte Entwicklungstools bereitgestellt und Fehler reduziert werden.

## Design
Das Design ist sehr einfach gehalten, was die Übersicht und Navigation in der App erleichtert. Die App besteht aus drei Fenstern:
1. Das Bot-Auswahlmenü
2. Das Schachbrett, auf dem die Züge visualisiert werden
3. Die Schachnotation

Screenshots von der App finden Sie [**hier**](../Design.md).

## Einstieg
### Voraussetzungen
- [**Rust**](https://www.rust-lang.org/tools/install) ist installiert.
- [**Node.js**](https://nodejs.org/) und **npm** (Node Paket Manager) sind installiert.

### Installation
1. Clone das repository:
   ```bash
   git clone https://github.com/jiri132/ChessApp_V2.git
   ```
2. Navigieren Sie zum Backend-Verzeichnis: `cd src-tauri/src/` und führen Sie `cargo run` aus, um den Rust-Backend-Server zu starten.
3. Öffnen Sie ein anderes Terminalfenster, navigieren Sie zum Frontend-Verzeichnis: `cd src` und führen Sie die folgenden Befehle aus:
    - `npm install` um die benötigten Frontend dependencies zu installieren.
    - `npm run dev` um den Svelte Entwicklungs server zu starten.

Die App sollte jetzt ausgeführt werden und unter  `http://localhost:5000` erreichbar sein.

## Mitwirken
>Wir freuen uns über Beiträge zur Verbesserung der Rust-Svelte-Schach-App! Wenn Sie einen Beitrag leisten möchten, befolgen Sie bitte die Schritte in der Datei  [**`Contribute.md`**](../Contribute.md).

## Lizenz
>Dieses Projekt ist unter der GPL-3.0 Lizenz lizenziert. Siehe [**`LICENSE`**](../../LICENSE).

## Acknowledgments
Dieses Projekt wurde von der Liebe zum Schach und dem Wunsch inspiriert, neue Technologien zu lernen und daran zusammenzuarbeiten.

## Übersetzung
Gehe zurück zur Original Datei in Englisch
<!-- Languages start -->
- [**🇺🇸 Englisch**](../../README.md)
<!-- Languages end -->
<!-- Documentation end -->