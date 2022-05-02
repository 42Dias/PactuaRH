/*
  =====================================================================================================
                                  Handle Change Screen elements 
  =====================================================================================================
  */
export default class stateHandler{
  static addFormFields(state, setState){
    // @ts-ignore
    setState([...state, {}])
  }
    
  static handleChangeState(i, e, state, setState ){
    console.log("e.target.value")
    console.log(e.target.value)

    const newFormValues = [...state]
    // @ts-ignore
    newFormValues[i][e.target.name] = e.target.value

    setState(newFormValues)
  }
    
  static removeFormFields(i, state, setState){
    const newFormValues = [...state]
    newFormValues.splice(i, 1)
    setState(newFormValues)
  }

}