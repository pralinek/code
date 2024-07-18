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

  function groupEventsByDay(events) {
    return events.reduce((groups, event) => {
      // Parse the UTC date
      const date = new Date(event.startTime);
  
      // Get the date string (e.g., '2024-07-18')
      const dateString = date.toISOString().split('T')[0];
  
      // If the group for this date does not exist, create it
      if (!groups[dateString]) {
        groups[dateString] = [];
      }
  
      // Add the event to the group
      groups[dateString].push(event);
  
      return groups;
    }, {});
  }