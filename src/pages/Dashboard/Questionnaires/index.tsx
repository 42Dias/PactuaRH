import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEdit, FiTrash, FiX, FiFilter } from 'react-icons/fi'
import * as S from './Questionnaires.styled'
import { useEffect, useState } from 'react'
import { fullName } from 'service/api'
import questionarios from 'service/questionarios/questionarios'
// @ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { iQuestoes } from 'types'
import { AiFillQuestionCircle } from 'react-icons/ai'
import { SiBitcoinsv } from 'react-icons/si'

export default function Questionnaires() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalIsOpenNew, setIsOpenNew] = useState(false)
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false)

  const [modalIsOpenQuestion, setIsOpenQuestion] = useState(false)
  const [questionario, setQuestionario] = useState([])
  const [id, setId] = useState('')
  const [nome, setNome] = useState('')
  // const [tipoResposta, setTipoResposta] = useState('')
  const [allQuestoes, setAllQuestoes] = useState<iQuestoes[]>([])
  const [allQuestoesNew, setAllQuestoesNew] = useState<iQuestoes[]>([])
  const [selectedQuestao, setSelectedQuestao] = useState<iQuestoes>()

  const [obrigatorio, setObrigatorio] = useState<boolean>(false)

  const addFormFields = () => {
    // @ts-ignore
    setAllQuestoes([
      // @ts-ignore
      ...allQuestoes,
      // @ts-ignore
      {
        nome: '',
        pergunta: '',
        tipoDeResposta: '',
        obrigatorio: false,
        tipo: '',
      },
    ])
  }

  const removeFormFields = (i: number) => {
    const newFormValues = [...allQuestoes]
    newFormValues.splice(i, 1)
    setAllQuestoes(newFormValues)
  }

  const handleChangeQuestoes = (i: number, e: any) => {
    const newFormValues = [...allQuestoes]
    // @ts-ignore
    newFormValues[i][e.target.name] = e.target.value
    setAllQuestoes(newFormValues)
  }
  const addFormFieldsNew = () => {
    // @ts-ignore
    setAllQuestoesNew([
      // @ts-ignore
      ...allQuestoesNew,
      // @ts-ignore
      {
        nome: '',
        pergunta: '',
        tipoDeResposta: '',
        obrigatorio: false,
        tipo: '',
      },
    ])
  }

  const handleChangeQuestoesNew = (i: number, e: any) => {
    const newFormValues = [...allQuestoesNew]

    // @ts-ignore
    newFormValues[i][e.target.name] = e.target.value

    // console.log(newFormValues)
    setAllQuestoesNew(newFormValues)
  }

  const removeFormFieldsNew = (i: number) => {
    // console.log(dependentesNew[i])
    const newFormValues = [...allQuestoesNew]
    newFormValues.splice(i, 1)
    setAllQuestoesNew(newFormValues)
  }

  async function handleSetQuestionarioEditValues(questionario: any) {
    setAllQuestoes(questionario.perguntas)
    setSelectedQuestao(questionario)
    setNome(questionario.nome)
  }

  function openModal() {
    setIsOpen(true)
    console.log(selectedQuestao)
  }

  function openModalFilter() {
    setIsOpenFilter(true)
  }

  function closeModalFilter() {
    setIsOpenFilter(false)
  }

  function closeModal() {
    setIsOpen(false)
    setNome('')
    setAllQuestoes([
      // @ts-ignore
      {
        nome: '',
        pergunta: '',
        tipoDeResposta: '',
        obrigatorio: false,
        tipo: '',
      },
    ])
    setAllQuestoesNew([
      // @ts-ignore
      {
        nome: '',
        pergunta: '',
        tipoDeResposta: '',
        obrigatorio: false,
        tipo: '',
      },
    ])
  }

  function openModalNew() {
    setIsOpenNew(true)
  }

  function closeModalNew() {
    setIsOpenNew(false)
    setNome('')
    // setTipoResposta('')
  }

  // function openModalQuestion() {
  //   setIsOpenQuestion(true)
  //   setIsOpenNew(false)
  // }

  // function closeModalQuestion() {
  //   setIsOpenQuestion(false)
  // }

  async function handleLoadQuestionario() {
    const allQuestionario = await questionarios.list()

    setQuestionario(allQuestionario)
  }

  async function handleCreate() {
    const data = {
      nome: nome,
      // tipoResposta: tipoResposta,
      perguntas: allQuestoes,
    }

    const isCreated = await questionarios.create(data)

    if (isCreated) closeModalNew()
    await handleLoadQuestionario()
  }

  async function handleUpdate() {
    const id = selectedQuestao?.id
    const data = {
      nome: nome,
      // tipoResposta: tipoResposta,
      perguntas: allQuestoes,
      perguntasNew: allQuestoesNew,
    }

    const isUpdated = await questionarios.update(id, data)

    if (isUpdated) closeModal()

    await handleLoadQuestionario()
  }

  useEffect(() => {
    handleLoadQuestionario()
  }, [])

  async function handleDelete(id: string) {
    await questionarios.delete(id)

    handleLoadQuestionario()
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
              <button onClick={openModalFilter}>
                Filtros
                <FiFilter size={18} />
              </button>
            </div>

            <ReactHTMLTableToExcel
              table='questionarios'
              filename='Pactua Questionario Excel'
              sheet='Sheet'
              buttonText='Exportar para excel'
            />
          </S.FlexButtons>
          {questionario.length > 0 && (
            <S.Table id='questionarios'>
              <S.TrTitle>
                <td>Nome</td>
                <td>Score</td>
                <td>Perguntas</td>
                <td></td>
                <td></td>
              </S.TrTitle>


              {questionario.map((value: any, index) => (
                <S.TrSecond key={index}>
                  <td>{value.nome}</td>

                  <td>
                    <a href={`/questionario-score/${value.id}`} className="anchor-icon" > 
                       <SiBitcoinsv size={23} /> 
                       </a>
                    </td>
                  <td>
                    <a href={`/questionario-perguntas/${value.id}`} className="anchor-icon" > 
                      <AiFillQuestionCircle size={23} />
                      </a>
                  </td>

                  <td>
                    <button
                      onClick={() => {
                        handleSetQuestionarioEditValues(value)
                        openModal()
                      }}
                    >
                      <FiEdit size={18} />
                    </button>
                  </td>

                  <td>
                    <button onClick={() => handleDelete(value.id)}>
                      <FiTrash size={18} />
                    </button>
                  </td>
                </S.TrSecond>
              ))}
            </S.Table>
          )}

          {questionario.length === 0 && <p>Não há dados!</p>}
        </S.Container>
      </S.Body>

      {/* EDIT */}
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
            handleUpdate()
          }}
        >
          <h2>Editar questionário</h2>

          <label htmlFor=''>Nome</label>

          <input
            type='text'
            placeholder='Nome'
            onChange={(e) => setNome(e.target.value)}
            defaultValue={selectedQuestao?.nome}
          />

          {/* <label htmlFor=''>Tipo de resposta</label>
          <input
            type='text'
            placeholder='Tipo de resposta'
            onChange={(e) => setTipoResposta(e.target.value)}
          /> */}

          {allQuestoes.length > 0 && (
            <>
              {allQuestoes.map((e: any, index: any) => (
                <div className='border'>
                  <br />
                  <br />
                  <label htmlFor=''>Nome da questão</label>
                  <input
                    type='text'
                    placeholder='Nome da questão'
                    name='nome'
                    defaultValue={e.nome}
                    onChange={(e) => handleChangeQuestoes(index, e)}
                  />

                  <label htmlFor=''>Pergunta</label>
                  <input
                    type='text'
                    placeholder='Pergunta'
                    name='pergunta'
                    defaultValue={e.pergunta}
                    onChange={(e) => handleChangeQuestoes(index, e)}
                  />

                  <label htmlFor=''>Tipo de resposta</label>
                  <input
                    type='text'
                    placeholder='Tipo de Resposta'
                    name='tipoDeResposta'
                    defaultValue={e.tipoDeResposta}
                    onChange={(e) => handleChangeQuestoes(index, e)}
                  />

                  <S.divCheck>
                    {obrigatorio
? (
                      <S.Checkbox
                        type='checkbox'
                        placeholder='Obrigatório?'
                        id='obrigatorio'
                        checked={true}
                        onChange={(e) => setObrigatorio(e.target.checked)}
                      />
                    )
: (
                      <S.Checkbox
                        type='checkbox'
                        placeholder='Obrigatório?'
                        id='obrigatorio'
                        onChange={(e) => setObrigatorio(e.target.checked)}
                      />
                    )}
                    <S.Label htmlFor='obrigatorio'>Obrigatório?</S.Label>
                  </S.divCheck>

                  <label htmlFor=''>Tipo</label>
                  <input
                    type='text'
                    placeholder='Tipo'
                    name='tipo'
                    defaultValue={e.tipo}
                    onChange={(e) => handleChangeQuestoes(index, e)}
                  />

                  <button
                    className='btn-actions btn-trash'
                    type='button'
                    onClick={() => removeFormFields(index)}
                  >
                    <FiTrash />
                  </button>
                </div>
              ))}

              {/* <button type='button' onClick={addFormFields}>
                <FiPlus />
              </button> */}
            </>
          )}

          {allQuestoesNew.length > 0 && (
            <>
              {allQuestoesNew.map((e: any, index: any) => (
                <div className='border'>
                  <br />
                  <br />
                  <label htmlFor=''>Nome da questão</label>
                  <input
                    type='text'
                    placeholder='Nome da questão'
                    name='nome'
                    defaultValue={e.nome}
                    onChange={(e) => handleChangeQuestoesNew(index, e)}
                  />

                  <label htmlFor=''>Pergunta</label>
                  <input
                    type='text'
                    placeholder='Pergunta'
                    name='pergunta'
                    defaultValue={e.pergunta}
                    onChange={(e) => handleChangeQuestoesNew(index, e)}
                  />

                  <label htmlFor=''>Tipo de resposta</label>
                  <input
                    type='text'
                    placeholder='Tipo de Resposta'
                    name='tipoDeResposta'
                    defaultValue={e.tipoDeResposta}
                    onChange={(e) => handleChangeQuestoesNew(index, e)}
                  />

                  <S.divCheck>
                    {obrigatorio
? (
                      <S.Checkbox
                        type='checkbox'
                        placeholder='Obrigatório?'
                        id='obrigatorio'
                        checked={true}
                        onChange={(e) => setObrigatorio(e.target.checked)}
                      />
                    )
: (
                      <S.Checkbox
                        type='checkbox'
                        placeholder='Obrigatório?'
                        id='obrigatorio'
                        onChange={(e) => setObrigatorio(e.target.checked)}
                      />
                    )}
                    <S.Label htmlFor='obrigatorio'>Obrigatório?</S.Label>
                  </S.divCheck>

                  <label htmlFor=''>Tipo</label>
                  <input
                    type='text'
                    placeholder='Tipo'
                    name='tipo'
                    defaultValue={e.tipo}
                    onChange={(e) => handleChangeQuestoesNew(index, e)}
                  />

                  <button
                    className='btn-actions btn-trash'
                    type='button'
                    onClick={() => removeFormFieldsNew(index)}
                  >
                    <FiTrash />
                  </button>
                </div>
              ))}
            </>
          )}

          <S.ContainerBntFlex>
            <button type='button' onClick={addFormFieldsNew}>
              <FiPlus />
            </button>
            <button type='submit'>Enviar</button>
          </S.ContainerBntFlex>
        </S.ContainerForm>
      </Modal>

      {/* CREATE */}
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
            handleCreate()
          }}
        >
          <h2>Cadastrar questionário</h2>

          <label htmlFor=''>Nome</label>

          <input
            type='text'
            placeholder='Nome'
            onChange={(e) => setNome(e.target.value)}
          />

          {/* <label htmlFor=''>Tipo de resposta</label>
          <input
            type='text'
            placeholder='Tipo de resposta'
            onChange={(e) => setTipoResposta(e.target.value)}
          /> */}

          {allQuestoes.length > 0 && (
            <>
              {allQuestoes.map((e: any, index: any) => (
                <div className='border'>
                  <br />
                  <br />
                  <label htmlFor=''>Nome da questão</label>
                  <input
                    type='text'
                    placeholder='Nome da questão'
                    name='nome'
                    onChange={(e) => handleChangeQuestoes(index, e)}
                  />

                  <label htmlFor=''>Pergunta</label>
                  <input
                    type='text'
                    placeholder='Pergunta'
                    name='pergunta'
                    onChange={(e) => handleChangeQuestoes(index, e)}
                  />

                  <label htmlFor=''>Tipo de resposta</label>
                  <input
                    type='text'
                    placeholder='Tipo de Resposta'
                    name='tipoDeResposta'
                    onChange={(e) => handleChangeQuestoes(index, e)}
                  />

                  <S.divCheck>
                    {obrigatorio
? (
                      <S.Checkbox
                        type='checkbox'
                        placeholder='Obrigatório?'
                        id='obrigatorio'
                        checked={true}
                        onChange={(e) => setObrigatorio(e.target.checked)}
                      />
                    )
: (
                      <S.Checkbox
                        type='checkbox'
                        placeholder='Obrigatório?'
                        id='obrigatorio'
                        onChange={(e) => setObrigatorio(e.target.checked)}
                      />
                    )}
                    <S.Label htmlFor='obrigatorio'>Obrigatório?</S.Label>
                  </S.divCheck>

                  <label htmlFor=''>Tipo</label>
                  <input
                    type='text'
                    placeholder='Tipo'
                    name='tipo'
                    onChange={(e) => handleChangeQuestoes(index, e)}
                  />

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

          <S.ContainerBntFlex>
            <button type='button' onClick={addFormFields}>
              <FiPlus />
            </button>
            <button type='submit'>Enviar</button>
          </S.ContainerBntFlex>
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
          onSubmit={(e) => {
            e.preventDefault()
            handleCreate()
          }}
        >
          <h2>Filtros</h2>

          <label htmlFor=''>Nome</label>
          <input
            type='text'
            placeholder='Nome'
            onChange={(e) => setNome(e.target.value)}
          />

          {/* <label htmlFor=''>Tipo de resposta</label>
          <input
            type='text'
            placeholder='Tipo de resposta'
            onChange={(e) => setTipoResposta(e.target.value)}
          /> */}
          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>

      {/* <Modal
        isOpen={modalIsOpenQuestion}
        onRequestClose={closeModalQuestion}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
      >
        <button
          className='react-modal-close'
          type='button'
          onClick={closeModalQuestion}
        >
          <FiX />
        </button>

        <S.ContainerForm>
          <h2>Pergunta</h2>

          <label htmlFor="">Pergunta</label>
          <input type='text' placeholder='Pergunta' />

          <label htmlFor="">Tipo de resposta esperada</label>
          <select>
            <option>Texto</option>
            <option>Sim/Não</option>
          </select>

          <label htmlFor="">Tem pergunta adicional para sim?</label>
          <select>
            <option>Não</option>
            <option>Sim</option>
          </select>

          <label htmlFor="">Tem pergunta adicional para não?</label>
          <select>
            <option>Não</option>
            <option>Sim</option>
          </select>

          <button>Enviar</button>
        </S.ContainerForm>
      </Modal> */}
    </>
  )
}
