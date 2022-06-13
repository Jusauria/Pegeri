//---- Local Varaibles / not for html ----
let user = localStorage.getItem("currentUser");
let pet;


//---- Load The Current User and it's pets/no pets -----
ajaxCall("GET",baseUrl+"user/"+user,(result)=>{
    user= JSON.parse(result);
    loadPet();
});

//---------- HTML Elements to change around --------
function getItems(element){
    return document.getElementById(element)
}
//the elements from html
let happy = getItems("happyLevel");
    let hungry = getItems("hungryLevel");
    let clean = getItems("hygieneLevel");
    let sick = getItems("sickStatus");
    let smart = getItems("smart");
    let age = getItems("age");
    let money = getItems("money");

//when user has no pets --> generate first pet
function loadPet(){
    if(user.pets.length==0||user.pets[user.pets.length-1].alive==false){
        ajaxCall("GET",baseUrl+"getPet/"+user._id, (userPet)=>{
            pet=JSON.parse(userPet);
        });
    }else{
       pet=user.pets[user.pets.length-1];
    }
    
}

//if user has pets --> display them or not
{
    setInterval(()=>{
        if(pet!=null){
            
            happy.value = pet.status.happy;
            hungry.value = pet.status.hungry;
            clean.value = pet.status.clean;
            sick.value = pet.status.sick;
            smart.value = pet.status.smart;
            age.value = pet.status.age;
            money.value = pet.status.money;
            
            let face = document.getElementById("face");
            let head = document.getElementById("head");
            let body = document.getElementById("body");
            
            if(pet.body.face!=null){
                face.style.display='';
                getBodyLink(pet.body.face._id).then((result)=>{
                    face.src=result
                });
            }else{
                face.style.display='none'
            }
            
            if(pet.body.head!=null){
                head.style.display ='';
                getBodyLink(pet.body.head._id).then((result)=>{
                    head.src=result
                }); 
            }else{
                head.style.display ='none';
            }
            if(pet.body.body!=null){
                body.style.display ='';
                getBodyLink(pet.body.body._id).then((result)=>{
                    body.src=result
                });     
            }
             
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
    document.getElementById("face").style.display='none';
    document.getElementById("head").style.display='none';
    document.getElementById("body").style.display='none';
}
//send the database all 10 seconds an update on the pet

setInterval(()=>{
    if(pet != null){
        ajaxCall('PUT',baseUrl+"downPet/"+user._id,newPet);
    }
},3000)

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
                tempAlert('Pet Evolved',1500);
                ajaxCall('PUT',baseUrl+"evolving/"+user._id,newPet);
            }
        });
    }
},/*1000*60*/ 4000)

function tempAlert(msg,duration)
{
 var el = document.createElement("div");
 el.setAttribute("style","position:absolute;top:30px;left:20;background-color:green;padding:5px");
 el.innerHTML = msg;
 setTimeout(function(){
  el.parentNode.removeChild(el);
 },duration);
 document.body.appendChild(el);
}

//check if it's dead --> Get new Pet Button to summon new pet
let newPetButton = document.getElementById('newPet');
setInterval(()=>{
    if(
        happy.value>99 || happy.value <0 ||
        hungry.value>99 || hungry.value <0 ||
        clean.value>99 || clean.value <0 ||
        sick.value>99 || sick.value <0 ||
        smart.value>99 || smart.value <0 &&
        pet!=null){
            tempAlert("Your Pet died!",2000)
            ajaxCall('PUT',baseUrl+"death/"+user._id,()=>{
                pet=null;
                user.pets[user.pets.length-1].alive = false;
                //make new pet button visible and useable
                newPetButton.classList.remove('invisible');
                buttonDisable(true);
            });
        }
    },500);

    document.getElementById("newPet").onclick=()=>{
        loadPet();
        newPetButton.classList.add('invisible');
        buttonDisable(false);
    }
    function buttonDisable(state){
        let buttons=document.querySelectorAll('button')
        for(let i=1;i<buttons.length-1;i++){
            buttons[i].disabled = state;
        }
    }