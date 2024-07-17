const removeDuplicatesAndCount = (arr) => {
    // Step 1: Create a map to count occurrences
    const countMap = new Map();
    
    arr.forEach(item => {
      const serializedItem = JSON.stringify(item);
      if (countMap.has(serializedItem)) {
        countMap.get(serializedItem).count += 1;
      } else {
        countMap.set(serializedItem, { ...item, count: 1 });
      }
    });
  
    // Step 2: Convert the map values to an array
    return Array.from(countMap.values());
  };