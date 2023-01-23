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
      <form onSubmit={(e) => { loginUser(e) }}>
        <label>
          username
          <input type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} />
        </label>
        <br />
        <label>
          password
          <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </label>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
