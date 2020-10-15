export interface DiagnoseData {
  code: string;
  name: string;
  latin?: string
}

export interface BaseEntry {
  id: string;
  date: string;
  type: string;
  description: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseData['code']>;
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

export interface HealthCheck extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export type Entry = HospitalEntry | OccupationalHealthcare| HealthCheck;
export type NewEntry = Omit<HospitalEntry, 'id'> | Omit<OccupationalHealthcare, 'id'> | Omit<HealthCheck, 'id'>;

export interface PatientData {
  id: string;
  name: string;
  ssn: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NewPatientData = Omit<PatientData, 'id' | 'entries'>;

export type PublicPatientData = Omit<PatientData, 'ssn' | 'entries'>;

export enum Gender {
  Male= 'male',
  Female= 'female'
}
