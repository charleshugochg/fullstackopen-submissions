import React from 'react';
import axios from 'axios';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm, { EntryFormValues } from './AddEntryForm';
import { useStateValue } from '../state';
import { Entry } from '../types';
import { apiBaseUrl } from '../constants';

interface Props {
  id: string;
  modalOpen: boolean;
  onClose: () => void;
}

const AddEntryModal = ({ id, modalOpen, onClose }: Props) => {
  const [error, setError] = React.useState<string>();
  const [{ diagnosis }] = useStateValue();

  const onSubmit = async (values: EntryFormValues) => {
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

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnosis}/>
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
