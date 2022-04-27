import Sidebar from 'ui/components/Sidebar'
import Modal from 'react-modal'
import { FiPlus, FiEye, FiEdit, FiTrash, FiX, FiFilePlus, FiFilter } from 'react-icons/fi'
import * as S from './Area.styled'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import areas from 'service/area/area'
import { fullName } from 'service/api'
// @ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

export default function Area() {
  const [modalIsOpen    ,setIsOpen   ] = useState(false)
  const [modalIsOpenNew ,setIsOpenNew] = useState(false)
  const [modalIsOpenFilter ,setIsOpenFilter] = useState(false)
  const [nome           ,setNome     ] = useState<string>('')
  const [descricao      ,setDescricao] = useState<string>('')
  const [subArea        ,setSubArea  ] = useState<boolean>(false)
  const [areaPai        ,setAreaPai  ] = useState<string>('')


  const [nomeFilter           ,setNomeFilter     ] = useState<string>('')
  const [descricaoFilter      ,setDescricaoFilter] = useState<string>('')
  const [subAreaFilter        ,setSubAreaFilter  ] = useState<boolean>(false)
  const [areaPaiFilter        ,setAreaPaiFilter  ] = useState<string>('')


  const [id             , setId      ] = useState<string>('')
  const [area           , setArea    ] = useState([])

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setSubArea(false)
    setAreaPai('')
    setIsOpen(false)
  }

  function openModalNew() {
    setIsOpenNew(true)
  }

  function closeModalNew() {
    setSubArea(false)
    setAreaPai('')
    setIsOpenNew(false)
  }

  function openModalFilter() {
    setIsOpenFilter(true)
  }

  function closeModalFilter() {
    setIsOpenFilter(false)

    setNomeFilter('')
    setDescricaoFilter('')
    setAreaPaiFilter('')
  }

  async function handleLoadArea() {
    const allArea = await areas.list()

    setArea(allArea)
  }

  async function handleCreate() {
    const data = {
      nome: nome,
      descricao: descricao,
      subarea: subArea,
      areaPai: areaPai,
    }

    const isCreated = await areas.create(data)

    if (isCreated) closeModalNew()
    await handleLoadArea()
  }

  async function handleUpdate(id: string) {
    const data = {
      nome: nome,
      descricao: descricao,
      subarea: subArea,
      areaPai: areaPai,
    }

    const isUpdated = await areas.update(id, data)

    if (isUpdated) closeModal()
    await handleLoadArea()
  }

  useEffect(() => {
    handleLoadArea()
  }, [])
  async function handleDelete(id: string) {
    await areas.delete(id)

    handleLoadArea()
  }

/* 
==========================================================================================================
                                            Filters
==========================================================================================================
*/ 

  async function handleFilterArea(){
    let filter = ''

    if (nomeFilter){
      console.log("tem nome")
      if(filter.length != 0 ) filter += '&'
      filter += `filter%5Bnome%5D=${nomeFilter}`
    }
    if (descricaoFilter){
      console.log("tem desc")

      if(filter.length != 0 ) filter += '&'
      filter += `filter%5Bdescricao%5D=${descricaoFilter}`
      
    }
    if (subAreaFilter){
      console.log("tem sub")

      if(filter.length != 0 ) filter += '&'
      filter += `filter%5BsubArea%5D=${subArea}`
    }
    if (areaPaiFilter){
      console.log("tem pai")

      if(filter.length != 0 ) filter += '&'
      filter += `filter%5BareaPai%5D=${areaPaiFilter}`
    }

    let areaFilted = await areas.listWithManyFilters(filter)

    setArea(areaFilted)

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
              <button onClick={openModalFilter}>
                Filtros
                <FiFilter size={18} />
              </button>
            </div>

            <ReactHTMLTableToExcel
              table="area"
              filename="Pactua Área Excel"
              sheet="Sheet"
              buttonText="Exportar para excel"
           />
          </S.FlexButtons> 
           {/*<button>
              Exportar para excel
              <FiFilePlus size={18} />
            </button>
          </S.FlexButtons>*/}

          {area.length > 0 && (
            <S.Table id="area">
              <S.TrTitle>
                <td>Nome do área</td>
                <td>Descrição</td>
              </S.TrTitle>

              {area.map((area: any, index) => (
                <S.TrSecond key={index}>
                  <td>{area.nome}</td>

                  <td>{area.descricao}</td>
                  <td>
                    <button
                      onClick={() => {
                        setId(area.id)
                        setNome(area.nome)
                        setSubArea(area.subarea)
                        setAreaPai(area.areaPaiId)
                        console.log(area)
                        openModal()
                      }}
                    >
                      <FiEdit size={18} />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(area.id)}>
                      <FiTrash size={18} />
                    </button>
                  </td>
                </S.TrSecond>
              ))}
            </S.Table>
          )}

          {area.length === 0 && <p>Não há Dados</p>}
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

        <S.ContainerForm
          onSubmit={(e) => {
            e.preventDefault()
            handleUpdate(id)
          }}
        >
          <h2>Editar área</h2>
          <input
            type='text'
            placeholder='Nome da área'
            defaultValue={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type='text'
            placeholder='Descrição'
            defaultValue={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <S.divCheck>
            {subArea ? (
              <S.Checkbox
                type='checkbox'
                placeholder='Sub-Área?'
                id='subarea'
                checked={true}
                onChange={(e) => setSubArea(e.target.checked)}
              />
                ) : (
              <S.Checkbox
                type='checkbox'
                placeholder='Sub-Área?'
                id='subarea'
                onChange={(e) => setSubArea(e.target.checked)}
              />
                )}
            <S.Label htmlFor='subarea'>Sub-Área</S.Label>
          </S.divCheck>

          {subArea === true && (
            <S.SelectPai
              onChange={(e) => {
                setAreaPai(e.target.value)
                console.log(area)
              }}
              placeholder='Nome da área pai'
              value={areaPai}
            >
              {area.map((value: any, index) => (
                <S.OptionsPai key={index} value={value.id}>
                  {value.nome}
                </S.OptionsPai>
              ))}
            </S.SelectPai>
          )}

          <button type='submit'>Enviar</button>
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
            handleCreate()
          }}
        >
          <h2>Cadastrar área</h2>
          
          <label htmlFor="">Nome da área</label>
          <input
            type='text'
            onChange={(e) => setNome(e.target.value)}
            placeholder='Nome da área'
            required
          />

          <label htmlFor="">Descrição da área</label>
          <input
            type='text'
            onChange={(e) => setDescricao(e.target.value)}
            placeholder='Descrição'
            required
          />
          <S.divCheck>
            <S.Checkbox
              type='checkbox'
              placeholder='Sub-Área?'
              id='subarea'
              checked={!!subArea}
              onChange={(e) => setSubArea(e.target.checked)}
            />
            <S.Label htmlFor='subarea'>Sub-Área</S.Label>
          </S.divCheck>
          {subArea === true && (
            <S.SelectPai
              onChange={(e) => {
                setAreaPai(e.target.value)
                console.log(area)
              }}
              placeholder='Nome da área pai'
              value={areaPai}
            >
              {area.map((value: any, index) => (
                <S.OptionsPai key={index} value={value.id}>
                  {value.nome}
                </S.OptionsPai>
              ))}
            </S.SelectPai>
          )}
          <button type='submit'>Enviar</button>
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
            handleFilterArea()
          }}
        >
          <h2>Filtros</h2>
          
          <label htmlFor="">Nome da área</label>
          <input
            type='text'
            onChange={(e) => setNomeFilter(e.target.value)}
            placeholder='Nome da área'
          />

          {/*
          <select>
            <option>oi</option>
          </select>
          */}

          <label htmlFor="">Descrição da área</label>
          <input
            type='text'
            onChange={(e) => setDescricaoFilter(e.target.value)}
            placeholder='Descrição'
          />

          {/*
          <S.divCheck>
            <S.Checkbox
              type='checkbox'
              placeholder='Sub-Área?'
              id='subarea'
              checked={!!subArea}
              onChange={(e) => setSubAreaFilter(e.target.checked)}
            />
            <S.Label htmlFor='subarea'>Sub-Área</S.Label>
          </S.divCheck>
          */}
            <S.SelectPai
              onChange={(e) => {
                setAreaPaiFilter(e.target.value)
                console.log(areaPaiFilter)
              }}
              placeholder='Nome da área pai'
              value={areaPai}
            >
              {area.map((value: any, index) => (
                <S.OptionsPai key={index} value={value.id}>
                  {value.nome}
                </S.OptionsPai>
              ))}
            </S.SelectPai>
          <button type='submit'>Enviar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
