import addUser from "./user/addUser.js"
import afficherCards from "./afficherCards.js"
import createActiviter from"./createActiviter.js"
const username = localStorage.getItem("username")

if (!username) {
    addUser()
}



showform()
afficherCards()
createActiviter()






function showform(){
  const showform = document.getElementById("showForm")
  const formdiv = document.getElementById("formdiv")
  showform.addEventListener("click",(e)=>{

    formdiv.classList.toggle("hidden")
  })
}
