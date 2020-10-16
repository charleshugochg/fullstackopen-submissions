import React from 'react';
import { Segment, Icon, Container } from 'semantic-ui-react';
import { HealthCheckEntry as Entry, HealthCheckRating } from '../types';

interface EntryProps {
  entry: Entry;
}

type Color = 'green' | 'yellow' | 'orange' | 'red';

const ratingToColor = (rating: HealthCheckRating): Color => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return 'green';
    case HealthCheckRating.LowRisk:
      return 'yellow';
    case HealthCheckRating.HighRisk:
      return 'orange';
    case HealthCheckRating.CriticalRisk:
      return 'red';
  }
};

const HealthCheckEntry: React.FC<EntryProps> = ({ entry }) => {
  return (
    <Segment>
      <Container>
        <h4>{entry.date} <Icon name='doctor' /></h4>
      </Container>
      {entry.description}
      <br />
      <Icon name='heart' color={ratingToColor(entry.healthCheckRating)} />
    </Segment>
  );
};

export default HealthCheckEntry;
