import { FiEdit, FiEdit2, FiPlus, FiSettings, FiTrash2, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Sidebar from 'ui/components/Sidebar'
import * as S from './Questions.styled'
import { Switch } from 'antd'
import { useState } from 'react'
import Modal from 'react-modal'

interface PropsModal {
  title?: string;
  value?: string;
  valueModal?: number;
  titleConfig?: string;
  checkBoxTitle?: string;
  titleAvaliation?: string;
  to?: string;
}

export function Questions() {

  const [modalIsOpen, setIsOpen] = useState(false)
  const [activeKey, setActiveTabKey] = useState();

	const openModal = (activeKey:any) => {
		if (activeKey === 1) {
      setActiveTabKey(activeKey)
			setIsOpen(!modalIsOpen);
		} else if(activeKey === 2) {
      setActiveTabKey(activeKey)
      setIsOpen(!modalIsOpen);
    } else if (activeKey === 3) {
      setActiveTabKey(activeKey)
      setIsOpen(!modalIsOpen);
    } else if (activeKey === 4) {
      setActiveTabKey(activeKey)
      setIsOpen(true);
    } else if (activeKey === 5) {
      setActiveTabKey(activeKey)
      setIsOpen(true);
    }
	};

  function closeModal() {
    setIsOpen(false)
  }

  function Status() {
    const [isActiveColor, setIsActiveColor] = useState(false)

    function changeColor() {
      if (isActiveColor === false) {
        setIsActiveColor(true)
      } else {
        setIsActiveColor(false)
      }
    }

    return (
      <span
        onClick={changeColor}
        className={`${isActiveColor ? 'activeColor' : ''}`}
      />
    )
  }

  function TitleComponent({ title }: PropsModal) {
    return <h1>{title}</h1>
  }

  function InputComponent({ value }: PropsModal) {
    return (
      <>
        <label>{value}</label>
        <input placeholder={value} />
      </>
    )
  }

  function TextAreaComponente({value}: PropsModal) {
    return (
      <>
        <label>{value}</label>
        <textarea placeholder={value}></textarea>
      </>
    )
  }

  function ScoreComponent({titleAvaliation, to}: PropsModal) {
    return (
      <div>
        <div className="gridScore addBox">
          <span>{titleAvaliation}</span>
          <span>{to}</span>
          <div>
            <button><FiTrash2 /></button>
            <button onClick={() => openModal(5)}><FiEdit /></button>
          </div>
        </div>
      </div>
    )
  }

  function CheckBox({checkBoxTitle}: PropsModal) {
    return (
      <div>
        <input type="checkbox" />
        <small>{checkBoxTitle}</small>
      </div>
    )
  }

  function ConfigCheckTitle({titleConfig}: PropsModal) {
    return (
      <>
        <span>{titleConfig}</span>
      </>
    )
  }

  return (
    <>
      <S.Body>
        <Sidebar />
        <S.Title>
          <S.Container>
            <S.LinksScore>
              <div>
                <Status />
                <small>Avaliação</small>
              </div>

              <div>
                <Status />
                <small>Score</small>
              </div>

              <div>
                <Status />
                <small>Questionário</small>
              </div>

              <div>
                <Status />
                <small>Score</small>
              </div>

              <div>
                <Status />
                <small>Perguntas</small>
              </div>
            </S.LinksScore>
          </S.Container>
        </S.Title>

        <S.Container>
          <S.LinksContainer>
            <Link to='/cadastro-de-avaliacao'>Avaliação &gt;</Link>
            <Link to='/avaliacao'>Questionário &gt;</Link>
            <Link className='active-class' to='/perguntas'>Perguntas &gt;</Link>
            <Link to='/'>Resposta</Link>
          </S.LinksContainer>

          <S.FlexInit>
            <h2>Perguntas do Questionário 1</h2>

            <button onClick={() => openModal(1)}>
              <FiPlus /> Nova pergunta
            </button>
          </S.FlexInit>

          <div className='box-avaliacoes'>
            <span>...?</span>

            <div className='flex-configs'>
              <button onClick={() => openModal(2)} className='settings'>
                <FiSettings />
                <span>Configurar</span>
              </button>
              <button className='delete'>
                <FiTrash2 />
              </button>
              <button onClick={() => openModal(3)} className='edit'>
                <FiEdit2 />
              </button>
            </div>
          </div>

          <div className='box-avaliacoes'>
            <span>...?</span>
            <div className='flex-configs'>
              <button onClick={() => openModal(2)} className='settings'>
                <FiSettings />
                <span>Configurar</span>
              </button>
              <button className='delete'>
                <FiTrash2 />
              </button>
              <button onClick={() => openModal(3)} className='edit'>
                <FiEdit2 />
              </button>
            </div>
          </div>

          <div className='box-avaliacoes'>
            <span>...?</span>
            <div className='flex-configs'>
              <button onClick={() => openModal(2)} className='settings'>
                <FiSettings />
                <span>Configurar</span>
              </button>
              <button className='delete'>
                <FiTrash2 />
              </button>
              <button onClick={() => openModal(3)} className='edit'>
                <FiEdit2 />
              </button>
            </div>
          </div>
        </S.Container>
      </S.Body>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
      >
        <button
          type='button'
          onClick={closeModal}
          className='react-modal-close'
        >
          <FiX />
        </button>

        <S.ContainerForm
          // onSubmit={handleCreateNewTransaction}
        >
          
          {activeKey === 1 && (
						<div className='confgContainer'>
              <div className="flexBtn">
                <h2>Perguntas</h2>

                <button onClick={() => openModal(4)}><FiPlus /> Nova linha</button>
              </div>
              <InputComponent value='Sua pergunta...' />
              <InputComponent value='Peso da pergunta *%*' />
            </div>
					)}

          {activeKey === 2 && (
						<div className='confgContainer'>
              <TitleComponent title='Configurar' />
              <div className="flexBtn">
                <button onClick={() => openModal(4)}><FiPlus /> Novo</button>
              </div>

              <div className="gridScore">
                <span>Resposta</span>
                <span>Pontuação</span>
              </div>

              <ScoreComponent titleAvaliation='Baixo desempenho' to='50%' />
              <ScoreComponent titleAvaliation='Desempenho esperado' to='600 pontos' />
              <ScoreComponent titleAvaliation='Desempenho acima da média' to='100%' />
            </div >
					)}

          {activeKey === 3 && (
            <>
              <TitleComponent title='Editar avaliação ' />
              <InputComponent value='Titulo' />
            </>
          )}

          {activeKey === 4 && (
            <div className='confgContainer'>
              <TitleComponent title='Adicionar resposta' />
              <ConfigCheckTitle titleConfig='Resposta' />
              <div className="checkContainer">
                <CheckBox checkBoxTitle='Númerico' />
                <CheckBox checkBoxTitle='Não númerico' />
              </div>
              <InputComponent value='Pontuação' />
              <TextAreaComponente value='Titulo' />
            </div>
          )}

          {activeKey === 5 && (
            <>
              <TitleComponent title='Editar score' />
              <InputComponent value='Titulo' />
              <InputComponent value='De *%*' />
              <InputComponent value='Até *%*' />
            </>
          )}

          <button className='send' type='submit'>Cadastrar</button>
        </S.ContainerForm>
      </Modal>
    </>
  )
}
