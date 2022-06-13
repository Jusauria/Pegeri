
document.getElementById("sendLogin").onclick=()=>{
    ajaxCall("GET", baseUrl+"login/"+document.getElementById("user").value+"/"+
    document.getElementById("pass").value,canGoOn);
}

document.getElementById("register").onclick=()=>{
    ajaxCall("POST", baseUrl+"register/"+document.getElementById("user1").value+"/"+
    document.getElementById("pass1").value,canGoOn);
    if(document.getElementById('user1').value =='uh'){
        event.preventDefault()
        event.stopPropagation()
    }
}



function canGoOn(result){
    console.log(JSON.parse(result))
    if(JSON.parse(result) instanceof String){
        console.log("Error! ITCH")
    }
    let user = JSON.parse(result);
    
    if(user!=null){
        localStorage.setItem("currentUser",user.name);
        window.open("./main.html");
    }
}

