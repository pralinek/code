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


var envVariables = Environment.GetEnvironmentVariables();
var envFileContent = new StringBuilder();

foreach (DictionaryEntry envVar in envVariables)
{
    string key = envVar.Key.ToString();
    string value = envVar.Value.ToString();

    if (!string.IsNullOrEmpty(value))
    {
        // Prefix with REACT_APP_ (React only recognizes prefixed env variables)
        string formattedKey = $"REACT_APP_{key.ToUpper()}";
        envFileContent.AppendLine($"{formattedKey}={value}");
    }
}

// Write the environment variables to ClientApp/.env
string envFilePath = Path.Combine("ClientApp", ".env");
File.WriteAllText(envFilePath, envFileContent.ToString());

Console.WriteLine($".env file generated at: {envFilePath}");