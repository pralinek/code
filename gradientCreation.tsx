function createShiftGradient(shiftStart, shiftEnd, breaks) {
    // Calculate the length of the shift period
    const shiftLength = shiftEnd - shiftStart;

    // Calculate the length of each break period
    const breakLengths = breaks.map(b => b[1] - b[0]);

    // Find the longest break period
    const longestBreak = Math.max(...breakLengths);

    // Represent shift and break periods using a linear gradient
    const longestBar = shiftLength - longestBreak;

    // Calculate color stops for the gradient
    const colorStops = [
        { color: 'green', position: (longestBar / shiftLength) * 100 + '%' }
    ];

    breaks.forEach(breakPeriod => {
        const breakStart = breakPeriod[0];
        const breakEnd = breakPeriod[1];
        const breakPosition = (breakStart - shiftStart) / shiftLength * 100 + '%';
        colorStops.push({ color: 'red', position: breakPosition });

        const breakEndPosition = (breakEnd - shiftStart) / shiftLength * 100 + '%';
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
    element.style.backgroundImage = gradientString;
}