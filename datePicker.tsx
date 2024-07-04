import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

const FormContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const DatePickerContainer = styled.div`
  margin-bottom: 20px;
`;

type FormValues = {
  startDate: Date | null;
  endDate: Date | null;
};

const DateRangePicker: React.FC = () => {
  const { control, handleSubmit, setValue } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const setCurrentMonth = () => {
    const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    setValue('startDate', start);
    setValue('endDate', end);
  };

  const setCurrentWeek = () => {
    const current = new Date();
    const first = current.getDate() - current.getDay() + 1; // First day is the day of the month - the day of the week
    const last = first + 6; // last day is the first day + 6
    const start = new Date(current.setDate(first));
    const end = new Date(current.setDate(last));
    setValue('startDate', start);
    setValue('endDate', end);
  };

  const setCurrentYear = () => {
    const start = new Date(new Date().getFullYear(), 0, 1);
    const end = new Date(new Date().getFullYear(), 11, 31);
    setValue('startDate', start);
    setValue('endDate', end);
  };

  const setCurrentDay = () => {
    const today = new Date();
    setValue('startDate', today);
    setValue('endDate', today);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ButtonRow>
          <Button type="button" onClick={setCurrentMonth}>Current Month</Button>
          <Button type="button" onClick={setCurrentWeek}>Current Week</Button>
          <Button type="button" onClick={setCurrentYear}>Current Year</Button>
          <Button type="button" onClick={setCurrentDay}>Current Day</Button>
        </ButtonRow>
        
        <DatePickerContainer>
          <label>Start Date</label>
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                selectsStart
                startDate={field.value}
                endDate={field.value}
                dateFormat="yyyy/MM/dd"
              />
            )}
          />
        </DatePickerContainer>
        
        <DatePickerContainer>
          <label>End Date</label>
          <Controller
            control={control}
            name="endDate"
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                selectsEnd
                startDate={field.value}
                endDate={field.value}
                dateFormat="yyyy/MM/dd"
                minDate={field.value}
              />
            )}
          />
        </DatePickerContainer>

        <Button type="submit">Submit</Button>
      </form>
    </FormContainer>
  );
};

export default DateRangePicker;