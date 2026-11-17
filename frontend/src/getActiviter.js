import axios from "axios";

 const  getActiviter = async ()=>{
    const Activiter= await axios.get("http://localhost:3000/api/activites")
    return Activiter.data
}


export default getActiviter;


