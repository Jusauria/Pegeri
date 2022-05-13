
function GameRoutes(express, gameController){
    this.expressApp = express;
    this.controller = gameController;

    this.setRoutes=()=>{
        /*this.expressApp.post('/tictactoe/newgame/:mode/:myturn', this.controller.newGame);

        this.expressApp.post('/tictactoe/:gameid/field/:fieldid', this.controller.addField);

        this.expressApp.post('/tictactoe/:gameid/move/:moveid', this.controller.findNextField);

        this.expressApp.post('/tictactoe/joingame/:gameid', this.controller.joinGame);

        this.expressApp.post('/tictactoe/nextgame/:gameid', this.controller.resetGame);*/
        this.expressApp.get('/pegeri/login/:user/:pass',this.controller.login);
        this.expressApp.post('/pegeri/register/:user/:pass',this.controller.register);

        this.expressApp.get('/file/:name', this.controller.getFile);

    }
   
}
module.exports=GameRoutes;