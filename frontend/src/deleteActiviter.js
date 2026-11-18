import axios from "axios"
import addClickLisntener from "./addClickLisntener.js"
import afficherCards from "./afficherCards.js"
const deleteActiviter = () => {
  addClickLisntener("supprimer", async (e) => {
    await axiosdelete(e.target.dataset.id);
    document.getElementById(`activiter${e.target.dataset.id}`).remove()
  });
  
};


const axiosdelete= async (id)=>{
    try {
        await axios.delete(`http://127.0.0.1:3000/api/activites/${id}`)
    } catch (error) {
        console.log(error);
        
    }
}

export default deleteActiviter;
