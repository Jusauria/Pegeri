let hoi =(string='hoi')=>console.log(string)

let express = require('express');
const app = express();
let DBConnection = require('./DBConnection');
let GameDAO = require('./GameDAO');
let GameController = require('./GameController');
let GameRoutes = require('./GameRoutes');

let cors = require('cors');
app.use(cors());

function TTTServer() {
    const dbConnection = new DBConnection();
    this.start = function() {
        dbConnection.connect().then(dbo =>
            {
                const gameDAO = new GameDAO(dbo);
                const gameController = new GameController(gameDAO);
                const gameRoutes = new GameRoutes(app, gameController);
                gameRoutes.setRoutes();
                app.listen(5010, () => console.log('Listening on port 5051'))
            });
        }
    }
    let tttServer = new TTTServer();
    tttServer.start();
    