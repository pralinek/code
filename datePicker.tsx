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
  };

  const setCurrentPeriod = () => {
    switch (period) {
      case 'day':
        setValue('startDate', moment().startOf('day'));
        setValue('endDate', moment().startOf('day'));
        break;
      case 'week':
        setValue('startDate', moment().startOf('isoWeek'));
        setValue('endDate', moment().endOf('isoWeek'));
        break;
      case 'month':
        setValue('startDate', moment().startOf('month'));
        setValue('endDate', moment().endOf('month'));
        break;
      case 'year':
        setValue('startDate', moment().startOf('year'));
        setValue('endDate', moment().endOf('year'));
        break;
      default:
        break;
    }
  };

  const adjustPeriod = (amount: number) => {
    switch (period) {
      case 'day':
        setValue('startDate', startDate?.clone().add(amount, 'days'));
        setValue('endDate', endDate?.clone().add(amount, 'days'));
        break;
      case 'week':
        setValue('startDate', startDate?.clone().add(amount, 'weeks').startOf('isoWeek'));
        setValue('endDate', endDate?.clone().add(amount, 'weeks').endOf('isoWeek'));
        break;
      case 'month':
        setValue('startDate', startDate?.clone().add(amount, 'months').startOf('month'));
        setValue('endDate', endDate?.clone().add(amount, 'months').endOf('month'));
        break;
      case 'year':
        setValue('startDate', startDate?.clone().add(amount, 'years').startOf('year'));
        setValue('endDate', endDate?.clone().add(amount, 'years').endOf('year'));
        break;
      default:
        break;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 600,
          mx: 'auto',
          p: 3,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(date) => setValue('startDate', date)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(date) => setValue('endDate', date)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mt: 2 }}>
          <IconButton onClick={() => adjustPeriod(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <TextField
            select
            value={period}
            onChange={handlePeriodChange}
            variant="outlined"
            margin="normal"
            fullWidth
          >
            <MenuItem value="day">Day</MenuItem>
            <MenuItem value="week">Week</MenuItem>
            <MenuItem value="month">Month</MenuItem>
            <MenuItem value="year">Year</MenuItem>
          </TextField>
          <IconButton onClick={() => adjustPeriod(1)}>
            <ArrowForwardIcon />
          </IconButton>
          <Button
            variant="outlined"
            startIcon={<TodayIcon />}
            onClick={setCurrentPeriod}
          >
            Current {period}
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePicker;