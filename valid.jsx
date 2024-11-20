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