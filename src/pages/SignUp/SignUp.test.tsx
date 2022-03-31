import { render, screen, userEvent } from 'src/../__helpers__/app-tests'
import SignUp from '.'

describe('Sign in screen', () => {
  it('Checks if the sign up screen loads correctly', () => {
    render(<SignUp />)

    expect(screen.getByText(/Cadastro/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Nome/)).toBeInTheDocument()
    expect(screen.getByLabelText(/E-mail/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Senha/)).toBeInTheDocument()

    const button = screen.getByText(/Entrar como/)

    expect(button).toBeInTheDocument()

    userEvent.click(button)
  })
})
