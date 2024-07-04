import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, Typography, IconButton, TextField, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TodayIcon from '@mui/icons-material/Today';
import moment, { Moment } from 'moment';

type PeriodOption = 'day' | 'week' | 'month' | 'year';

type FormValues = {
  startDate: Moment | null;
  endDate: Moment | null;
};

const DateRangePicker: React.FC = () => {
  const { control, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      startDate: moment(),
      endDate: moment(),
    },
  });

  const [period, setPeriod] = useState<PeriodOption>('day');
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const handlePeriodChange = (event: React.ChangeEvent<{ value: PeriodOption }>) => {
    setPeriod(event.target.value);
    updateEndDate(event.target.value);
  };

  const updateEndDate = (selectedPeriod: PeriodOption) => {
    switch (selectedPeriod) {
      case 'day':
        setValue('endDate', startDate?.clone().add(1, 'day') || null);
        break;
      case 'week':
        setValue('endDate', startDate?.clone().add(1, 'week') || null);
        break;
      case 'month':
        setValue('endDate', startDate?.clone().add(1, 'month') || null);
        break;
      case 'year':
        setValue('endDate', startDate?.clone().add(1, 'year') || null);
        break;
      default:
        break;
    }
  };

  const setCurrentDay = () => {
    const today = moment();
    setValue('startDate', today);
    updateEndDate(period);
  };

  const adjustDate = (days: number) => {
    if (startDate) {
      setValue('startDate', startDate.clone().add(days, 'days'));
      setValue('endDate', startDate.clone().add(days + 1, 'days'));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 800,
          mx: 'auto',
          p: 3,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Box sx={{ textAlign: 'center', flex: 1 }}>
          <IconButton onClick={() => adjustDate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(date) => setValue('startDate', date)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
          <IconButton onClick={() => adjustDate(1)}>
            <ArrowForwardIcon />
          </IconButton>
          <IconButton onClick={setCurrentDay} sx={{ mt: 1 }}>
            <TodayIcon />
          </IconButton>
        </Box>

        <Box sx={{ textAlign: 'center', flex: 1 }}>
          <Typography variant="h6">Select Period</Typography>
          <TextField
            select
            fullWidth
            value={period}
            onChange={handlePeriodChange}
            variant="outlined"
            margin="normal"
          >
            <MenuItem value="day">Day</MenuItem>
            <MenuItem value="week">Week</MenuItem>
            <MenuItem value="month">Month</MenuItem>
            <MenuItem value="year">Year</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ textAlign: 'center', flex: 1 }}>
          <IconButton onClick={() => adjustDate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(date) => setValue('endDate', date)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
          <IconButton onClick={() => adjustDate(1)}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePicker;