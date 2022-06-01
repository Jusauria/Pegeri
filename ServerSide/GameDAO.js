const { ObjectId } = require('mongodb');

let hoi =(string='hoi')=>console.log(string)

function GameDAO(GameDbo){
    this.dbo = GameDbo;
    
    this.userExit=(userName)=>{
        return new Promise ((res,rej)=>{
            res(this.findUserByName(userName).then(true,false));     
        })
    }
        
        this.findUserByName=(userName)=>{
            return new Promise ((res,rej)=>{
                const query = { name: userName };
                
                this.dbo.collection("users").findOne(query,
                    (err, result)=>{
                        if (err) rej(err);
                        res(result);
                    });
                })
        }
        this.findUserByID=(id)=>{
            return new Promise ((res,rej)=>{
                const query = { _id: new ObjectId(id) };
                
                this.dbo.collection("users").findOne(query,
                    (err, result)=>{
                        if (err) rej(err);
                        res(result);
                    });
                })
        }
        this.updateUser= (userID,pets)=>{
            const query = { _id: userID};
            hoi(pets);
            const set = { $set: {pets:["user.pets"]}}; //this might be wrong.
            hoi(set);
            return new Promise((res,rej)=>{
                this.dbo.collection("users").updateOne(
                    query,
                    set,
                    (err,result)=>{
                        if(err) rej(err);
                        res("Success");
                    })
            });
            
            }
            this.insertUser= (users)=>{
                return new Promise((res,rej)=>{
                    this.dbo.collection("users").insertOne(users, (err, result)=>{
                        if (err) rej(err);
                        res(result.insertedId);
                    });
                });
            }
        

//--------------- Pet Database stuff --------------
        this.getBody= (type,stage,style)=>{
            const query = { type:type,stage:stage,style:style };
            return new Promise((res,rej)=>{
                this.dbo.collection("bodyparts").findOne(query,
                    (err, result)=>{
                        if (err) rej(err);
                        res(result);
                    });
            });
        }
       
        this.getPart= (id)=>{
            const query = { _id: new ObjectId(id) };
            return new Promise((res,rej)=>{
                this.dbo.collection("bodyparts").findOne(query,
                    (err, result)=>{
                        if (err) rej(err);
                        res(result);
                    });
            });
        }
        

        this.addPetToArray=(userID,pet)=>{
            const query = { _id: new ObjectId(userID) };
           
            const set = { $push: {pets:pet}};
           
            return new Promise((res,rej)=>{
                this.dbo.collection("users").updateOne(
                    query,
                    set,
                    (err,result)=>{
                        if(err) rej(err);
                        res("Success");
                    })
            });
        }
        this.updateUserPet= (userID,pet,number)=>{
            const query = { 
                _id: new ObjectId(userID),
                "pets.alive": true
            };
            const set = { $set: { "pets.$":pet}}; //this might be wrong.
            
            return new Promise((res,rej)=>{
                this.dbo.collection("users").updateOne(
                    query,
                    set,
                    (err,result)=>{
                        if(err) rej(err);
                        res("Success");
                    })
            });
            
            }
    }                
        
module.exports = GameDAO