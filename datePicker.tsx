import React, { useState } from 'react';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import { Box, Typography, IconButton, TextField, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import moment, { Moment } from 'moment';

type PeriodOption = 'day' | 'week' | 'month' | 'year';

type DateRangePickerProps = {
  control: Control<{ startDate: Moment | null; endDate: Moment | null; period: PeriodOption }>;
  setValue: UseFormSetValue<{ startDate: Moment | null; endDate: Moment | null; period: PeriodOption }>;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({ control, setValue }) => {
  const handlePeriodChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedPeriod = event.target.value as PeriodOption;
    setValue('period', selectedPeriod);
    updateDates(selectedPeriod);
  };

  const updateDates = (selectedPeriod: PeriodOption) => {
    switch (selectedPeriod) {
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

  const adjustPeriod = (amount: number, startDate: Moment | null, endDate: Moment | null, period: PeriodOption) => {
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
          maxWidth: 'auto',
          p: 3,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Controller
          name="startDate"
          control={control}
          render={({ field: { value: startDate } }) => (
            <Controller
              name="endDate"
              control={control}
              render={({ field: { value: endDate } }) => (
                <>
                  <Controller
                    name="period"
                    control={control}
                    render={({ field: { value: period } }) => (
                      <>
                        <Typography variant="h6">
                          {`${startDate?.format('MMMM D, YYYY')} - ${endDate?.format('MMMM D, YYYY')}`}
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            mt: 2,
                          }}
                        >
                          <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(date) => setValue('startDate', date)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                          />

                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton onClick={() => adjustPeriod(-1, startDate, endDate, period)}>
                              <ArrowBackIcon />
                            </IconButton>
                            <IconButton onClick={() => adjustPeriod(1, startDate, endDate, period)}>
                              <ArrowForwardIcon />
                            </IconButton>
                          </Box>

                          <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(date) => setValue('endDate', date)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                          />
                        </Box>

                        <Box sx={{ width: '100%', mt: 2 }}>
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
                        </Box>
                      </>
                    )}
                  />
                </>
              )}
            />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePicker;