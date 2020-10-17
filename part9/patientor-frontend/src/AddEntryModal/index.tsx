import React from 'react';
import axios from 'axios';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm, { EntryFormValues } from './AddEntryForm';
import AddHospitalEntryForm, { HospitalEntryFormValues } from './AddHospitalEntryForm';
import OccupationalHealthcareForm, { OccupationalHealthcareValues} from './OccupationalHealthCareForm'
import { useStateValue } from '../state';
import { Entry } from '../types';
import { apiBaseUrl } from '../constants';

interface Props {
  id: string;
  type: string;
  modalOpen: boolean;
  onClose: () => void;
}

const AddEntryModal = ({ id, type, modalOpen, onClose }: Props) => {
  const [error, setError] = React.useState<string>();
  const [{ diagnosis }] = useStateValue();

  const onSubmit = async (values: EntryFormValues | HospitalEntryFormValues | OccupationalHealthcareValues) => {
    try {
      await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      onClose();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data);
    }
  };

  let form;
  switch(type){
    case 'Hospital':
      form = (
        <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnosis} />
      );
      break;
    case 'HealthCheck':
      form = (
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnosis} />
      );
      break;
    case 'OccupationalHealthcare':
      form = (
        <OccupationalHealthcareForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnosis} />
      );
      break;
    default:
      break;
  }

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}}`}</Segment>}
        {form}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
