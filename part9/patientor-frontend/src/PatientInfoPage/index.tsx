import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Icon, Button } from "semantic-ui-react";
import AddEntryModal from '../AddEntryModal';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';

import { useStateValue } from '../state';
import { setCache } from '../state/reducer';

import Entry from '../components/Entry';

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ cache }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<Patient>();
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (cache && cache.id === id) return setPatient(cache);
    const exec = async () => {
      try {
        const { data: currentPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(currentPatient);
        dispatch(setCache(currentPatient));
      } catch (err) {
        console.error(err.response.data);
      }
    };
    exec();
  }, [id]);

  return (
    <>
      {!patient ? (
        'loading...'
      ) : (
        <div className="App">
          <Container textAlign="left">
            <h3>{patient.name} 
              <Icon name={patient.gender === "male" ? "mars" : "venus" } />
            </h3>
          </Container>
          ssn: {patient.ssn}
          <br />
          occupation: {patient.occupation}
          <Container textAlign="left">
            <h4>entries</h4>
            {patient.entries.map(e => (
              <Entry key={e.id} entry={e} />
            ))}
          </Container>
          <AddEntryModal
            id={id}
            modalOpen={openModal}
            onClose={() => {setOpenModal(false);}}
          />
          <Button onClick={() => setOpenModal(true)}>Add Entry</Button>
        </div>
      )}
    </>
  );
};

export default PatientInfoPage;
