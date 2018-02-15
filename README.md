# Lemmings Clone

A Lemmings clone using HTML5 and Javascript

# Contributors
 - Seth Bertlshofer [ironLink21](https://github.com/ironlink21)
 - Ryan Frazier [pianomanfrazier](https://github.com/pianomanfrazier)

# run project for development

- install all node_modules (we use yarn `yarn` at project root)
- go to server/ run `nodemon`. Install nodemon with `npm install -g nodemon`.
- open a new terminal, go to project root and run `gulp`
- open your browser to `localhost:3001` (if it automatially opens your browser manually refresh the page once to make sure everything is loaded)

# Dependencies

The Node server needs a MongoDB to connect to save scores and users. The game will work just fine without the database though.

- MonogDB -- start a docker instance with `docker run --name lemmings-mongo -p 27017:27017 -d mongo` 
- sass -- must be in your executable path in order to compile the sass to css

