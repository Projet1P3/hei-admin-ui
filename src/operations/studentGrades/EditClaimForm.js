import React from 'react';
import {
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  required,
} from 'react-admin';

const EditClaimForm = (props) => {
  return (
    <SimpleForm {...props}>
      <TextInput label="Claim ID" source="id" disabled />
      <TextInput label="Claim Reason" source="reason" validate={required()} />
      <DateInput
        label="Claim Date"
        source="claimDate"
        validate={required()}
      />
      <SelectInput
        label="Claim Status"
        source="status"
        choices={[
          { id: 'pending', name: 'Pending' },
          { id: 'approved', name: 'Approved' },
          { id: 'rejected', name: 'Rejected' },
        ]}
        validate={required()}
      />
    </SimpleForm>
  );
};

export { EditClaimForm };
