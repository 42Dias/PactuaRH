import { Email } from "../services/api"

export default function checkAuth(){
    console.log(Email)
    if(!Email){
      window.location.hash = '/'
    }
  }