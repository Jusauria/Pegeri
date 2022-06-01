
document.getElementById("sendLogin").onclick=()=>{
    console.log(ajaxCall);
    ajaxCall("GET", baseUrl+"login/"+document.getElementById("user").value+"/"+
    document.getElementById("pass").value,canGoOn);
}

document.getElementById("register").onclick=()=>{
    ajaxCall("POST", baseUrl+"register/"+document.getElementById("user1").value+"/"+
    document.getElementById("pass1").value,canGoOn);
}



function canGoOn(result){
    console.log(JSON.parse(result))
    let user = JSON.parse(result);
    
    if(user!=null){
        localStorage.setItem("currentUser",user.name);
        window.open("./main.html");
    }
}
