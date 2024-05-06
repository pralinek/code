// Define your custom snap function
function customSnap(date, scale, step) {
    var snappedDate = new Date(date);
    var minutes = snappedDate.getMinutes();
    var remainder = minutes % 5; // Snap to intervals of 5 minutes

    if (remainder !== 0) {
        // Round to the nearest 5 minutes
        if (remainder <= 2.5) {
            snappedDate.setMinutes(minutes - remainder);
        } else {
            snappedDate.setMinutes(minutes + (5 - remainder));
        }
    }

    return snappedDate;
}

// Initialize your vis-timeline with custom snap options
var container = document.getElementById('visualization');
var items = new vis.DataSet([
    {id: 1, content: 'Item 1', start: new Date()}
]);
var options = {
    // Add your other options here
    snap: { // Configure snapping behavior
        // Enable custom snapping
        step: function(date, scale, step) {
            return customSnap(date, scale, step);
        }
    }
};
var timeline = new vis.Timeline(container, items, options);


tooltipOnItemUpdateTime: function(item, callback) {
    var startTime = item.start;
    var endTime = item.end;
    var formattedStartTime = startTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    var formattedEndTime = endTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    var tooltipContent = '<div>Start Time: ' + formattedStartTime + '</div><div>End Time: ' + formattedEndTime + '</div>';
    callback(tooltipContent);
}