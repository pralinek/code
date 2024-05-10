function createShiftGradient(shiftStart, shiftEnd, breaks) {
    // Convert shift start and end to Moment objects
    const shiftStartMoment = moment(shiftStart);
    const shiftEndMoment = moment(shiftEnd);

    // Calculate the length of the shift period
    const shiftLength = shiftEndMoment.diff(shiftStartMoment);

    // Calculate the length of each break period
    const breakLengths = breaks.map(b => moment(b.end).diff(moment(b.start)));

    // Find the longest break period
    const longestBreak = Math.max(...breakLengths);

    // Represent shift and break periods using a linear gradient
    const longestBar = shiftLength - longestBreak;

    // Calculate color stops for the gradient
    const colorStops = [
        { color: 'green', position: (longestBar / shiftLength) * 100 + '%' }
    ];

    breaks.forEach(breakPeriod => {
        const breakStartMoment = moment(breakPeriod.start);
        const breakEndMoment = moment(breakPeriod.end);
        const breakPosition = breakStartMoment.diff(shiftStartMoment) / shiftLength * 100 + '%';
        colorStops.push({ color: 'red', position: breakPosition });

        const breakEndPosition = breakEndMoment.diff(shiftStartMoment) / shiftLength * 100 + '%';
        colorStops.push({ color: 'green', position: breakEndPosition });
    });