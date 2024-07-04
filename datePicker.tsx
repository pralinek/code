import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, Typography, IconButton, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import moment from 'moment';

type FormValues = {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
};

const DateRangePicker: React.FC = () => {
  const { control, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      startDate: moment(),
      endDate: moment(),
    },
  });

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const setCurrentMonth = () => {
    const start = moment().startOf('month');
    const end = moment().endOf('month');
    setValue('startDate', start);
    setValue('endDate', end);
  };

  const setCurrentWeek = () => {
    const start = moment().startOf('week');
    const end = moment().endOf('week');
    setValue('startDate', start);
    setValue('endDate', end);
  };

  const setCurrentYear = () => {
    const start = moment().startOf('year');
    const end = moment().endOf('year');
    setValue('startDate', start);
    setValue('endDate', end);
  };

  const setCurrentDay = () => {
    const today = moment();
    setValue('startDate', today);
    setValue('endDate', today);
  };

  const adjustDate = (days: number) => {
    if (startDate && endDate) {
      setValue('startDate', startDate.clone().add(days, 'days'));
      setValue('endDate', endDate.clone().add(days, 'days'));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box
        sx={{
          maxWidth: 600,
          mx: 'auto',
          p: 3,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h6">{`${startDate?.format('MMMM D, YYYY')} - ${endDate?.format('MMMM D, YYYY')}`}</Typography>
          <Typography variant="body1">{`${startDate?.format('MMMM')} ${startDate?.format('D')}, ${startDate?.format('YYYY')} - Week ${startDate?.week()}`}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <IconButton onClick={() => adjustDate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton onClick={() => adjustDate(1)}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button variant="contained" onClick={setCurrentMonth}>
            Current Month
          </Button>
          <Button variant="contained" onClick={setCurrentWeek}>
            Current Week
          </Button>
          <Button variant="contained" onClick={setCurrentYear}>
            Current Year
          </Button>
          <Button variant="contained" onClick={setCurrentDay}>
            Current Day
          </Button>
        </Box>

        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Start Date"
              value={field.value}
              onChange={(date) => field.onChange(date)}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
            />
          )}
        />

        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="End Date"
              value={field.value}
              onChange={(date) => field.onChange(date)}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
            />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePicker;