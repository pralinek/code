function createShiftGradient(shiftStart, shiftEnd, breaks) {
    // Calculate the length of the shift period
    const shiftLength = shiftEnd.getTime() - shiftStart.getTime();

    // Calculate the length of each break period
    const breakLengths = breaks.map(b => b.end.getTime() - b.start.getTime());

    // Find the longest break period
    const longestBreak = Math.max(...breakLengths);

    // Represent shift and break periods using a linear gradient
    const longestBar = shiftLength - longestBreak;

    // Calculate color stops for the gradient
    const colorStops = [
        { color: 'green', position: (longestBar / shiftLength) * 100 + '%' }
    ];

    breaks.forEach(breakPeriod => {
        const breakStart = breakPeriod.start.getTime();
        const breakEnd = breakPeriod.end.getTime();
        const breakPosition = (breakStart - shiftStart.getTime()) / shiftLength * 100 + '%';
        colorStops.push({ color: 'red', position: breakPosition });

        const breakEndPosition = (breakEnd - shiftStart.getTime()) / shiftLength * 100 + '%';
        colorStops.push({ color: 'green', position: breakEndPosition });
    });

    // Construct the gradient string
    let gradientString = 'linear-gradient(to right';
    colorStops.forEach(stop => {
        gradientString += `, ${stop.color} ${stop.position}`;
    });
    gradientString += ')';

    // Apply the gradient to the element
    const element = document.getElementById('shift-gradient');
    element.style.background = gradientString;
}