[Route("api/config")]
public class ConfigurationController : ControllerBase
{
    private readonly IConfiguration _config;

    public ConfigurationController(IConfiguration config)
    {
        _config = config;
    }

    [HttpGet]
    public IActionResult GetConfig()
    {
        var config = new
        {
            apiUrl = _config["ApiUrl"],
            featureFlag = _config["FeatureFlag"]
        };
        return Ok(config);
    }
}


async function fetchConfig() {
  const response = await fetch("/api/config");
  const config = await response.json();
  console.log("Config:", config);
}

fetchConfig();


async function loadConfig() {
  try {
    const response = await fetch("/config.json");
    const config = await response.json();

    // Set environment variables dynamically
    window.__RUNTIME_CONFIG__ = config;
  } catch (error) {
    console.error("Failed to load configuration:", error);
  }
}

// Fetch config before rendering the app
loadConfig().then(() => {
  import("./App").then(({ default: App }) => {
    import("react-dom/client").then((ReactDOM) => {
      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(<App />);
    });
  });
});



const apiUrl = window.__RUNTIME_CONFIG__?.REACT_APP_API_URL || "https://fallback-url.com";
console.log("API URL:", apiUrl);

[HttpGet]
public IActionResult GetConfig()
{
    var envVariables = System.Environment.GetEnvironmentVariables();
    var configDictionary = envVariables
        .Cast<System.Collections.DictionaryEntry>()
        .ToDictionary(entry => entry.Key.ToString(), entry => entry.Value.ToString());

    return Ok(configDictionary);
}