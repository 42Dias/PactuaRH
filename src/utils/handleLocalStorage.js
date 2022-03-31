/*
Aqui ficará o handle do local
*/
export default function HandleLocalStorageData(role, tenatId, id, status, token, empresaId){
    //sets the localStorage data required to the use of the application
    localStorage.setItem("roles", role);
    localStorage.setItem("tenantId", JSON.stringify(tenatId))
    localStorage.setItem("id", JSON.stringify(id))
    localStorage.setItem("status", JSON.stringify(status))
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("fullName", JSON.stringify(empresaId));
  }