import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';

const ExampleForm = () => {
  const { control, handleSubmit } = useForm();
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
          <Controller
            name="exampleInput"
            control={control}
            defaultValue=""
            rules={{ required: 'This field is required' }}
            render={({ field, fieldState }) => (
              <div>
                <Input
                  type="text"
                  id="exampleInput"
                  {...field}
                  invalid={!!fieldState.error}
                />
                {fieldState.error && <FormFeedback>{fieldState.error.message}</FormFeedback>}
              </div>
            )}
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default ExampleForm;