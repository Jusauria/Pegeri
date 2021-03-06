
function GameRoutes(express, gameController,petController){
    this.expressApp = express;
    this.controller = gameController;
    this.pet= petController;
    this.baseUrl ="/pegeri/";

    this.setRoutes=()=>{
 
        //---- User Cpmtroller -----
        this.expressApp.get(this.baseUrl+'login/:user/:pass',this.controller.login);
        this.expressApp.post(this.baseUrl+'register/:user/:pass',this.controller.register);
        this.expressApp.put(this.baseUrl+'passUpdate/:userID/:pass',this.controller.updatePass);

        this.expressApp.get(this.baseUrl+'user/:username',this.controller.getUser);
        this.expressApp.put(this.baseUrl+'user/:userID/:pets',this.controller.update);

        //----- Pet Controller ------
        //head and body can turn into one! They just seek by id
        this.expressApp.get(this.baseUrl+'getPet/:user',this.pet.getPet);
        this.expressApp.get(this.baseUrl+'petBody/:id',this.pet.getBody);
        this.expressApp.put(this.baseUrl+'downPet/:user',this.pet.updatePet);

        //needs
        this.expressApp.put(this.baseUrl+'food/:user',this.pet.food);
        this.expressApp.put(this.baseUrl+'play/:user',this.pet.play);
        this.expressApp.put(this.baseUrl+'medicine/:user',this.pet.medicine);
        this.expressApp.put(this.baseUrl+'education/:user',this.pet.education);
        this.expressApp.put(this.baseUrl+'wash/:user',this.pet.wash);

        //special
        this.expressApp.put(this.baseUrl+'aging/:user',this.pet.age);
        this.expressApp.put(this.baseUrl+'evolving/:user',this.pet.evo);
        this.expressApp.put(this.baseUrl+'death/:user',this.pet.death);
       
        //get File
        let path = require('path');
        this.expressApp.get(this.baseUrl+':name', function(req, res) {
            res.sendFile(path.join(__dirname,'..', req.params.name));
          });

    }
   
}
module.exports=GameRoutes;