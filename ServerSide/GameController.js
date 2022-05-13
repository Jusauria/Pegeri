let hoi =(string='hoi')=>console.log(string)

let fs = require('fs');
const { res } = require("express");
const User = require('../ObjectInterfaces/user');
const path = require('path');

function GameController(dao){
    this.gameDAO = dao;
    
    
    this.addField= async(req,res)=>{
        
        let game = await this.gameDAO.getGameWithId(req.params.gameid);
        
        let newField = new Fields(req.params.fieldid);
        game.fieldlist.push(newField);
        this.gameDAO.updateGame(game);
        res.send(JSON.stringify("Success"))
    }
    this.joinGame=async(req,res)=>{
        
        let game = await this.gameDAO.getGameWithId(req.params.gameid);
        res.send(JSON.stringify(game));
    }
    this.findNextField=async(req,res)=>{
        
        let game = await this.gameDAO.getGameWithId(req.params.gameid);
        
        
        let avaiable=[1,2,3,4,5,6,7,8,9];
        game.fieldlist.forEach(e => {
            
            for(let i=0;i<avaiable.length;i++){
                if(e.fieldId==avaiable[i]){
                    avaiable.splice(i,1);
                }
            }
        });
        let field = new Fields(avaiable[0]);
        game.fieldlist.push(field);
        if(game.mode==1){
            this.gameDAO.updateGame(game);
        }
        res.send(JSON.stringify(field));
    }
    
    this.login=async(req,res)=>{
        let user = await this.gameDAO.findUserByName(req.params.user);
        if(user!=null&& user.password==toHash(req.params.pass)){
            res.send(JSON.stringify(user));
        }else{
            res.send("Error: No user found or Password not correct").status(404);   
        }
        
    }
    
    this.register=async(req,res)=>{
        let exist = await this.gameDAO.userExit(req.params.user);
        
        if(exist != null){
            res.send("Name is already used!").status(406);
        } else{
            let user = new User(req.params.user,toHash(req.params.pass));
            this.gameDAO.insertUser(user);
            res.send(JSON.stringify(user));
        }
        
        
    }
    
    this.getFile=(req,res)=>{
        res.sendFile(req.params.name,{root: '../'});
    }
}

function toHash(string){
    //set variable hash as 0
    var hash = 0;
    // if the length of the string is 0, return 0
    if (string.length == 0) return hash;
    for (i = 0 ;i<string.length ; i++){
        let ch = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + ch;
        hash = hash & hash;
    }
    return hash;
}
    
    module.exports= GameController;