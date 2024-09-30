db.collection.aggregate([
    {
      $group: {
        _id: "$UserP",  // Group by the "email" field
        count: { $sum: 1 }  // Count the number of occurrences of each email
      }
    },
    {
      $match: {
        count: { $gt: 1 }  // Find groups with more than one document (duplicates)
      }
    },
    {
      $project: {
        _id: 0,  // Do not show the _id field
        email: "$_id",  // Show the email field
        count: 1  // Show the count of duplicates
      }
    }
  ])