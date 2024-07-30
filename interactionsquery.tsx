const now = new Date();

// Calculate the date one week ago
const oneWeekAgo = new Date();
oneWeekAgo.setDate(now.getDate() - 7);

// Format dates to ISO 8601
const formatDate = (date) => date.toISOString().split('.')[0];

// Get the formatted date strings
const startDate = formatDate(oneWeekAgo);
const endDate = formatDate(now);

// Construct the ServiceNow query string
const query = `createdOn>=${startDate}^createdOn<=${endDate}`;

console.log(query); // Example output: createdOn>=2023-07-21T12:34:56^createdOn<=2023-07-28T12:34:56