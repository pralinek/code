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

