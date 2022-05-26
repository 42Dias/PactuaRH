// n cargos - 1 benefício

import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX, FiFilter } from 'react-icons/fi'
import * as S from './Positions.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import loadCargos from 'service/cargos/cargos'
import { fullName } from 'service/api'
// All tables used
import cargos from 'service/cargos/cargos'
import funcoes from 'service/funcoes/funcoes'
import escolaridade from 'service/escolaridade/escolaridade'
import areas from 'service/area/area'
import habilidades from 'service/habilidades/habilidades'
//@ts-ignore  
import ReactHTMLTableToExcel from 'react-html-table-to-excel' 

import { iCargo, iData } from '../../../types'
import { useForm } from 'react-hook-form'

export default function Positions() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>()

  // const { allCargos } = useCargos()  
  
  const [allCargos    , setAllCargos    ] = useState<iCargo[]>([])
  const [allAreas     , setAllAreas     ] = useState<iData[]>([])
  const [allEducations, setAllEducations] = useState<iData[]>([])
  const [allFunctions , setAllFunctions ] = useState<iData[]>([])
  const [allSkills    , setAllSkills    ] = useState<iData[]>([])
  
  const [skills       , setSkills       ] = useState([ "" ])
  const [wanted       , setWanted       ] = useState([ "" ])
  const [functions    , setFunctions    ] = useState([ "" ])
  const [educations   , setEducations   ] = useState([ "" ])
  const [cargoSelected, setCargoSelected] = useState<iCargo>()


  const [skillsSelected       , setSkillsSelected       ] = useState( "" )
  const [wantedSelected       , setWantedSelected       ] = useState( "" )
  const [functionsSelected    , setFunctionsSelected    ] = useState( "" )
  const [educationsSelected   , setEducationsSelected   ] = useState( "" )


  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter ,setIsOpenFilter] = useState(false)
  // const [cargos, setCargos] = useState()

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModalNew() {
    setIsOpenNew(true)
  }

  function closeModalNew() {
    setIsOpenNew(false)
  }

  function openModalFilter() {
    setIsOpenFilter(true)
  }

  function closeModalFilter() {
    setIsOpenFilter(false)
  }

  async function handleLoadArea() {
    const allArea = await areas.list()

    setAllAreas(allArea)
  }
  async function handleLoadEducation() {
    let allEducation = await escolaridade.list()

    setAllEducations(allEducation)
  }

  async function handleLoadFunctions() {
    const funcao = await funcoes.list()

    setAllFunctions(funcao)
  }

  async function handleLoadSkills() {
    const allSkills = await habilidades.list()

    setAllSkills(allSkills)
  }


  /*
  ==================================================
            Multiple Skills Handler
  ==================================================
  */

  let handleChangeSkills = (i: number, id: string) => {
    let newFormValues = [...skills];
    //@ts-ignore
    newFormValues[i] = id;

    setSkills(newFormValues);
 }
      
  let addSkills = () => {
    //@ts-ignore
    setSkills([...skills, { id: "" }])
  }

  let removeSkills = (i: number) => {
      if(skills.length == 1) return
      let newFormValues = [...skills];
      newFormValues.splice(i, 1);
      setSkills(newFormValues)
  }

   /*
  ==================================================
           Multiple Skills Wanted Skills
  ==================================================
  */

  let handleChangeWanted = (i: number, id: string) => {
    let newFormValues = [...wanted];
    newFormValues[i] = id;

    setWanted(newFormValues);
 }
      
  let addWanted = () => {
    setWanted([...wanted, "" ])
  }

  let removeWanted = (i: number) => {
      if(wanted.length == 1) return
      let newFormValues = [...wanted];
      newFormValues.splice(i, 1);
      setWanted(newFormValues)
  }

  /*
  ==================================================
          Multiple functions Handler
  ==================================================
  */

  let handleChangeFunctions = (i: number, id: string) => {
    let newFormValues = [...functions];
    //@ts-ignore
    newFormValues[i] = id;

    setFunctions(newFormValues);
 }
    
      
  let addFunctions = () => {
    //@ts-ignore
    setFunctions([...functions, { id: "" }])
  }

  let removeFunctions = (i: number) => {
      if(functions.length == 1) return
      let newFormValues = [...functions];
      newFormValues.splice(i, 1);
      setFunctions(newFormValues)
  }

  /*
  ==================================================
            Multiple Skills Handler
  ==================================================
  */

  let handleChangeEducations = (i: number, id: string) => {
    let newFormValues = [...educations];
    //@ts-ignore
    newFormValues[i] = id;

    setEducations(newFormValues);
 }
      
  let addEducations = () => {
    //@ts-ignore
    setEducations([...educations, { id: "" }])
  }

  let removeEducations = (i: number) => {
      if(educations.length == 1) return
      let newFormValues = [...educations];
      newFormValues.splice(i, 1);
      setEducations(newFormValues)
  }



/*
  ==================================================
                  Positions Crud
  ==================================================
*/


  async function handleLoadPosition() {
    const cargo = await cargos.list()

    console.log('cargos')
    console.log(cargo)

    setAllCargos(cargo)
  }


  async function handleCreatePosition(rawData: any){
    let data = {
      nome: rawData.nome,
      descricao: rawData.desc,
      area: rawData.areaId,
      lideranca: rawData.lideranca == 'true',
      // ecolaridade: rawData.id,

      cargosLiderados: [ rawData.cargoLiderId ],
      // Estes 4 são tabelas separadas aaaaaaaa, como listas n:m 
      desejaveis: wanted,
      funcoes:    functions,
      habilidades: skills,
      ecolaridade: educations,
    }  


    console.log("data")
    console.log(data)
    
    let isCreated = await cargos.create(data)

    if(isCreated) closeModalNew()

    await handleLoadPosition()
    
    //Clears all data used
    reset(rawData)
    setSkills(    [ "" ] )
    setWanted(    [ "" ] )
    setFunctions( [ "" ] )
    setEducations([ "" ] )

  }

  async function handleUpdatePosition(rawData: any){
    let id = cargoSelected?.id

    let data = {
      nome:      rawData.nome     || cargoSelected?.nome,
      descricao: rawData.desc     || cargoSelected?.descricao,
      area:      rawData.areaId   || cargoSelected?.area,
      lideranca: rawData.lideranca == 'true'    || cargoSelected?.lideranca,
      cargosLiderados: [ rawData.cargoLiderId ] || cargoSelected?.cargosLiderados,
      desejaveis:  wanted,
      funcoes:     functions,
      habilidades: skills,
      ecolaridade: educations,
    }  

    
    let isUpdated = await cargos.update(id, data)

    if(isUpdated) closeModal()

    await handleLoadPosition()
    
    //Clears all data used
    reset(rawData)
    setSkills(    [ "" ] )
    setWanted(    [ "" ] )
    setFunctions( [ "" ] )
    setEducations([ "" ] )
  }

  async function handleDeletePosition(id: string){
    console.log(id)

    let isDeleted = await cargos.delete(id)

    await handleLoadPosition()

  }


/*
  ==================================================
                   useEffects
  ==================================================
*/
  useEffect(() => {
    handleLoadPosition()
  }, [])
  useEffect(() => {
    // Made like this 'cause of handleLoadAssociations threw a error "react-hooks/exhaustive-deps"
    handleLoadArea()
    handleLoadEducation()
    handleLoadFunctions()
    handleLoadSkills()
  }, [])


  /*
  ==================================================
                Values Handlers
  ==================================================
*/


  function handleSetSkills(cargo:iCargo){
    setSkills([])
    cargo?.habilidades?.map(
      (skills) => {
        setSkills(prevValues => {
          return Array.from(new Set([...prevValues, skills.id]))
          })
      }
    )
  }

  function handleSetWanted(cargo:iCargo){
    setWanted([])
    cargo?.desejaveis?.map(
      (wanted) => {
        setWanted(prevValues => {
          console.log(prevValues)
          console.log(wanted.id)
          return Array.from(new Set([...prevValues, wanted.id]))
          })
      }
    )
  }

  function handleSetFunctions(cargo:iCargo){
    setFunctions([])
    cargo?.funcoes?.map(
      (functions) => {
        setFunctions(prevValues => {
          return Array.from(new Set([...prevValues, functions.id]))
          })

      }
    )

  }

  function handleSetEducations(cargo:iCargo){
    setEducations([])

    cargo?.ecolaridade?.map(
      (educations) => {
        setEducations(prevValues => {
          return Array.from(new Set([...prevValues, educations.id]))
          })
      }
    )
  }
  // encapsulated all above
  function handleSetArrays(cargo: iCargo){
    console.log(cargo)
    handleSetSkills(cargo)
    handleSetWanted(cargo)
    handleSetFunctions(cargo)
    handleSetEducations(cargo)

  }


/*
  ==================================================
                   Filter Function
  ==================================================
*/
  async function handleFilterPosition(rawData: any){

    // reset(rawData)
    // setSkills( [ ] )
    // setWanted( [ ] )
    // setFunctions([ ] )
    // setEducations([ ] )

    let filter = '';

    if (rawData.nome){
      console.log("tem nome")
      if(filter.length != 0 ) filter += '&'
      filter += `filter%5Bnome%5D=${rawData.nome}`
    }
    if (rawData.desc){
      console.log("tem desc")

      if(filter.length != 0 ) filter += '&'
      filter += `filter%5Bdescricao%5D=${rawData.desc}`
      
    }
    if (rawData.areaId != "Área"){
      console.log("tem areaId")

      if(filter.length != 0 ) filter += '&'
      filter += `filter%5Barea%5D=${rawData.areaId}`
    }
    if (rawData.lideranca == "true"){
      console.log("tem pai")

      if(filter.length != 0 ) filter += '&'
      filter += `filter%5Blideranca%5D=${true}`
    }
    if (rawData.habilidadeId){
      console.log("tem pai")

      if(filter.length != 0 ) filter += '&'
      filter += `filter%5Bhabilidade%5D=${rawData.habilidadeId}`
    }
    

    if (educationsSelected) {

      console.log("Bjhbfakjdbvjbsdkjb")
      console.log("tem pai")

      if (filter.length != 0) filter += '&'
      filter += `filter%5Becolaridade%5D=${educationsSelected}`
    }


    let areaFilted = await cargos.listWithManyFilters(filter)

    setAllCargos(areaFilted)

    closeModalFilter()



  }


  return (
    <>
      <S.Body>
        <Sidebar />
        <S.Title>
          <S.Container>Bem vindo, {fullName} 😁</S.Container>
        </S.Title>
        <S.Container>
          <S.FlexButtons>
            <div>
              <button onClick={openModalNew}>
                Novo <FiPlus size={18} color='#fff' />
              </button>
              <button 
             
              onClick={openModalFilter}>
                Filtros
                <FiFilter size={18} />
              </button>
            </div>

            <ReactHTMLTableToExcel
              table="cargos"
              filename="Pactua Cargos Excel"
              sheet="Sheet"
              buttonText="Exportar para excel"
            />
          </S.FlexButtons>
          {/* TABELA */}
          {allCargos.length > 0 && (
            <S.Table id="cargos">
              <S.TrTitle>
                <td>Descrição</td>
                <td>CBO</td>
                <td>Área</td>
              </S.TrTitle>
            {
              allCargos.map(
                cargo => (
                  <S.TrSecond>
                    <td>{cargo.nome}</td>
                    <td>{cargo.cbo || "Não cadastrado"}</td>
                    <td>{cargo.area ? cargo.area.nome : "Não cadastrado"}</td>
                    <td>
                      <button onClick={() => {
                        setCargoSelected(cargo)

                        handleSetArrays(cargo)
                        
                        openModal()
                        }}
                        >
                        <FiEdit size={18} />
                      </button>
                    </td>
                    <td>
                      <button>
                        <FiTrash size={18} onClick={() => handleDeletePosition(cargo.id)} />
                      </button>
                    </td>
                  </S.TrSecond>
                )
              )
            }
            </S.Table>
          )}
          {allCargos.length == 0 && <p>Nenhum cargo cadastrado!</p>}
        </S.Container>
      </S.Body>

{/*
=========================================================================================================
                                    Edit
========================================================================================================= 
 */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
      >
        <button
          className='react-modal-close'
          type='button'
          onClick={closeModal}
        >
          <FiX />
        </button>

        {/* EDITAR CARGO */}
        <S.ContainerForm
          onSubmit={handleSubmit(handleUpdatePosition)}
        >
          <h2>Editar Cargo</h2>


          <label htmlFor="">Nome</label>
          <input
          defaultValue={cargoSelected?.nome}
          type='text'
          placeholder='Nome'
          {...register('nome')}
          />

          <label htmlFor="">Descrição</label>
          <input
          defaultValue={cargoSelected?.nome}
          type='text'
          placeholder='Descrição'
          {...register('desc')}
          />


        <label htmlFor="">Liderança</label>
        <select
          defaultValue={cargoSelected?.lideranca}
          placeholder='Liderança'
          {...register('lideranca')}
          >
        <option value={"false"}> Não </option>
        <option value={"true"}> Sim  </option>


        </select>
          {/* <input
          type='text' placeholder='Descrição oficial'
          // onChange={() => console.log(register)}
          {...register('descOfc')}
          /> */}

         <label htmlFor="">Código Brasileiro de Ocupações</label>
          <select
          defaultValue={cargoSelected?.cbo || "Não cadastrado"}
          {...register('ocupationCodeBr')}
          >
            <option>
              Código Brasileiro de Ocupações
            </option>
          </select>

          <label htmlFor="">Código de Ocupação conforme IR</label>

          <select
          defaultValue={cargoSelected?.ir || "Não cadastrado"}
          {...register('ocupationCodeIR')}>
            <option>
              Código de Ocupação conforme IR
            </option>
          </select>

          <label htmlFor="">Área</label>
          <select
          defaultValue={cargoSelected?.area?.id}
          {...register('areaId')}
          >
            <option hidden >Área</option>
            {
            allAreas.map(
              (area) => (
                <option key={area.id} value={area.id}>
                  {area.nome}
                </option>
              )
            )}
            
          </select>

          <label htmlFor="">Cargo Liderado</label>
          <select
          defaultValue={cargoSelected?.ir || "Não cadastrado"}
          // defaultValue={cargoSelected?.area?.id}
          {...register('cargoLiderId')}
          >
            <option hidden>Cargos Liderados</option>
            {
            allCargos.map(
              (cargo) => (
                <option key={cargo.id} value={cargo.id}>
                  {cargo.nome}
                </option>
              )
            )
            }
          </select>

          <label htmlFor="">Habilidade</label>
          <select
          {...register('habilidadeId')}
          >
            <option hidden >Habilidade</option>
            {
              allSkills.map(
                (skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.nome}
                  </option>
                )
              )
            }
          </select>

          <label htmlFor="">Habilidades</label>
          {
          skills.map(
            (skill, index) => (
              <div className="border">
                <div className="return">
                  <select
                  defaultValue={skills[index]}
                  onChange={(e) => handleChangeSkills(index, e.target.value)}
                  >
                    <option hidden >Habilidades</option>
                    {
                      allSkills.map(
                        (skill) => (
                          <option key={skill.id} value={skill.id}>
                            {skill.nome}
                          </option>
                        )
                      )
                    }
                  </select>
                  <button
                    className='btn-actions btn-trash'
                    type='button'
                    onClick={() => removeSkills(index)}
                  >
                    <FiTrash/>
                  </button>
                </div>  
              </div>
            )
          )
          }

          <button
          type='button'
          className='btn-actions btn-add'
          onClick={() => addSkills()}
          >
            <FiPlus size={20} />
          </button>

          <label htmlFor="">Desejaveis</label>
          {
          wanted.map(
            (skill, index) => (
              <div className="border">
                <div className="return">
                  <select
                  defaultValue={wanted[index]}
                  onChange={(e) => handleChangeWanted(index, e.target.value)}
                  >
                    <option hidden >Desejaveis</option>
                    {
                      allSkills.map(
                        (skill) => (
                          <option key={skill.id} value={skill.id}>
                            {skill.nome}
                          </option>
                        )
                      )
                    }
                  </select>
                  <button
                    className='btn-actions btn-trash'
                    type='button'
                    onClick={() => removeWanted(index)}
                  >
                    <FiTrash/>
                  </button>
                </div>
              </div>
            )
          )
          }

          <button
          type='button'
          className='button btn-actions btn-add'
          onClick={() => addWanted()}
          >
            <FiPlus size={20} />
          </button>


        <label htmlFor="">Funções</label>
        {
          functions.map(
            (skill, index) => (
              <div className="border">
                <div className="return">
                  <select
                  defaultValue={functions[index]}
                  onChange={(e) => handleChangeWanted(index, e.target.value)}
                  >
                    <option hidden >Funções</option>
                    {
                      allFunctions.map(
                        (afunction) => (
                          <option key={afunction.id} value={afunction.id}>
                            {afunction.nome}
                          </option>
                        )
                      )
                    }
                  </select>
                  <button
                    className='btn-actions btn-trash'
                    type='button'
                    onClick={() => removeFunctions(index)}
                  >
                    <FiTrash/>
                  </button>
                </div>
              </div>
            )
          )
          }

          <button
          type='button'
          className='btn-actions btn-add'
          onClick={() => addFunctions()}
          >
            <FiPlus size={20} />
          </button>

        <label htmlFor="">Escolaridade</label>

        {  
        educations.map(
          (education, index) => (
            <div className="border">
              <div className="return">
                <select
                defaultValue={educations[index]}
                onChange={(e) => handleChangeEducations(index, e.target.value)}
                >
                  <option hidden >Escolaridade</option>
                  {
                    allEducations.map(
                      (education) => (
                        <option key={education.id} value={education.id}>
                          {education.nome}
                        </option>
                      )
                    )
                  }
                </select>
                <button
                  className='btn-actions btn-trash'
                  type='button'
                  onClick={() => removeEducations(index)}
                >
                  <FiTrash/>
                </button>
              </div>
            </div>
          )
         )
        }

          <button
          type='button'
          className='btn-actions btn-add'
          onClick={() => addEducations()}
          >
            <FiPlus size={20} />
          </button>

          

          {/* <select
          {...register('desejavelId')}
          >
            <option hidden >Desejaveis</option>
            {
              allSkills.map(
                (skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.nome}
                  </option>
                )
              )
            }

          </select> */}
          {/* 1 - 1 is wrong, it is n:n */}
          {/* <select
          {...register('funcaoId')}
          >
            <option hidden>Funções</option>
            {
            allFunctions.map(
              (afunction)=> (
                <option key={afunction.id} value={afunction.id}>
                  {afunction.nome}
                </option>
              )
            )
            }
          </select> */}
          {/* <select
          
          {...register('escolaridadeId')}
          >
            <option hidden >Escolaridade</option>
            {
            allEducations.map(
              (education) => (
                <option key={education.id} value={education.id}>
                  {education.nome}
                </option>
              )
            )
            }
          </select> */}
          {/* <select>
            <option>Questionario</option>
          </select> */}

          {/* This field does not exist in the table */}
          {/* <input 
          {...register('planoAdm', {
              // required: true,
            })}
          type='text'
          placeholder='Plano ADM'
          /> */}

          {/* No need  */}
          {/* <input 
          {...register('sugerida', {
              required: true,
            })}
          type='text'
          placeholder='Classe/Faixa sugerida'
          />
           */}
          {/* This is what the table itself shows */}
          {/* <input 
          {...register('nivelHierarquico', {
              required: true,
            })}
          type='text'
          placeholder='Nível Hierárquico na empresa'
          /> */}

          {/*
          This already exists in education
          */}
          {/* <input
          {...register('grauInstrucao', {
              required: true,
            })}
          type='text'
          placeholder='Grau de instrução mínimo para o cargo'
          /> */}


          <input
          // onClick={(e) => console.log(register)}
          type='submit'
          className='button'
          value="Enviar"
          />
          
        </S.ContainerForm>
      </Modal>
{/*
=========================================================================================================
                                  Register
========================================================================================================= 
 */}
      <Modal
        isOpen={modalIsOpenNew}
        onRequestClose={closeModalNew}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
      >
        <button
          className='react-modal-close'
          type='button'
          onClick={closeModalNew}
        >
          <FiX />
        </button>

        {/* CADASTRO DO CARGO */}
        <S.ContainerForm
          // onSubmit={ handleSubmit(handleCreatePosition) }
          onSubmit={handleSubmit(handleCreatePosition)}
        >
          <h2>Cadastrar Cargo</h2>

          <label htmlFor="">Nome</label>
          <input
          type='text' placeholder='Nome'
          {...register('nome')}
          />

          <label htmlFor="">Descrição</label>
          <input
          type='text' placeholder='Descrição'
          {...register('desc')}
          />

          {/* <input
          type='text' placeholder='Descrição oficial'
          // onChange={() => console.log(register)}
          {...register('descOfc')}
          /> */}
          <label htmlFor="">Liderança</label>
          <select
            placeholder='Liderança'
            {...register('lideranca')}
            >
          <option hidden> Liderança </option>
          <option value={"true"}> Sim  </option>
          <option value={"false"}> Não </option>

          </select>

          <label htmlFor="">Código de ocupação</label>
          <select
          {...register('ocupationCodeBr')}
          >
            <option>
              Código Brasileiro de Ocupações
            </option>
          </select>

          <label htmlFor="">Código de ocupação conforme IR</label>
          <select
          {...register('ocupationCodeIR')}>
            <option>
              Código de Ocupação conforme IR
            </option>
          </select>

          <label htmlFor="">Aréa</label>
          <select
          {...register('areaId')}
          >
            <option hidden >Área</option>
            {
            allAreas.map(
              (area) => (
                <option key={area.id} value={area.id}>
                  {area.nome}
                </option>
              )
            )}
            
          </select>

          <label htmlFor="">Cargos liderados</label>
          <select
          {...register('cargoLiderId')}
          >
            <option hidden>Cargos Liderados</option>
            {
            allCargos.map(
              (cargo) => (
                <option key={cargo.id} value={cargo.id}>
                  {cargo.nome}
                </option>
              )
            )
            }
          </select>

          <label htmlFor="">Habilidade</label>
          <select
          {...register('habilidadeId')}
          >
            <option hidden >Habilidade</option>
            {
              allSkills.map(
                (skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.nome}
                  </option>
                )
              )
            }
          </select>

          <label style={{ marginBottom: '5px', }} htmlFor="">Habilidades</label>
          <div className="border">
          {
          skills.map(
            (skill, index) => (
              <div className="return">
              <select
                onChange={(e) => handleChangeSkills(index, e.target.value)}
                >
                  <option hidden >Habilidades</option>
                  {
                    allSkills.map(
                      (skill) => (
                        <option key={skill.id} value={skill.id}>
                          {skill.nome}
                        </option>
                      )
                    )
                  }
                </select>
                <button
                  className='btn-actions btn-trash'
                  type='button'
                  onClick={() => removeSkills(index)}
                >
                  <FiTrash/>
                </button>

              </div>
              )
            )
          }

          <button
            type='button'
            className='btn-actions btn-add'
            onClick={() => addSkills()}
            >
              <FiPlus size={20} />
          </button>
          
          </div>

          {/* <select
          {...register('desejavelId')}
          >

            <option hidden >Desejaveis</option>
            {
              allSkills.map(
                (skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.nome}
                  </option>
                )
              )
            }

          </select> */}
        <label style={{ marginBottom: '5px', }} htmlFor="">Desejaveis</label>
        <div className="border">
        {
          wanted.map(
            (skill, index) => (
              <div className="return">
                <select
                onChange={(e) => handleChangeWanted(index, e.target.value)}
                >
                  <option hidden >Desejaveis</option>
                  {
                    allSkills.map(
                      (skill) => (
                        <option key={skill.id} value={skill.id}>
                          {skill.nome}
                        </option>
                      )
                    )
                  }
                </select>
                <button
                  className='btn-actions btn-trash'
                  type='button'
                  onClick={() => removeWanted(index)}
                >
                  <FiTrash/>
                </button>

              </div>
            )
          )
          }
        </div>

        <button
        type='button'
        className='btn-actions btn-add'
        onClick={() => addWanted()}
        >
          <FiPlus size={20} />
        </button>

        <label style={{ marginBottom: '5px', }} htmlFor="">Funções</label>
        <div className="border">  
        {
          functions.map(
            (skill, index) => (
              <div className="return">
                <select
                onChange={(e) => handleChangeFunctions(index, e.target.value)}
                >
                  <option hidden >Funções</option>
                  {
                    allFunctions.map(
                      (afunction) => (
                        <option key={afunction.id} value={afunction.id}>
                          {afunction.nome}
                        </option>
                      )
                    )
                  }
                </select>
                <button
                  className='btn-actions btn-trash'
                  type='button'
                  onClick={() => removeFunctions(index)}
                >
                  <FiTrash/>
                </button>

              </div>
            )
          )
          }
        </div>

      <button
        type='button'
        className='btn-actions btn-add'
        onClick={() => addFunctions()}
      >
        <FiPlus size={20} />
      </button>
        
        {/* 
        <button
        type='button'
        className='btn-actions'
        onClick={() => addFunctions()}
        >
          <FiPlus size={20} />
        </button>
        */}


        <label style={{ marginBottom: '5px', }} htmlFor="">Escolaridade</label>
        <div className="border">
        {educations.map(
          (education, index) => (
            <div className="return">
              <select
              onChange={(e) => handleChangeEducations(index, e.target.value)}
              >
                <option hidden >Escolaridade</option>
                {
                  allEducations.map(
                    (education) => (
                      <option key={education.id} value={education.id}>
                        {education.nome}
                      </option>
                    )
                  )
                }
              </select>
              <button
                className='btn-actions btn-trash'
                type='button'
                onClick={() => removeEducations(index)}
              >
                <FiTrash/>
              </button>

            </div>
          )
         )
        }
        </div>

        <button
          type='button'
          className='btn-actions btn-add'
          onClick={() => addEducations()}
        >
          <FiPlus size={20} />
        </button>
          
          <input
          // onClick={(e) => console.log(register)}
          type='submit'
          className='button'
          value="Enviar"
          />
          
        </S.ContainerForm>
      </Modal>

      <Modal
        isOpen={modalIsOpenFilter}
        onRequestClose={closeModalFilter}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
      >
        <button
          className='react-modal-close'
          type='button'
          onClick={closeModalFilter}
        >
          <FiX />
        </button>

        <S.ContainerForm
          onSubmit={handleSubmit(handleFilterPosition)}
        >
          <h2>Filtros</h2>

          <label htmlFor="">Nome</label>
          <input
          type='text' placeholder='Nome'
          {...register('nome')}
          />

          <label htmlFor="">Descrição</label>
          <input
          type='text' placeholder='Descrição'
          {...register('desc')}
          />

          <label htmlFor="">Liderança</label>
          <select
            placeholder='Liderança'
            {...register('lideranca')}
            >
          <option hidden> Liderança </option>
          <option value={"true"}> Sim  </option>
          <option value={"false"}> Não </option>

          </select>

          <label htmlFor="">Código de ocupação</label>
          <select
          {...register('ocupationCodeBr')}
          >
            <option>
              Código Brasileiro de Ocupações
            </option>
          </select>

          <label htmlFor="">Código de ocupação conforme IR</label>
          <select
          {...register('ocupationCodeIR')}>
            <option>
              Código de Ocupação conforme IR
            </option>
          </select>

          <label htmlFor="">Aréa</label>
          <select
          {...register('areaId')}
          >
            <option hidden >Área</option>
            {
            allAreas.map(
              (area) => (
                <option key={area.id} value={area.id}>
                  {area.nome}
                </option>
              )
            )}
            
          </select>
          {/*
          <label htmlFor="">Cargos liderados</label>
          <select
          {...register('cargoLiderId')}
          >
            <option hidden>Cargos Liderados</option>
            {
            allCargos.map(
              (cargo) => (
                <option key={cargo.id} value={cargo.id}>
                  {cargo.nome}
                </option>
              )
            )
            }
          </select>

          <label htmlFor="">Habilidade</label>
          <select
          {...register('habilidadeId')}
          >
            <option hidden >Habilidade</option>
            {
              allSkills.map(
                (skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.nome}
                  </option>
                )
              )
            }
          </select>

           <label style={{ marginBottom: '5px', }} htmlFor="">Habilidades</label>
          <div className="border">
              <div className="return">
              <select
                onChange={(e) => setSkillsSelected(e.target.value)}
                >
                  <option hidden >Habilidades</option>
                  {
                    allSkills.map(
                      (skill) => (
                        <option key={skill.id} value={skill.id}>
                          {skill.nome}
                        </option>
                      )
                    )
                  }
                </select>
              </div>
          
          </div>

        <label style={{ marginBottom: '5px', }} htmlFor="">Desejaveis</label>
        <div className="border">
              <div className="return">
                <select
                onChange={(e) => setWantedSelected(e.target.value)}
                >
                  <option hidden >Desejaveis</option>
                  {
                    allSkills.map(
                      (skill) => (
                        <option key={skill.id} value={skill.id}>
                          {skill.nome}
                        </option>
                      )
                    )
                  }
                </select>
              </div>
        </div>

        <label style={{ marginBottom: '5px', }} htmlFor="">Funções</label>
        <div className="border">  
            <div className="return">
              <select
                onChange={(e) => setFunctionsSelected(e.target.value)}
              >
                <option hidden >Funções</option>
                {
                  allFunctions.map(
                    (afunction) => (
                      <option key={afunction.id} value={afunction.id}>
                        {afunction.nome}
                      </option>
                    )
                  )
                }
              </select>
            </div>
        </div>

        <label style={{ marginBottom: '5px', }} htmlFor="">Escolaridade</label>
        <div className="border">
            <div className="return">
              <select
                onChange={(e) => setEducationsSelected(e.target.value)}
              >
                <option hidden >Escolaridade</option>
                {
                  allEducations.map(
                    (education) => (
                      <option key={education.id} value={education.id}>
                        {education.nome}
                      </option>
                    )
                  )
                }
              </select>
            </div>
          </div> */}

          <input
            type='submit'
            className='button'
            value="Enviar"
          />
          
        </S.ContainerForm>
      </Modal>
    </>
  )
}
