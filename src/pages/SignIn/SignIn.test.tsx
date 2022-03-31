import { render, screen, userEvent } from 'src/../__helpers__/app-tests'
import SignIn from '.'

describe('Sign in screen', () => {
  it('Checks if the sign in screen loads correctly', () => {
    render(<SignIn />)

    expect(screen.getByText(/Login/)).toBeInTheDocument()
    expect(screen.getByLabelText(/E-mail/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Senha/)).toBeInTheDocument()

    const button = screen.getByText(/Entrar/)

    expect(button).toBeInTheDocument()

    userEvent.click(button)
  })
})
