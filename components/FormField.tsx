import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type = 'text' }) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      label={label}
      {...field}
      type={type}
      fullWidth
      required
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      margin="normal"
    />
  );
};

export default FormField;
