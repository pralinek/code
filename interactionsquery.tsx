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


/////////////////////////////////////////////////////
class Program
{
    static void Main()
    {
        // Get the current date and time in UTC
        DateTimeOffset now = DateTimeOffset.UtcNow;

        // Calculate the date and time one week ago
        DateTimeOffset oneWeekAgo = now.AddDays(-7);

        // Format dates to ISO 8601 without milliseconds
        string startDate = oneWeekAgo.ToString("yyyy-MM-ddTHH:mm:ss");
        string endDate = now.ToString("yyyy-MM-ddTHH:mm:ss");

        // Construct the ServiceNow query string
        string query = $"createdOn>={startDate}^createdOn<={endDate}";

        // Output the query string
        Console.WriteLine(query); // Example output: createdOn>=2023-07-21T12:34:56^createdOn<=2023-07-28T12:34:56
    }