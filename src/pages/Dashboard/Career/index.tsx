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
  const [modalIsOpen, setIsOpen] = useState(false)
  const [allCareer, setAllCareer] = useState<any>([])
  const [nome, setNome] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')

  const [cargo, setCargo] = useState<string>('')
  const [allCargos, setAllCargos] = useState<any>([])

  // const [hasNiveis, setHasNiveis] = useState<boolean>(false)
  const [allNiveis, setNiveis] = useState<iNiveis[]>([])

  // const [dependentes, setDependentes] = useState<iDependent[]>([
  //   { nome: '', cpf: '', rg: '', dataNasc: '' },
  // ])

  // const [allPositions, setAllPositions] = useState<iCargo[]>([])
  const [index, setIndex] = useState<number>(0)

  const addFormFields = () => {
    // @ts-ignore
    setNiveis([...allNiveis, { nome: '', descricao: '', cargo: [], nivel: 0 }])
  }

  const removeFormFields = (i: number) => {
    console.log(allNiveis[i])
    const newFormValues = [...allNiveis]
    newFormValues.splice(i, 1)
    setNiveis(newFormValues)
  }

  const handleChangeNiveis = (i: number, e: any) => {
    console.log('e')
    // console.log(i)
    console.log(e.target.value)
    const newFormValues = [...allNiveis]
    // console.log(newFormValues)
    // @ts-ignore
    newFormValues[i][e.target.name] = e.target.value
    console.log(newFormValues)
    setNiveis(newFormValues)
  }

  // const handleChangeNiveis2 = (i: number, e: any) => {
  //   console.log('e')
  //   const newFormValues = [...allNiveis]
  //   console.log(newFormValues)
  //   console.log(e)
  //   newFormValues[i].cargo = e
  //   console.log(e)
  //   setNiveis(newFormValues)
  // }

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

  async function handleCreateCareer() {
    const data = {
      nome: nome,
      descricao: descricao,
      niveis: allNiveis,
    }

    console.log('data')
    console.log(data)

    const isCreated = await planoCarreira.create(data)

    if (isCreated) closeModalNew()
    await handleLoadCareer()
  }

  async function handleLoadCareer() {
    const carreira = await planoCarreira.list()
    setAllCareer(carreira)
  }

  async function handleLoadCargos() {
    const cargo = await cargos.list()
    setAllCargos(cargo)
    console.log(allCargos)
  }

  useEffect(() => {
    handleLoadCareer()
  }, [])

  // useEffect(() => {
  //   handleLoadCargos()
  // }, [])
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
              </S.TrTitle>
              <S.TrSecond>
                <td>Ryan</td>
                <td>049.253.142-45</td>
                <td>55.432.123-9</td>
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
          )}{' '}
          {allCareer.length === 0 && <p>Não há dados</p>}
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

        <S.ContainerForm>
          <h2>Editar profissional</h2>

          <input
            type='text'
            onChange={(e) => setNome(e.target.value)}
            placeholder='nome'
          />
          <input
            type='text'
            onChange={(e) => setDescricao(e.target.value)}
            placeholder='Descrição'
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
                      handleChangeNiveis(index, 'select' + e)
                    }}
                    placeholder='Nome do cargo'
                    value={cargo}
                    name='cargo'
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
