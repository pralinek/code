using System;
using System.Collections.Generic;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        // Sample array of PIDs
        int[] pids = { 101, 102, 103, 104, 105 };

        // Array to store the mapped values
        string[] mappedValues = new string[pids.Length];

        // List to hold the tasks
        List<Task> tasks = new List<Task>();

        // Iterate through the array of PIDs
        for (int i = 0; i < pids.Length; i++)
        {
            int index = i;
            int pid = pids[i];

            // Start the asynchronous mapping operation
            tasks.Add(MapPidToValueAsync(pid, index, mappedValues));
        }

        // Wait for all tasks to complete
        await Task.WhenAll(tasks);

        // Print the results
        for (int i = 0; i < mappedValues.Length; i++)
        {
            Console.WriteLine($"PID {pids[i]} is mapped to {mappedValues[i]}");
        }
    }

    // Asynchronous method to map PID to a value
    static async Task MapPidToValueAsync(int pid, int index, string[] mappedValues)
    {
        // Simulate an asynchronous operation, e.g., a web request or database query
        await Task.Delay(1000); // Simulate some delay

        // Example mapping logic
        string value = pid switch
        {
            101 => "Process A",
            102 => "Process B",
            103 => "Process C",
            104 => "Process D",
            105 => "Process E",
            _ => "Unknown Process"
        };

        // Store the result in the array at the corresponding index
        mappedValues[index] = value;
    }
}