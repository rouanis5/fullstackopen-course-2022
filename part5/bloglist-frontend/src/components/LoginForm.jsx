import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import constants from '../config/constants'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function loginUser (e) {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      onLogin(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(constants.userLocalStorage, JSON.stringify(user))

      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error(exception.response.data.error)
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
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
