const https = require('https'); // or use 'http' for non-secure requests

const url = 'https://wannyglamour.pl'; // Replace with the target URL
const url2 = 'https://wannyglamour.pl/contact-2/'; // Replace with the target URL


function runEveryMillisecond() {
    
https.get(url, (res) => {
    const { statusCode } = res;
    if (statusCode === 200) {
        console.log(`Ping successful: ${statusCode}`);
    } else {
        console.log(`Ping failed with status code: ${statusCode}`);
    }

    res.on('data', (chunk) => { /* Consume response data if needed */ });
    res.on('end', () => { /* Handle end of response if needed */ });

}).on('error', (err) => {
    console.error(`Error pinging website: ${err.message}`);
}); // 1000 ms = 1 second
}

let intervalId;
let running = false;

function startInterval() {
    running = true;
    intervalId = setInterval(runEveryMillisecond, 2);  // Start running every 1ms
    setTimeout(stopInterval, 10000);  // Stop after 10000ms (10 seconds)
}

function stopInterval() {
    if (running) {
        clearInterval(intervalId);  // Clear the running interval
        intervalId = null;
        console.log("Stopped for 10 seconds...");
        setTimeout(startInterval, 10000);  // Restart after another 10000ms (10 seconds)
    }
}

startInterval();  // Initialize the loop