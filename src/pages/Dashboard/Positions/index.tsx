// n cargos - 1 benefício

import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX } from 'react-icons/fi'
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

import { iData } from '../../../types'
import { useForm } from 'react-hook-form'

export default function Positions() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>()



  // const { allCargos } = useCargos()
  const [allCargos    , setAllCargos    ] = useState<iData[]>([])
  const [allAreas     , setAllAreas     ] = useState<iData[]>([])
  const [allEducations, setAllEducations] = useState<iData[]>([])
  const [allFunctions , setAllFunctions ] = useState<iData[]>([])
  const [allSkills    , setAllSkills    ] = useState<iData[]>([])
  
  const [skills       , setSkills       ] = useState([ { id: '' } ])

  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
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

  // Loads all tables associated
  async function handleLoadAssociations() {
    handleLoadArea()
    handleLoadEducation()
    handleLoadFunctions()
    handleLoadSkills()
  }

  async function handleLoadPosition() {
    const cargo = await cargos.list()

    console.log('cargos')
    console.log(cargo)

    setAllCargos(cargo)
  }


  async function handleCreatePosition(rawData: any){
    let data = {
      nome: rawData.desc,
      area: rawData.areaId,
      ecolaridade: rawData.id,
      habilidade: rawData.habilidadeId,

      // Estes três são tabelas separadas aaaaaaaa, como listas n:m 
      cargosLiderados: rawData.cargoLiderId,
      desejaveis: rawData.desejavelId,
      funcoes: rawData.funcaoId,
      habilidades: rawData.habilidadesId,
    }  
    console.log(data)
    
  }

  async function handleUpdatePosition(id: string){
    console.log("test")
  }

  async function handleDeletePosition(id: string){
    console.log("test")
  }


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



  let handleChangeSkills = (i: number, id: string) => {
    let newFormValues = [...skills];
    //@ts-ignore
    newFormValues[i].id = id;

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



  return (
    <>
      <S.Body>
        <Sidebar />
        <S.Title>
          <S.Container>Bem vindo, {fullName} 😁</S.Container>
        </S.Title>
        <S.Container>
          <S.FlexButtons>
            <button onClick={openModalNew}>
              Novo <FiPlus size={18} color='#fff' />
            </button>
          </S.FlexButtons>
          {/* TABELA */}
          {allCargos.length > 0 && (
            <S.Table>
              <S.TrTitle>
                <td>Descrição</td>
                <td>CBO</td>
                <td>Nível Hierarquico</td>
              </S.TrTitle>
              <S.TrSecond>
                <td>Ryan</td>
                <td>123</td>
                <td>Gerente</td>
                <td>
                  <button onClick={openModal}>
                    <FiEdit size={18} />
                  </button>
                </td>
                <td>
                  <button>
                    <FiTrash size={18} />
                  </button>
                </td>
              </S.TrSecond>
            </S.Table>
          )}
          {allCargos.length == 0 && <p>Nenhum cargo cadastrado!</p>}
        </S.Container>
      </S.Body>

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
          // onSubmit={ handleSubmit(handleCreatePosition) }
          onSubmit={handleSubmit(handleCreatePosition)}
        >
          <h2>Cadastrar Cargo</h2>

          
          <input
          type='text' placeholder='Descrição'
          {...register('desc')}
          />
          <input
          type='text' placeholder='Descrição oficial'
          // onChange={() => console.log(register)}
          {...register('descOfc')}
          />

          <select
          {...register('ocupationCodeBr')}
          >
            <option>
              Código Brasileiro de Ocupações
            </option>
          </select>
          <select
          {...register('ocupationCodeIR')}>
            <option>
              Código de Ocupação conforme IR
            </option>
          </select>
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

          {
          skills.map(
            (skill, index) => (
              <div className="border">
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
          className='btn-actions'
          onClick={() => addSkills()}
          >
            <FiPlus/>
          </button>



          <select
          {...register('desejavelId')}
          >
            {/* Habilidade */}
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
          <select
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
          </select>
          <select
          
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
          </select>
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

          
          <input
          type='text' placeholder='Descrição'
          {...register('desc')}
          />
          <input
          type='text' placeholder='Descrição oficial'
          // onChange={() => console.log(register)}
          {...register('descOfc')}
          />

          <select
          {...register('ocupationCodeBr')}
          >
            <option>
              Código Brasileiro de Ocupações
            </option>
          </select>
          <select
          {...register('ocupationCodeIR')}>
            <option>
              Código de Ocupação conforme IR
            </option>
          </select>
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

          {
          skills.map(
            (skill, index) => (
              <div className="border">
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
          className='btn-actions'
          onClick={() => addSkills()}
          >
            <FiPlus/>
          </button>



          <select
          {...register('desejavelId')}
          >
            {/* Habilidade */}
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
          <select
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
          </select>
          <select
          
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
          </select>
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
    </>
  )
}
