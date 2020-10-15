import express from 'express';
import patientService from '../services/patients';
import { toNewPatientData, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getAll();
  res.json(patients);
});

router.get('/:id', (req, res) => {
  const patientData = patientService.get(req.params.id);
  if (patientData) return res.json(patientData);
  return res.status(404).end();
});

router.post('/', (req, res) => {
  try {
    const newPatientData = toNewPatientData(req.body);
    const addedData = patientService.add(newPatientData);
    res.json(addedData);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const { id } = req.params;
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(id, newEntry);
    res.json(addedEntry);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
