import express from 'express';
import bmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('hello full stack').end();
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (isNaN(weight) || isNaN(height)) return res.json({ error: 'malformed parameters' });
  const status = bmi(weight, height);
  return res.json({
    weight,
    height,
    bmi: status
  });
});

app.post('/exercises', (req, res) => {
  const dailyHours = req.body.daily_exercises; // eslint-disable-line
  const target = req.body.target; // eslint-disable-line
  if (!dailyHours || !target) return res.json({ error: "parameters missing" });
  if (!Array.isArray(dailyHours) || typeof target !== 'number') return res.json({ error: 'malformed parameters' });
  return res.json(
    calculateExercises(dailyHours, target)
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
});
