
If you want to remove the parameter for how many days ago the shift was created and instead directly calculate the shift's start and end times for today based on the original shift times, you can achieve this by using the current date and directly applying the shift's start and end times to today's date.

Here's how you can do it:

Parse the original shift's start and end dates.
Calculate the new shift start and end times for today.
JavaScript Example
Setup the original shift dates:
javascript
Copy code
const originalShiftStart = '2023-04-15T22:00:00Z'; // Example start date in UTC
const originalShiftEnd = '2023-04-16T06:00:00Z'; // Example end date in UTC (next day)
Calculate the new shift dates for today:
javascript
Copy code
function getShiftToday(originalShiftStart, originalShiftEnd) {
  // Parse the original shift dates
  const startDate = new Date(originalShiftStart);
  const endDate = new Date(originalShiftEnd);

  // Calculate the original shift duration in milliseconds
  const shiftDuration = endDate - startDate;

  // Get today's date
  const today = new Date();
  
  // Set the new shift start date to today's date with the same hours, minutes, and seconds as the original shift
  const newShiftStartDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), startDate.getUTCHours(), startDate.getUTCMinutes(), startDate.getUTCSeconds()));

  // Calculate the new shift end date by adding the shift duration to the new start date
  const newShiftEndDate = new Date(newShiftStartDate.getTime() + shiftDuration);

  return {
    newShiftStart: newShiftStartDate.toISOString(),
    newShiftEnd: newShiftEndDate.toISOString()
  };
}

const { newShiftStart, newShiftEnd } = getShiftToday(originalShiftStart, originalShiftEnd);
console.log('New Shift Start:', newShiftStart);
console.log('New Shift End:', newShiftEnd);