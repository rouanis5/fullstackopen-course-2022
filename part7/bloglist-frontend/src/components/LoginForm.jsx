import { useState } from 'react'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function loginUser (e) {
    e.preventDefault()

    onLogin({
      username,
      password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h3>Log in to application</h3>
      <form onSubmit={(e) => { loginUser(e) }} data-test="login:form">
        <label>
          username
          <input type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} data-test="login:username_input" />
        </label>
        <br />
        <label>
          password
          <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} data-test="login:password_input" />
        </label>
        <button type="submit" data-test="login:submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
