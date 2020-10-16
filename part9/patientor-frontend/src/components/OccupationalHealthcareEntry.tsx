import React from 'react';
import { Segment, Container, Icon } from 'semantic-ui-react';
import { OccupationalHealthcare } from '../types';

interface EntryProps {
  entry: OccupationalHealthcare;
}

const OccupationalHealthcareEntry: React.FC<EntryProps> = ({ entry }) => {
  return (
    <Segment>
      <Container>
        <h4>{entry.date} <Icon name='stethoscope' /></h4>
      </Container>
      {entry.description}
    </Segment>
  );
};

export default OccupationalHealthcareEntry;
