import React from 'react';
import { Segment, Icon, Container } from 'semantic-ui-react';
import { HospitalEntry as Entry } from '../types';

interface EntryProps {
  entry: Entry;
}

const HospitalEntry: React.FC<EntryProps> = ({ entry }) => {
  return (
    <Segment>
      <Container>
        <h4>{entry.date} <Icon name='hospital symbol' /></h4> 
      </Container>
      {entry.description}     
    </Segment>
  );
};

export default HospitalEntry;
