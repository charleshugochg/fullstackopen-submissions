/* eslint-disable */
import { NewPatientData, Gender, HealthCheckRating, NewEntry } from './types';

export const assertNever= (value: never): never => {
  throw new Error(
    `Unhandled union value: ${JSON.stringify(value)}`
  );
}

export const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
}

export const isDate = (text: any): boolean => {
  return Boolean(Date.parse(text));
}

export const isGender = (text: any): text is Gender => {
  return Object.values(Gender).includes(text);
}

export const isHealthCheckReating = (text: any): text is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(text);
}

export const parseString = (str: any): string => {
  if (!isString(str)) {
    throw new Error('Incorrect type: ' + str);
  }
  return str;
}

export const parseName = (name: any): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
}

export const parseSSN = (ssn: any): string => {
  if (!isString(ssn)) {
    throw new Error('Incorret or missing ssn: ' + ssn);
  }
  return ssn;
}

export const parseDate = (date: any): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
}

export const parseOccupation = (occupation: any): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
}

export const parseGender = (gender: any): Gender => {
  if (!isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
}

export const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!isHealthCheckReating(rating)) {
    throw new Error('Incorret or missing rating: ' + rating);
  }
  return rating;
}

export const parseType = (type: any): string => {
  if (!isString(type)) {
    throw new Error('Incorrent or missing type: ' + type);
  }
  return type;
}

export const toNewPatientData = (object: any): NewPatientData => {
  return {
    name: parseName(object.name),
    ssn: parseSSN(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  }
}

export const toNewEntry = (object: any): NewEntry => {
  const type = parseType(object.type);
  const newEntry = {
    date: parseDate(object.date),
    description: parseString(object.description),
    specialist: parseString(object.specialist),
    diagnosisCodes: object.diagnosisCodes,
  }
  switch (type) {
    case 'Hospital':
      return {
        ...newEntry,
        type,
        discharge: object.discharge
      }
    case 'OccupationalHealthcare':
      return {
        ...newEntry,
        type,
        employerName: parseString(object.employerName),
        sickLeave: object.sickLeave
      }
    case 'HealthCheck':
      return {
        ...newEntry,
        type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      }
    default:
      throw new Error(`Incorrect or missing type: ${type}`);
  }
}
