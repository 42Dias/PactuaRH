import * as S from './Terms.styled'
import { logo } from 'assets'
import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <>
      <S.Header>
        <img src={logo} alt='image sign in' />
      </S.Header>
      <S.Container>
        <h1>Termos LGPD</h1>
        <strong>Termo de Consentimento para Tratamento de Dados</strong>
        <p>
          Este documento visa registrar a manifestação livre, informada e
          inequívoca pela qual o Titular concorda com o tratamento de seus dados
          pessoais para finalidade específica, em conformidade com a Lei nº
          13.709 – Lei Geral de Proteção de Dados Pessoais (LGPD).
          <br />
          <br />
          Ao manifestar sua aceitação para com o presente termo, o Titular
          consente e concorda que a Câmara Brasileira do Livro, CNPJ nº
          60.762.942/0001-81, com sede na Rua Cristiano Viana, 91 – Pinheiros,
          São Paulo / SP, telefone: 11 3069-1300, e-mail sac@isbn.org.br,
          doravante denominada Controladora, tome decisões referentes ao
          tratamento de seus dados pessoais, dados referentes as empresas em que
          atuem os usuários ou dados necessários ao usufruto de serviços
          ofertados pela CBL, bem como realize o tratamento de tais dados,
          envolvendo operações como as que se referem a coleta, produção,
          recepção, classificação, utilização, acesso, reprodução, transmissão,
          distribuição, processamento, arquivamento, armazenamento, eliminação,
          avaliação ou controle da informação, modificação, comunicação,
          transferência, difusão ou extração.
        </p>

        <strong>Dados pessoais</strong>
        <p>
          A Controladora fica autorizada a tomar decisões referentes ao
          tratamento e a realizar o tratamento dos seguintes dados pessoais do
          Titular:
          <br />
          <br />
          Nome completo;
          <br />
          Nome empresarial;
          <br />
          Data de nascimento;
          <br />
          Número e imagem do Cadastro de Pessoas Físicas (CPF);
          <br />
          Número do Cadastro Nacional de Pessoas Jurídicas (CNPJ);
          <br />
          Endereços de e-mail;
          <br />
          <br />
          Finalidades do Tratamento dos Dados
          <br />
          <br />
          O tratamento dos dados pessoais listados neste termo tem as seguintes
          finalidades:
          <br />
          <br />
          Possibilitar que a Controladora utilize tais dados emissão de Notas
          Fiscais e documentos financeiros correlatos;
          <br />
          Possibilitar que a Controladora utilize tais dados para facilitar a
          prestação de serviços diversos além dos primariamente contratados,
          desde que o cliente também
          <br />
          Compartilhamento de Dados
          <br />A Controladora fica autorizada a compartilhar os dados pessoais
          do Titular com outros agentes de tratamento de dados, caso seja
          necessário para as finalidades listadas neste termo, observados os
          princípios e as garantias estabelecidas pela Lei nº 13.709.
        </p>

        <strong>Segurança dos Dados</strong>
        <p>
          A Controladora responsabiliza-se pela manutenção de medidas de
          segurança, técnicas e administrativas aptas a proteger os dados
          pessoais de acessos não autorizados e de situações acidentais ou
          ilícitas de destruição, perda, alteração, comunicação ou qualquer
          forma de tratamento inadequado ou ilícito.
          <br />
          <br />
          Em conformidade ao art. 48 da Lei nº 13.709, o Controlador comunicará
          ao Titular e à Autoridade Nacional de Proteção de Dados (ANPD) a
          ocorrência de incidente de segurança que possa acarretar risco ou dano
          relevante ao Titular.
          <br />
          <br />
          Término do Tratamento dos Dados
          <br />
          A Controladora poderá manter e tratar os dados pessoais do Titular
          durante todo o período em que os mesmos forem pertinentes ao alcance
          das finalidades listadas neste termo. Dados pessoais anonimizados, sem
          possibilidade de associação ao indivíduo, poderão ser mantidos por
          período indefinido.
          <br />
          <br />
          O Titular poderá solicitar via e-mail ou correspondência ao
          Controlador, a qualquer momento, que sejam eliminados os dados
          pessoais não anonimizados do Titular. O Titular fica ciente de que
          poderá ser inviável ao Controlador continuar o fornecimento de
          produtos ou serviços ao Titular a partir da eliminação dos dados
          pessoais.
          <br />
          <br />
          Direitos do Titular
          <br />
          O Titular tem direito a obter da Controladora, em relação aos dados
          por ele tratados, a qualquer momento e mediante requisição: I -
          confirmação da existência de tratamento; II - acesso aos dados; III -
          correção de dados incompletos, inexatos ou desatualizados; IV -
          anonimização, bloqueio ou eliminação de dados desnecessários,
          excessivos ou tratados em desconformidade com o disposto na Lei nº
          13.709; V - portabilidade dos dados a outro fornecedor de serviço ou
          produto, mediante requisição expressa e observados os segredos
          comercial e industrial, de acordo com a regulamentação do órgão
          controlador; V - portabilidade dos dados a outro fornecedor de serviço
          ou produto, mediante requisição expressa, de acordo com a
          regulamentação da autoridade nacional, observados os segredos
          comercial e industrial; VI - eliminação dos dados pessoais tratados
          com o consentimento do titular, exceto nas hipóteses previstas no art.
          16 da Lei nº 13.709; VII - informação das entidades públicas e
          privadas com as quais o controlador realizou uso compartilhado de
          dados; VIII - informação sobre a possibilidade de não fornecer
          consentimento e sobre as consequências da negativa; IX - revogação do
          consentimento, nos termos do § 5º do art. 8º da Lei nº 13.709.
          <br />
          <br />
          Direito de Revogação do Consentimento
          <br />
          Este consentimento poderá ser revogado pelo Titular, a qualquer
          momento, mediante solicitação via e-mail ou correspondência ao
          Controlador.
        </p>

        <Link to='/'>Voltar</Link>
      </S.Container>
    </>
  )
}
