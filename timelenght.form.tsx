import React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';

const TimeLengthForm = () => {
  return (
    <Grid container spacing={2} alignItems="center">
      {/* Hours */}
      <Grid item>
        <TextField
          variant="outlined"
          label="Hours"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          // Add your state management logic here
        />
      </Grid>
      
      {/* Minutes */}
      <Grid item>
        <TextField
          variant="outlined"
          label="Minutes"
          type="number"
          InputProps={{ inputProps: { min: 0, max: 59 } }}
          // Add your state management logic here
        />
      </Grid>
    </Grid>
  );
};

export default TimeLengthForm;