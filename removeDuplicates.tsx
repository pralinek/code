const removeDuplicates = (arr) => {
    const seen = new Set();
    return arr.filter(item => {
      const serializedItem = JSON.stringify(item);
      return seen.has(serializedItem) ? false : seen.add(serializedItem);
    });
  };