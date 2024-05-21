const startDate = moment.utc(originalShiftStart);
const endDate = moment.utc(originalShiftEnd);

// Calculate the original shift duration in milliseconds
const shiftDuration = endDate.diff(startDate);

// Get today's date in UTC
const today = moment.utc();

// Set the new shift start date to today's date with the same hours, minutes, and seconds as the original shift
const newShiftStartDate = today.clone().startOf('day').set({
  hour: startDate.hour(),
  minute: startDate.minute(),
  second: startDate.second()
});

// Calculate the new shift end date by adding the shift duration to the new start date
const newShiftEndDate = newShiftStartDate.clone().add(shiftDuration, 'milliseconds');
