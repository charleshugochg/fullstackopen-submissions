import React from 'react';
import { Field, Formik, Form } from 'formik';
import { Grid, Button } from 'semantic-ui-react';
import { TextField, DiagnosisSelection, NumberField } from '../components/FormField';

import { HospitalEntry, Diagnosis } from '../types';

export type EntryFormValues = Omit<HospitalEntry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  diagnoses: { [key: string]: Diagnosis };
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel, diagnoses }) => {
  return (
    <Formik
      initialValues={{
        type: 'Hospital',
        date: '',
        description: '',
        discharge: {
          date: '',
          criteria: '',
        },
        specialist: '',
        diagnosisCodes: []
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Type"
              placeholder="HealthCheck"
              name="type"
              disabled
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="2020-10-29"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Dr."
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!isValid || !dirty}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;

