import getActiviter from "./getActiviter"

const afficherCards = async ()=>{
    const activters = await getActiviter()
    const cardContaner= document.getElementById("cardContaner")
    cardContaner.replaceChildren()
       activters.forEach(activter => {
        cardContaner.appendChild(createCard(activter.id,"https://fiches-pratiques.chefdentreprise.com/wp-content/uploads/2025/09/Quelles-sont-differentes-activites-team-building-F-684x513.jpg",activter.titre,activter.description))
       
    });
}

const createCard = (id,img,title,descreotion)=>{
    const div = document.createElement("div")
    div.className = "bg-neutral-primary-soft block h-max max-w-sm p-2 border border-default rounded-base shadow-xs"

    const imgDiv = document.createElement("div")

    const imgelment = document.createElement("img")

    imgelment.setAttribute("src",`${img}`)
    imgelment.setAttribute("alt","img d'activiter")
    imgelment.className ="rounded-base"
    imgDiv.appendChild(imgelment)

    const h5 = document.createElement("h5")
    h5.className = " text-2xl font-semibold tracking-tight text-heading"
    h5.textContent = title
    const p = document.createElement("p")
    p.className = "mb-6 text-body"
    p.textContent = descreotion;

    const divbtn = document.createElement("div")
    divbtn.className = "flex w-full justify-evenly"

    const a = document.createElement("a")
    a.id= `activiter/${id}`
    a.textContent= "modifier"
    a.className ="inline-flex items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none hover:bg-blue-200 "

    a.addEventListener("click",()=>{
        console.log("somthing")
    })
    const a1 = document.createElement("a")
    a1.id= `${id}`
    a1.textContent= "supprimer"
    a1.className ="inline-flex items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-red-500 hover:text-white focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none  "
    a1.addEventListener("click",()=>{
        
    })
    divbtn.append(a,a1)

    div.append(imgDiv,h5,p,divbtn)
    
    return div
}


export default afficherCards