var config = app.Configuration.AsEnumerable();

// Create a .env file content
var envFile = new StringBuilder();
foreach (var kvp in config)
{
    if (!string.IsNullOrEmpty(kvp.Value)) // Ignore null values
    {
        envFile.AppendLine($"REACT_APP_{kvp.Key.Replace(":", "_").ToUpper()}={kvp.Value}");
    }
}

// Write to ClientApp/.env before building React
File.WriteAllText("ClientApp/.env", envFile.ToString());