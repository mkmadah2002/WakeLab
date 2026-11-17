import axios from "axios"
import afficherCards from "./afficherCards"


const createActiviter =  () => {
    const form = document.forms["formdajute"]
    const userName = localStorage.getItem("username")
    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        if (formvalid(form)) {
           await axiospost(
                form.titre.value,
                form.theme.value,
                form.objectifs.value,
                form.duree.value,
                form.description.value,userName
            )
            
            afficherCards()
        }
    

    })
}


const axiospost = async (titre,theme,objectifs,duree,description, auteur) => {
    try {
    const response = await axios
        .post("http://127.0.0.1:3000/api/activites",{
                titre: titre,
                theme: theme,
                objectifs: objectifs,
                duree: Number(duree),
                description: description,
                auteur: auteur
            }
        )        
    } catch (error) {
         console.log(error.response.data);
        
    }

}

const formvalid = (form) => {
    let isValid = true
    if(form.titre.value.trim() == "" && form.titre.value.trim().length <5 && form.titre.value.trim().length <100 ){
            form.titre.nextElementSibling.textContent = "Le titre doit contenir entre 5 et 100 caractères."
            isValid=false;
        }
    if  (form.theme.value ==  "--selectioner une theme--") {
        form.theme.nextElementSibling.textContent = "Le thème doit être : jeu, apprentissage, exercice, autre."
        isValid=false;
    }
    if (form.description.value.length < 20 || form.description.value.length >100 ) {
        form.description.nextElementSibling.textContent = "La description doit contenir entre 20 et 1 000 caractères"
        isValid=false;
    }
    if (Number(form.duree.value.trim()) < 10 && Number(form.duree.value.trim()) > 20 ) {
        form.duree.nextElementSibling.textContent = "La durée doit être un entier compris entre 10 et 20."
        isValid=false;
    }
    return isValid
}


export default createActiviter