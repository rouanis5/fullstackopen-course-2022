import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../querries/author'
import Select from 'react-select'

const SetBirthYear = ({ authorsNames }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [updateBirthYear] = useMutation(EDIT_AUTHOR)
  const options = authorsNames.map(({ name }) => {
    return { value: name, label: name }
  })

  const update = (e) => {
    e.preventDefault()
    // const name = e.target.name.value
    const name = selectedOption.value
    const born = e.target.born.value
    if (!name || isNaN(born)) return
    updateBirthYear({ variables: { name, year: parseInt(born) } })

    e.target.born.value = ''
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={update}>
        {/* <label>
          name
          <input name="name" type="text" />
        </label> */}
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          placeholder="-- select an author --"
          options={options}
        />
        <br />
        <label>
          born
          <input name="born" type="text" />
        </label>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirthYear
