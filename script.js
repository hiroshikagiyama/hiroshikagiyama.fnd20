const button = document.querySelector("button");
const pTag = document.querySelector("p");

function teisyutu(){
    let word = "";
    pTag.innerText = "提出OK！";
}

button.addEventListener("click",teisyutu)
