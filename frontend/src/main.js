import addUser from "./user/addUser.js"
import afficherCards from "./afficherCards.js"
import createActiviter from"./createActiviter.js"
import addClickLisntener from "./addClickLisntener.js"
import deleteActiviter from "./deleteActiviter.js"
const username = localStorage.getItem("username")

if (!username) {
    addUser()
}

showform()
afficherCards()
createActiviter()
deleteActiviter()






function showform(){

  const formdiv = document.getElementById("formdiv")

  addClickLisntener("showForm",(e)=>{

    formdiv.classList.toggle("hidden")
  })


}
