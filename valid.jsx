const validationSchema = Yup.object({
    numbersInput: Yup.string()
      .test(
        'contains-8-digit-number',
        'The text must contain at least one 8-digit number',
        (value) => {
          // Regular expression to match at least one 8-digit number
          const regex = /\b\d{8}\b/;
          return regex.test(value || '');
        }
      )
      .required('This field is required'),
  });

  function extractEightDigitNumbers(inputString) {
    // Regular expression to match 8-digit numbers
    const regex = /\b\d{8}\b/g;
  
    // Match all occurrences of the regex in the string
    const matches = inputString.match(regex);
  
    // Return the matches or an empty array if no matches found
    return matches ? matches.map(Number) : [];
  }