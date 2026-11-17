const addUser = ()=>{
    console.log("something")
    const userParent = document.createElement("div")
     userParent.classList="fix  h-screen flex justify-center content-center bg-blue-300"
    
    
     const userInputDive = document.createElement("div")
     userInputDive.className="w-2/4 text-center"
    const userInput = document.createElement("input")
    userInput.className="border-2 bg-white w-full"
    userInput.setAttribute("type","text")
    userInput.setAttribute("placeholder","enter your user name")
    userInput.addEventListener("keydown" ,(e)=>{
        if(e.key == "Enter"){
            localStorage.setItem("username",e.target.value)
            userParent.remove()
        } 
    })
    const h1 = document.createElement("h1")
    const P = document.createElement("p")
    P.textContent="press enter"
    P.className="mt-2"
    h1.textContent='entre your user name'
    h1.className = "text-lg m-4 text-xl "
    userInputDive.append(h1,userInput,P)
    userParent.appendChild(userInputDive)
    document.body.appendChild(userParent)

}

export default addUser;