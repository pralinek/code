function calculateContrastColor(backgroundColor) {
    // Convert HEX color to RGB
    let hexColor = backgroundColor.replace('#', '');
    let r = parseInt(hexColor.substring(0, 2), 16);
    let g = parseInt(hexColor.substring(2, 4), 16);
    let b = parseInt(hexColor.substring(4, 6), 16);

    // Calculate the relative luminance
    let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Choose white or black based on the luminance
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

// Example usage:
const backgroundColor = '#3498db'; // Sample background color (blue)
const contrastColor = calculateContrastColor(backgroundColor);
console.log('Contrast color:', contrastColor);