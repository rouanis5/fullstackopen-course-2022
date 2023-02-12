import { useField } from '../hooks'

const LoginForm = ({ onLogin }) => {
  const [username, usernameInput] = useField('text')
  const [password, passwordInput] = useField('password')

  async function loginUser(e) {
    e.preventDefault()

    onLogin({
      username,
      password
    })

    Array.from([usernameInput, passwordInput]).map((el) => el.clear())
  }

  return (
    <div>
      <h3>Log in to application</h3>
      <form onSubmit={loginUser} data-test="login:form">
        <label>
          username
          <input {...usernameInput.props} data-test="login:username_input" />
        </label>
        <br />
        <label>
          password
          <input {...passwordInput.props} data-test="login:password_input" />
        </label>
        <button type="submit" data-test="login:submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
