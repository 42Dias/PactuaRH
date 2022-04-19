/* eslint-disable react/jsx-key */
import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEdit, FiTrash, FiX } from 'react-icons/fi'
import * as S from './Career.styled'
import { useEffect, useState } from 'react'
// import profissional from 'service/profissional/profissional'
import { fullName } from 'service/api'
import { iCargo, iNiveis } from 'types'

import planoCarreira from 'service/planoCarreira/planoCarreira'
import cargos from 'service/cargos/cargos'

export default function Career() {
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpen   , setIsOpen   ] = useState(false)
  const [allCareer     , setAllCareer] = useState<any>([])
  const [nome          , setNome     ] = useState<string>('')
  const [descricao     , setDescricao] = useState<string>('')
  const [cargo         , setCargo    ] = useState<string>('')
  const [allCargos     , setAllCargos] = useState<any>([])

  const [allNiveis     , setAllNiveis   ] = useState<iNiveis[]>([])
  const [allNiveisNew  , setAllNiveisNew] = useState<iNiveis[]>([])

  const [selectedCareer, setSelectedCareer] = useState<iNiveis>()
  const [index, setIndex] = useState<number>(0)
  
  // const [hasNiveis, setHasNiveis] = useState<boolean>(false)
  // const [dependentes, setDependentes] = useState<iDependent[]>([
  //   { nome: '', cpf: '', rg: '', dataNasc: '' },
  // ])
  // const [allPositions, setAllPositions] = useState<iCargo[]>([])

  /* 
==========================================================================================================
                                  SUBCRUD IN THE PAGE
==========================================================================================================
*/

  const addFormFields = () => {
    // @ts-ignore
    setAllNiveis([...allNiveis, { nome: '', descricao: '', cargo: [], nivel: 0 }])
  }

  const removeFormFields = (i: number) => {
    console.log(allNiveis[i])
    const newFormValues = [...allNiveis]
    newFormValues.splice(i, 1)
    setAllNiveis(newFormValues)
  }

  const handleChangeNiveis = (i: number, e: any) => {
    console.log('e')
    console.log(e.target.value)
    // console.log(i)
    const newFormValues = [...allNiveis]
    // console.log(newFormValues)
    // @ts-ignore
    newFormValues[i][e.target.name] = e.target.value
    console.log(newFormValues)
    setAllNiveis(newFormValues)
  }

/* 
==========================================================================================================
                                              MODALS
==========================================================================================================
*/
  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  async function openModalNew() {
    setIsOpenNew(true)
    await handleLoadCargos()
  }

  function closeModalNew() {
    setIsOpenNew(false)
  }

/* 
==========================================================================================================
                                              CRUD
==========================================================================================================
*/

  async function handleCreateCareer() {
    const data = {
      nome: nome,
      descricao: descricao,
      niveis: allNiveis,
    }

    console.log('data')
    console.log(data)

    const isCreated = await planoCarreira.create(data)

    if (!isCreated) return;
    closeModalNew()
    await handleLoadCareer()
  }

  async function handleLoadCareer() {
    const carreira = await planoCarreira.list()
    setAllCareer(carreira)
  }
  
 /* 
==========================================================================================================
                                            Associated Tables
==========================================================================================================
*/ 
  async function handleLoadCargos() {
    const cargo = await cargos.list()
    setAllCargos(cargo)
  }

  useEffect(() => {
    handleLoadCareer()

    handleLoadCargos()
  }, [])

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
          {allCareer.length > 0 && (
            <S.Table>
              <S.TrTitle>
                <td>Nome</td>
                <td>Descrição</td>
                <td>Niveis</td>
                <td></td>
              </S.TrTitle>
              {
              allCareer.map(
              (carrer: any) => (
                <S.TrSecond>
                  <td>{carrer?.nome}</td>
                  <td>{carrer?.descricao}</td>
                  <td>{carrer?.nivel?.lenght}</td>
                  <td>
                    <button onClick={() => {
                      openModal()
                      // setAllNiveis(carrer.nivel)
                      }}>
                      <FiEdit size={18} />
                    </button>
                  </td>
                  <td>
                    <button>
                      <FiTrash size={18} />
                    </button>
                  </td>
                </S.TrSecond>
                
              )
              )
              }
            </S.Table>
          )}{' '}
          {allCareer.length === 0 && <p>Não há dados</p>}
        </S.Container>
      </S.Body>

{/* 
==========================================================================================================
                                              Edit
==========================================================================================================
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

        <S.ContainerForm
          onSubmit={(e) => {
            e.preventDefault()
            handleCreateCareer()
          }}
        >
          <h2>Editar Plano de carreira</h2>

          <input
            type='text'
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome'
            defaultValue={selectedCareer?.nome}
          />

          <input
            type='text'
            onChange={(e) => setDescricao(e.target.value)}
            placeholder='Descrição'
            defaultValue={selectedCareer?.descricao}
          />

          {allNiveis.length > 0 && (
            <>
              {allNiveis.map((e: any, index: any) => (
                <div className='border'>
                  <br />
                  <hr />
                  <br />
                  <input
                    type='text'
                    placeholder='Nome do Nivel'
                    name='nome'
                    onChange={(e) => handleChangeNiveis(index, e)}
                  />

                  <input
                    type='text'
                    placeholder='Descrição'
                    name='descricao'
                    onChange={(e) => handleChangeNiveis(index, e)}
                  />

                  <input
                    type='number'
                    placeholder='Nivel'
                    name='nivel'
                    onChange={(e) => handleChangeNiveis(index, e)}
                  />

                  <S.SelectPai
                    onChange={(e) => {
                      // setCargo(e.target.value)
                      console.log(e.target.value)
                      // @ts-ignore
                      handleChangeNiveis(index, e)
                    }}
                    placeholder='Nome do cargo'
                    value={cargo}
                    name='cargo'
                    id="cargo"
                  >
                    {allCargos.map((value: any, i: any) => (
                      <S.OptionsPai key={i} value={value.id}>
                        {value.nome}
                      </S.OptionsPai>
                    ))}
                  </S.SelectPai>

                  <button
                    className='btn-actions btn-trash'
                    type='button'
                    onClick={() => removeFormFields(index)}
                  >
                    <FiTrash />
                  </button>
                </div>
              ))}
            </>
          )}
          <button
            type='button'
            className='btn-actions'
            onClick={() => addFormFields()}
          >
            <FiPlus />
          </button>
          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>

{/* 
==========================================================================================================
                                            Create
==========================================================================================================
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

        <S.ContainerForm
          onSubmit={(e) => {
            e.preventDefault()
            handleCreateCareer()
          }}
        >
          <h2>Cadastrar Plano de carreira</h2>

          <input
            type='text'
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome'
          />

          <input
            type='text'
            onChange={(e) => setDescricao(e.target.value)}
            placeholder='Descrição'
          />

          {allNiveis.length > 0 && (
            <>
              {allNiveis.map((e: any, index: any) => (
                <div className='border'>
                  <br />
                  <hr />
                  <br />
                  <input
                    type='text'
                    placeholder='Nome do Nivel'
                    name='nome'
                    onChange={(e) => handleChangeNiveis(index, e)}
                  />

                  <input
                    type='text'
                    placeholder='Descrição'
                    name='descricao'
                    onChange={(e) => handleChangeNiveis(index, e)}
                  />

                  <input
                    type='number'
                    placeholder='Nivel'
                    name='nivel'
                    onChange={(e) => handleChangeNiveis(index, e)}
                  />

                  <S.SelectPai
                    onChange={(e) => {
                      // setCargo(e.target.value)
                      console.log(e.target.value)
                      // @ts-ignore
                      handleChangeNiveis(index, e)
                    }}
                    placeholder='Nome do cargo'
                    value={cargo}
                    name='cargo'
                    id="cargo"
                  >
                    {allCargos.map((value: any, i: any) => (
                      <S.OptionsPai key={i} value={value.id}>
                        {value.nome}
                      </S.OptionsPai>
                    ))}
                  </S.SelectPai>

                  <button
                    className='btn-actions btn-trash'
                    type='button'
                    onClick={() => removeFormFields(index)}
                  >
                    <FiTrash />
                  </button>
                </div>
              ))}
            </>
          )}
          <button
            type='button'
            className='btn-actions'
            onClick={() => addFormFields()}
          >
            <FiPlus />
          </button>
          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
