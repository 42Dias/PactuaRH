import { Link } from 'react-router-dom'


import * as S from './Plans.styled';
import Sidebar from 'ui/components/Sidebar'
import {setaesquerda} from 'assets'
import {cubo} from 'assets'

export default function Plans() {
    return(
       <S.Body>
      <Sidebar />
      <S.Title>
        <S.Container>Planos</S.Container>
      </S.Title>
      <S.Container>
        <Link to='/dashboard'>
           <img src={setaesquerda} alt='Back Image'/>
           </Link>
            
      
          <S.ContainerPlans>
          <div> 
          <img src={cubo} alt='Back Image' className='planos-icon'/>
          <h2>Básico</h2>
          <br/>
            <h3> Grátis </h3>
            </div>

            <div> 
            <img src={cubo} alt='Back Image' className='planos-icon'/>
          <h2> Starter</h2>
          <br/>
            <h3> R$ 145,00/mês </h3>
            </div>

            <div> 
            <img src={cubo} alt='Back Image' className='planos-icon'/>
          <h2>PRÓ</h2>
          <br/>
            <h3> R$ 170,00/mês </h3>
            </div>

          </S.ContainerPlans>

              
      </S.Container>
    </S.Body>
    )
}

