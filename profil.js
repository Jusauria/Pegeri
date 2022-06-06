
//---- Local Varaibles / not for html ----
let user = localStorage.getItem("currentUser");
let pet;
//-- Load user ---
ajaxCall("GET",baseUrl+"user/"+user,(result)=>{
    user= JSON.parse(result);
    hoi(user);
    pet = user.pets;
    showPets();
});

//--- Changes the name---
{
    let name = document.getElementById('name');
    name.innerHTML = 'Name: '+user;
}

//----password change---
{
    document.getElementById("passNow").onclick=()=>{
        let oldPass = document.getElementById('oldPass').value;
        let newPass = document.getElementById('newPass').value;
        
        ajaxCall("GET", baseUrl+"login/"+user.name+"/"+oldPass,(result)=>{
            ajaxCall("PUT", baseUrl+"passUpdate/"+user._id+"/"+newPass,(result)=>{
                ajaxCall("GET",baseUrl+"user/"+user.name,(result)=>{
                    hoi(JSON.parse(result));
                })
            })
        })
        
        //ajaxCall("PUT", baseUrl+"food/"+user._id,newPet);
    }
}

//--- Items from shop

//Pet display item creations
{
    function createPetItem(pet){
        //Shows Name, Age, Stage, Status of livign
        
        let div = document.createElement('div');
        div.classList.add('dropdown');
        let button = document.createElement('button');
        button.classList.add('btn','btn-secondary', 'dropdown-toggle');
        button.setAttribute('data-bs-toggle','dropdown');
        button.innerHTML = pet.name;
        
        let ul = document.createElement('ul');
        ul.classList.add('dropdown-menu');
        
        let a =[];
        a[0]=setA();
        a[0].innerHTML = "Age: "+ pet.status.age;
        ul.append(a[0]);

        a[1]=setA();
        a[1].innerHTML = "Alive: "+ pet.alive;
        ul.append(a[1]);

        a[2]=setA();
        a[2].innerHTML ="Stage: "+ pet.stage;
        ul.append(a[2]);

        a[3]=setA();
        if(pet.body.face != null){
            getBodyLink(pet.body.face._id).then((result)=>{
                let img = document.createElement('img');
                img.src=result;
                a[3].append(img);
            })
        }
       
        if(pet.body.head != null){
            getBodyLink(pet.body.head._id).then((result)=>{
                let img = document.createElement('img');
                img.src=result;
                a[3].append(img);
            })
        }
        getBodyLink(pet.body.body._id).then((result)=>{
            let img = document.createElement('img');
            img.src=result;
            a[3].append(img);
        })
        ul.append(a[3]);
        
        
        
        div.append(button);
        div.append(ul);
        return div;
        
    }
    function setA(){
        let element = document.createElement('a');
        element.classList.add('dropdown-item');
        return element;
    }
}

//shows pets
function showPets(){
//--- Current pet displace
{
    
    document.getElementById('curentPet').append(createPetItem(pet[pet.length-1]));
}
// Show all dead pets
{
    for(let i=0; i<pet.length-1;i++){
        document.getElementById('deadPet').append(createPetItem(pet[i]))
    }
}
}
