import React from 'react';
import { render, screen } from '@testing-library/react';
import { Formik } from 'formik';
import FormField from '../../components/FormField';

describe('FormField', () => {
  it('renders without errors', () => {
    render(
      <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
        <FormField label="Test Field" name="test" />
      </Formik>
    );
    expect(screen.getByLabelText(/test field/i)).toBeInTheDocument();
  });
});
