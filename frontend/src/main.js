import addUser from "./user/addUser.js"
import afficherCards from "./afficherCards.js"
import createActiviter from"./createActiviter.js"
import addClickLisntener from "./addClickLisntener.js"
import deleteActiviter from "./deleteActiviter.js"
import modifierActiviter from "./modifierActiviter.js"
const username = localStorage.getItem("username")

if (!username) {
    addUser()
}


afficherCards()
createActiviter()
deleteActiviter()
modifierActiviter()
showform()
showmodform()



function showform(){

  const formdiv = document.getElementById("formdajute")

  addClickLisntener("showForm",(e)=>{
    formdiv.classList.toggle("hidden")
  })


}


export function showmodform (){
addClickLisntener("remmodform", (e) => {
    const formdiv = document.getElementById("formdmod")
       formdiv.classList.add("hidden")
    })
}