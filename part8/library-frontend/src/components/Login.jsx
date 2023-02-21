import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../querries/user'
import { localStorageKey } from '../helpers/consants'

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login] = useMutation(LOGIN)

  const submitHandler = async (e) => {
    e.preventDefault()
    await login({
      variables: { username, password },
      onCompleted: (data) => {
        const token = data.login.value
        setToken(token)
        localStorage.setItem(localStorageKey, token)
      },
      onError: (error) => {
        console.log(error.graphQLErrors[0].message)
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
