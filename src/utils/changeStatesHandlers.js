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
    
  static handleChangeStateOfObject(i, e, state, setState ){
    console.log("e.target.value")
    console.log(e.target.value)

    const newFormValues = [...state]
    // @ts-ignore
    newFormValues[i][e.target.name] = e.target.value

    setState(newFormValues)

    console.log(newFormValues)
  }

  static handleChangeStateOfArray(i, e, state, setState ){
    console.log("e.target.value")
    console.log(e.target.value)

    const newFormValues = [...state]
    // @ts-ignore
    newFormValues[i] = e.target.value

    setState(newFormValues)

    console.log(newFormValues)
  }
    
  static removeFormFields(i, state, setState){
    const newFormValues = [...state]
    newFormValues.splice(i, 1)
    setState(newFormValues)
  }

}