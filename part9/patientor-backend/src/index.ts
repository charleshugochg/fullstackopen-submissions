import express from 'express';
import cors from 'cors';
import diagnoseRoute from './routes/diagnoses';
import patientRoute from './routes/patients';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/diagnosis', diagnoseRoute);
app.use('/api/patients', patientRoute);

app.get('/ping', (_req, res) => {
  console.log('someone pinged');
  res.send('pong');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log('Server is listen on port ', PORT);
});
