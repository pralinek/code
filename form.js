import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';

const ExampleForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [currentValue, setCurrentValue] = useState('Initial Value');

  const onSubmit = (data) => {
    console.log('Form submitted successfully', data);
    setCurrentValue(data.exampleInput);
  };

  return (
    <div>
      <h3>Current Value: {currentValue}</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="exampleInput">Change Value</Label>
          <Input
            type="text"
            name="exampleInput"
            id="exampleInput"
            {...register('exampleInput', { required: 'This field is required' })}
            invalid={!!errors.exampleInput} // This sets the invalid prop to true if there's an error
          />
          {errors.exampleInput && <FormFeedback>{errors.exampleInput.message}</FormFeedback>}
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default ExampleForm;