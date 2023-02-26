import express from 'express'
import calculateBmi from './bmiCalculator'
import { isNotNumber } from './utils'

const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query
  if (!height || !weight) {
    return res.status(400).json({ error: 'Parameters missing'})
  }
  if (isNotNumber(height) || isNotNumber(weight)) {
    return res.status(400).json({ error: 'Provided values were not numbers!' })
  }

  try {
    const bmi = calculateBmi(Number(height), Number(weight))
    return res.json({ weight, height, bmi })
  } catch (error) {
    return res.status(400).json({
      error: error instanceof Error ? error.message : 'Something went wrong'
    })
  }
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
