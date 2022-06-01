
function Pet(){
    this.name;
    this.alive=true;
    this.stage=1;
    this.status={
        money:0,
        age:0,
        happy:0,
        hungry:0,
        sick:0,
        clean:0,
        smart:0
    }
    this.body={
        face:null,
        head:null,
        body:null
    }
    this.evolutionPoint=[];
}

module.exports=Pet;