const readFileContent = async (file) => {
    const reader = new FileReader();
  
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };
  
  (async () => {
    try {
      const file = /* Your File object here */;
      const content = await readFileContent(file);
      console.log("File Content:", content);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  })();