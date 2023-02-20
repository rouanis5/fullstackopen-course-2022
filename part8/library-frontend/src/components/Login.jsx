import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../querries/user'

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login] = useMutation(LOGIN)

  const submitHandler = async (e) => {
    e.preventDefault()
    await login({
      variables: { username, password },
      onCompleted: (data) => {
        setUser(data.login.value)
      }
    })
    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <h2>Login form</h2>
      <form onSubmit={submitHandler}>
        <label>
          username{' '}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          password{' '}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
