import React from 'react';
import { Entry } from '../types';
import { assertNever } from '../utils';
import HealthCheckEntry from './HealthCheckEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';
import HospitalEntry from './HospitalEntry';

interface EntryProps {
  entry: Entry;
}

const Component: React.FC<EntryProps> = ({ entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} />;
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default Component;
