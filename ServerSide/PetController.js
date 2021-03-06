let hoi =(string='hoi')=>console.log(string)

let fs = require('fs');
const Pet = require('../ObjectInterfaces/pet');
const { randomInt } = require('crypto');
const { ObjectId } = require('mongodb');


let style =["friendly","arrogant","evil"];

function PetController(dao){
    this.gameDAO = dao;
    
    this.getPet=async(req,res)=>{
        
        let pet = new Pet;
        pet.status.clean=99;
        pet.status.happy=99;
        pet.status.age = 0;
        pet.status.money =0;
        pet.status.smart = 10;
        pet.evolutionPoint[0]= Math.floor(Math.random() * 5)+3
        pet.evolutionPoint[1]= Math.floor(Math.random() * 15)+7
        
        pet.body.face=await this.gameDAO.getBody("face",pet.stage,style[Math.floor(Math.random() * 3)]);
        pet.body.body=await this.gameDAO.getBody("body",pet.stage,style[0]);
        
        let state = await this.gameDAO.addPetToArray(req.params.user,pet);
        res.send(JSON.stringify(pet));
    }
    
    this.getBody=async(req,res)=>{
        let part = await this.gameDAO.getPart(req.params.id);
        res.send(JSON.stringify(part.image));
    }
    this.updatePet=async(req,res)=>{
        
        let stuff = await this.getPetObj(req.params.user)
        let pet = stuff[0];
        let user = stuff[1];
        
        pet.status.happy-=1;
        pet.status.hungry+=1;
        if(Math.floor(Math.random()*2)+1==1){
            pet.status.sick+=1;
        }
        
        pet.status.clean-=1;
        pet.status.smart-=1;
        
        await this.gameDAO.updateUserPet(user._id,pet);
        res.send(JSON.stringify(pet));
    }
    //Functions that Update the pet in special sections
    {
        this.food=async(req,res)=>{
            let stuff = await this.getPetObj(req.params.user)
            let pet = stuff[0];
            let user = stuff[1];
            
            let hun = Math.floor(Math.random() * 23) + 1
            let hap = Math.floor(Math.random() * 5) + 1
            
            pet.status.hungry=pet.status.hungry-hun ;
            pet.status.happy += hap;
            
            await this.gameDAO.updateUserPet(user._id,pet);
            res.send(JSON.stringify(pet));
        }
        this.play=async(req,res)=>{
            let stuff = await this.getPetObj(req.params.user)
            let pet = stuff[0];
            let user = stuff[1];
            
            pet.status.happy += Math.floor(Math.random() * 23) + 1
            pet.status.hungry += Math.floor(Math.random() * 5) + 1
            pet.status.money += Math.floor(Math.random() * 50) + 1
            if(Math.floor(Math.random())){
                pet.status.sick+=1;
            }
            await this.gameDAO.updateUserPet(user._id,pet);
            res.send(JSON.stringify(pet));
        }
        this.medicine=async(req,res)=>{
            let stuff = await this.getPetObj(req.params.user)
            let pet = stuff[0];
            let user = stuff[1];
            
            pet.status.sick-=Math.floor(Math.random() * 15) + 1
            pet.status.happy+=Math.floor(Math.random() * 5) + 1
            
            await this.gameDAO.updateUserPet(user._id,pet);
            res.send(JSON.stringify(pet));
        }
        this.education=async(req,res)=>{
            let stuff = await this.getPetObj(req.params.user)
            let pet = stuff[0];
            let user = stuff[1];
            
            pet.status.smart+=Math.floor(Math.random() * 40) + 1
            pet.status.happy+=Math.floor(Math.random() * 5) + 1
            pet.status.hungry += Math.floor(Math.random() * 5) + 1
            
            await this.gameDAO.updateUserPet(user._id,pet);
            res.send(JSON.stringify(pet));
        }
        this.wash=async(req,res)=>{
            let stuff = await this.getPetObj(req.params.user)
            let pet = stuff[0];
            let user = stuff[1];
            
            pet.status.clean+=Math.floor(Math.random() * 23) + 1
            pet.status.happy+=Math.floor(Math.random() * 5) + 1
            pet.status.hungry += Math.floor(Math.random() * 5) + 1
            if(Math.floor(Math.random())){
                pet.status.smart+=Math.floor(Math.random() * 15) + 1
            }
            
            await this.gameDAO.updateUserPet(user._id,pet);
            res.send(JSON.stringify(pet));
        }
        this.age=async(req,res)=>{
            let stuff = await this.getPetObj(req.params.user)
            let pet = stuff[0];
            let user = stuff[1];
            pet.status.age +=1;
            
            await this.gameDAO.updateUserPet(user._id,pet);
            res.send(JSON.stringify(pet));
        }
        this.evo=async(req,res)=>{
            let stuff = await this.getPetObj(req.params.user)
            let pet = stuff[0];
            let user = stuff[1];
            switch(pet.stage){
                case 1:
                pet.body.face=await this.gameDAO.getBody("face",pet.stage+1,pet.body.face.style);
                pet.body.head=await this.gameDAO.getBody("head",pet.stage+1,style[Math.floor(Math.random() * 3)]);
                pet.body.body=await this.gameDAO.getBody("body",pet.stage+1,style[Math.floor(Math.random() * 3)]);
                break;
                case 2:
                pet.body.face=await this.gameDAO.getBody("face",pet.stage+1,pet.body.face.style);
                pet.body.head=await this.gameDAO.getBody("head",pet.stage+1,pet.body.head.style);
                pet.body.body=await this.gameDAO.getBody("body",pet.stage+1,pet.body.body.style);
                break;
            }
            pet.stage+=1;
            await this.gameDAO.updateUserPet(user._id,pet);
            res.send(JSON.stringify(pet));
        }
        this.death=async(req,res)=>{
            let stuff = await this.getPetObj(req.params.user)
            let pet = stuff[0];
            let user = stuff[1];
            pet.alive=false;
            
            await this.gameDAO.updateUserPet(user._id,pet);
            res.send(JSON.stringify(pet));
        }
    }
    
    this.getPetObj=async(userId)=>{
        let user = await this.gameDAO.findUserByID(userId)
        return [user.pets[user.pets.length-1],user];   
    }
    
    
    
}

module.exports= PetController;