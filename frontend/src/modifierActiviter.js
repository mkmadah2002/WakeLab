import getActiviter from "./getActiviter";
import addClickLisntener from "./addClickLisntener";
import { formvalid } from "./createActiviter";
import axios from "axios";
import Swal from 'sweetalert2'



const modifierActiviter =  () => {
    
    const formdiv = document.getElementById("formdmod")
    
    addClickLisntener("modifier", async (e) => {
        formdiv.classList.remove("hidden")
        const activiter = await modActiviter(e.target.dataset.id)
        modificationform(activiter)
        

    })
}


// {
//     "id": 7,
//     "titre": "somthing",
//     "theme": "jeu",
//     "objectifs": "for somthing",
//     "duree": 10,
//     "description": "dsfdsfds fdsfdsqfdsqf fdsqfdsfqds",
//     "auteur": "Mohamed Madah",
//     "createdAt": "2026-11-19T09:20:37.839Z",
//     "updatedAt": "2026-11-19T09:20:37.839Z"
// }





 

const modActiviter = async (id) => {
    const modActivie = await getActiviter()
    return modActivie.find((Activie) => Activie.id == id)
}

const modificationform = (activiter)=>{
    const formdiv = document.getElementById("formdmod")
    const form = document.forms["formdmod"]
    const {id} = activiter
    fillform(form,activiter)


    form.addEventListener("submit",(e)=>{
        e.preventDefault()
                
        if(formvalid(form)){
            axiosput(id,
                 form.titre.value,
                 form.theme.value,
                form.objectifs.value,
                form.duree.value,
                form.description.value
            )
            formdiv.classList.add("hidden")
            
            
        }
    })
}

const fillform = (form ,{titre,theme,objectifs,duree,description})=>{
    form.titre.value = titre
    form.theme.value = theme
    form.objectifs.value = objectifs
    form.duree.value=duree
    form.description.value=description
    
}

const axiosput= async(id,titre,theme,objectifs,duree,description)=>{
    try {
       const res= await axios.put(`http://127.0.0.1:3000/api/activites/${id}`,
                {id,
                titre,
                theme,
                objectifs,
                duree : Number(duree),
                description
            })

                console.log(res.status)
        Swal.fire({
                title: "le activiter est modifier",
                icon:"success"
            })
    } catch (error) {
        Swal.fire({
            icon :"error",
            title:error
        })
    }
}

export default modifierActiviter;