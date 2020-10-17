export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface BaseEntry {
  id: string;
  date: string;
  type: string;
  description: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcare extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export type Entry = HospitalEntry | OccupationalHealthcare| HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  entries: Entry[];
  dateOfBirth?: string;
}

export type NewEntry = Omit<HospitalEntry, 'id'> | Omit<OccupationalHealthcare, 'id'> | Omit<HealthCheckEntry, 'id'>;
