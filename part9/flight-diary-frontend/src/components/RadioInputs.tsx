interface RadioInputsType {
  onChange: React.ChangeEventHandler<HTMLInputElement>
  state: string
  title?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list: any[]
}

const RadioInputs = ({ title, list, onChange, state }: RadioInputsType) => {
  return (
    <div>
      {title}{' '}
      {list.map((el, index) => (
        <label key={index}>
          <input
            type="radio"
            onChange={onChange}
            checked={el === state}
            value={el}
          />
          {el}
        </label>
      ))}
    </div>
  )
}

export default RadioInputs
