//---- Local Varaibles / not for html ----
let user = localStorage.getItem("currentUser");
let pet;


//---- Load The Current User and it's pets/no pets -----
ajaxCall("GET",baseUrl+"user/"+user,(result)=>{
    user= JSON.parse(result);
    loadPet();
    hoi(user);
});

//---------- HTML Elements to change around --------
function getItems(element){
    return document.getElementById(element)
}

let happy = getItems("happyLevel");
let hungry = getItems("hungryLevel");
let clean = getItems("hygieneLevel");
let sick = getItems("sickStatus");
let smart = getItems("smart");
let age = getItems("age");
let money = getItems("money");


//when user has no pets --> generate first pet
function loadPet(){
    hoi("hello");
    hoi(user.pets.length==0);
    hoi(user.pets[user.pets.length-1].alive==false)
    if(user.pets.length==0||user.pets[user.pets.length-1].alive==false){
        hoi("hello")
        ajaxCall("GET",baseUrl+"getPet/"+user._id, myPetAjax);
    }else{
        myPet(user.pets[user.pets.length-1]);
        hoi(pet)
    }
    
    function myPetAjax(userPet){
        pet=JSON.parse(userPet);
    }
    function myPet(userPet){
        pet=userPet;
    }
}

//if user has pets --> display them or not
{
    function getBodyLink(id){
        return new Promise((res,rej)=>{
            ajaxCall("GET", baseUrl+"petBody/"+id,(link)=> {
                res(JSON.parse(link) )
            });
        })
        
    }
    
    setInterval(()=>{
        if(pet!=null){
            
            happy.value = pet.status.happy;
            //document.getElementById("happyLevel").value = pet.status.happy;
            hungry.value = pet.status.hungry;
            clean.value = pet.status.clean;
            sick.value = pet.status.sick;
            smart.value = pet.status.smart;
            age.value = pet.status.age;
            money.value = pet.status.money;
            
            let face = document.getElementById("face");
            let head = document.getElementById("head");
            let body = document.getElementById("body");
            
            getBodyLink(pet.body.face._id).then((result)=>{
                face.src=result
            });
            if(pet.body.head!=null){
                getBodyLink(pet.body.head._id).then((result)=>{
                    head.src=result
                }); 
            }
            
            getBodyLink(pet.body.body._id).then((result)=>{
                body.src=result
            });      
        }else{
            allClean();
        }
        
    },1000)
}
function allClean(){
    happy.value = ""
    hungry.value =""
    clean.value = ""
    sick.value = ""
    smart.value = ""
    age.value = ""
    money.value = ""
    document.getElementById("face").src="";
    document.getElementById("head").src="";
    document.getElementById("body").src="";
}
//send the database all 10 seconds an update on the pet

setInterval(()=>{
    if(pet != null){
        ajaxCall('PUT',baseUrl+"downPet/"+user._id,newPet);
    }
},4000)

function newPet(newPet){
    pet=JSON.parse(newPet);

    
}
//buttons get functions and change values of stuff
{
    document.getElementById("food").onclick=()=>{
        ajaxCall("PUT", baseUrl+"food/"+user._id,newPet);
    }
    
    document.getElementById("play").onclick=()=>{
        ajaxCall("PUT", baseUrl+"play/"+user._id,newPet);
    }
    
    document.getElementById("medicine").onclick=()=>{
        ajaxCall("PUT", baseUrl+"medicine/"+user._id,newPet);
    }
    
    document.getElementById("education").onclick=()=>{
        ajaxCall("PUT", baseUrl+"education/"+user._id,newPet);
    }
    
    document.getElementById("wash").onclick=()=>{
        ajaxCall("PUT", baseUrl+"wash/"+user._id,newPet);
    }
    
    document.getElementById("shop").onclick=()=>{
        //ajaxCall("PUT", baseUrl+"shop/"+document.getElementById("user1").value+"/"+
        //document.getElementById("pass1").value,canGoOn);
        
        alert("Shop in work.");
    }
}

//aging -- Evolving
setInterval(()=>{
    if(pet != null){
        ajaxCall('PUT',baseUrl+"aging/"+user._id,(petty)=>{
            newPet(petty);
            if(
                pet.status.age == pet.evolutionPoint[0]  || 
                pet.status.age == pet.evolutionPoint[1] &&
                pet!=null
                
            ){
               evo=pet.status.age;
                hoi(evo)
                ajaxCall('PUT',baseUrl+"evolving/"+user._id,newPet);
            }
        });
    }
},/*1000*60*/ 4000)


//check if it's dead --> Get new Pet Button to summon new pet
setInterval(()=>{
    if(
        happy.value>100 || happy.value <0 ||
        hungry.value>100 || hungry.value <0 ||
        clean.value>100 || clean.value <0 ||
        sick.value>100 || sick.value <0 ||
        smart.value>100 || smart.value <0 &&
        pet!=null){
            hoi("Your pet is dead");
            ajaxCall('PUT',baseUrl+"death/"+user._id,()=>{
                pet=null;
                user.pets[user.pets.length-1].alive = false;
                //make new pet button visible and useable
            });
        }

    },500);

    document.getElementById("newPet").onclick=()=>{
        hoi("Time for another one")
        loadPet();
    }