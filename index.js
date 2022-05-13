let user;

const baseUrl = "http://localhost:5010/pegeri/";


document.getElementById("sendLogin").onclick=()=>{
    ajaxCall("GET", baseUrl+"login/"+document.getElementById("user").value+"/"+
    document.getElementById("pass").value,canGoOn);
}

document.getElementById("register").onclick=()=>{
    ajaxCall("POST", baseUrl+"register/"+document.getElementById("user1").value+"/"+
    document.getElementById("pass1").value,canGoOn);
}

function ajaxCall(method, url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(xhr.responseText);
            } else {
                console.log("xhr failed: " + xhr.status);
            }
        }
    };
}

function canGoOn(result){
    user = JSON.parse(result);
    if(user!=null){
        window.open("./main.html");
    }
    
}

module.exports= user;