let hoi =(string='hoi')=>console.log(string)

var MongoClient = require('mongodb').MongoClient
let nconf = require('nconf');

nconf.argv().env().file('keys.json');
const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const database = nconf.get('mongoDatabase');

let uri = "mongodb+srv://"+user+":"+pass+"@"+host+"/"+database+"?retryWrites=true&w=majority";

function DBConnection(){
    this.connect=()=>{
        return new Promise((res,rej)=>{
            MongoClient.connect(
            uri,
            {
                maxPoolSize: 50,
                useNewUrlParser: true
            }, (err,client)=> {
                if (err) {
                   rej(err);
                }
                else{
                  res(client.db("pegeri"));
                };
            });
        });
    }
}

module.exports=DBConnection;
