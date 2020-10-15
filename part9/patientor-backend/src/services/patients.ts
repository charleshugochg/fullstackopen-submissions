import patients from '../data/patientData';
import { PatientData, Entry, NewEntry, NewPatientData, PublicPatientData } from '../types';

const getAll = (): PublicPatientData[] => {
  return patients.map(({ 
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation 
  }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const get = (id: string): PatientData | undefined => {
  return patients.find(p => p.id === id);
};

const add = (data: NewPatientData): PatientData => {
  const dataWillAdd = {
    ...data,
    entries: [],
    id: patients.length.toString()
  };
  patients.push(dataWillAdd);
  return dataWillAdd;
};

const addEntry = (id: string, data: NewEntry): Entry => {
  const newEntry = {
    ...data,
    id: Math.floor(Math.random() * 100000000).toString()
  };
  const patient = patients.find(p => p.id === id);
  if (!patient) throw new Error('parent id is not exist.');
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getAll,
  get,
  add,
  addEntry,
};
