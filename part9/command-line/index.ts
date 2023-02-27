import express from 'express';
import { isNotNumber, calculateBmi, calculateExercises } from './utils';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  
  if (!height || !weight) {
    return res.status(400).json({ error: 'Parameters missing'});
  }
  if (isNotNumber(height) || isNotNumber(weight)) {
    return res.status(400).json({ error: 'Provided values were not numbers!' });
  }

  try {
    const bmi = calculateBmi(Number(height), Number(weight));
    return res.json({ weight, height, bmi });
  } catch (error) {
    return res.status(400).json({
      error: error instanceof Error ? error.message : 'Something went wrong'
    });
  }
});

app.post('/exercices', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target: t } = req.body;
  const exercices = daily_exercises as number[];
  const target = t as number;

  if (!(exercices instanceof Array && exercices.length >= 1) || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }
  if (!(!isNotNumber(target) && !exercices.find(day => isNotNumber(day)))) {
    return res.status(400).json({ error: 'malformatted parameters'});
  }

  const result = calculateExercises(exercices, target);
  return res.json(result);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
