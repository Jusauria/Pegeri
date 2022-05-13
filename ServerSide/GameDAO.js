const { ObjectId } = require('mongodb');

let hoi =(string='hoi')=>console.log(string)

function GameDAO(GameDbo){
    this.dbo = GameDbo;
    
    this.userExit=(userName)=>{
        return new Promise ((res,rej)=>{
            /*const query = { name: userName };
            
            this.dbo.collection("users").findOne(query,
                (err, result)=>{
                    if (err) rej(false);
                    if(result) res(true);
                });
            })*/
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
        this.updateUser= (user)=>{
            const query = { _id: game._id };
            const set = { $set: game}
            this.dbo.collection("users").updateOne(
                query,
                set,
                (err,result)=>{
                    if(err) hoi(err);
                    
                })
            }
            this.insertUser= (users)=>{
                return new Promise((res,rej)=>{
                    this.dbo.collection("users").insertOne(users, (err, result)=>{
                        if (err) rej(err);
                        res(result.insertedId);
                    });
                });
            }
        }
        
        
module.exports = GameDAO