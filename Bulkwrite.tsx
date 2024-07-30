const mongoose = require('mongoose');

const yourSchema = new mongoose.Schema({
  nr: { type: Number, required: true, unique: true },
  name: String,
  age: Number
});

const YourModel = mongoose.model('YourModel', yourSchema);

async function updateMany(data) {
  // Create bulk operations array
  const bulkOps = data.map(item => ({
    updateOne: {
      filter: { nr: item.nr },
      update: { $set: item },
      upsert: true
    }
  }));

  // Execute bulk operations
  const result = await YourModel.bulkWrite(bulkOps);
  return result;
}

// Usage example
(async () => {
  const uri = 'your_mongodb_uri';

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    const data = [
      { nr: 1, name: 'John Doe', age: 30 },
      { nr: 2, name: 'Jane Doe', age: 25 },
      { nr: 3, name: 'Jim Beam', age: 35 }
    ];

    const result = await updateMany(data);
    console.log('Bulk write result:', result);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
})();
