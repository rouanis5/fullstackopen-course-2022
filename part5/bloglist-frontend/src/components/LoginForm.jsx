import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import constants from '../config/constants'

const LoginForm = ({ onLogin, onNotify }) => {
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
      onNotify(`${user.name} login`)

      setUsername('')
      setPassword('')
    } catch (exception) {
      onNotify(exception.response.data.error, 'error')
      console.error(exception.response.data.error)
    }
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
