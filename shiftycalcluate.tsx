function getShiftToday(originalShiftStart, originalShiftEnd, daysAgo) {
    // Parse the original shift dates
    const startDate = new Date(originalShiftStart);
    const endDate = new Date(originalShiftEnd);
  
    // Calculate the original shift duration in milliseconds
    const shiftDuration = endDate - startDate;
  
    // Get today's date and set the time to midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    // Calculate the new shift start date for today, subtracting the daysAgo offset
    const newShiftStartDate = new Date(today.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
  
    // Set the new start time to match the original shift start hours, minutes, and seconds
    newShiftStartDate.setUTCHours(startDate.getUTCHours(), startDate.getUTCMinutes(), startDate.getUTCSeconds());
  
    // Calculate the new shift end date by adding the shift duration to the new start date
    const newShiftEndDate = new Date(newShiftStartDate.getTime() + shiftDuration);
  
    return {
      newShiftStart: newShiftStartDate.toISOString(),
      newShiftEnd: newShiftEndDate.toISOString()
    };
  }