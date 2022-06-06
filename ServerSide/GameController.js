let hoi =(string='hoi')=>console.log(string)

let fs = require('fs');
const { res } = require("express");
const User = require('../ObjectInterfaces/user');
const path = require('path');

function GameController(dao){
    this.gameDAO = dao;
    
    
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


    this.getUser=async(req,res)=>{
        res.send(JSON.stringify(await this.gameDAO.findUserByName(req.params.username)));
    }
    this.update=async(req,res)=>{
        await this.gameDAO.updateUser(req.params.userID,req.params.pets);
        res.send("Updated");
    }
    this.updatePass=async(req,res)=>{
        await this.gameDAO.updateUserPass(req.params.userID,toHash(req.params.pass));
        res.send("Updated");
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