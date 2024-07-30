import mongoose, { Connection } from 'mongoose';

// Connection for the first database
const db1Connection: Connection = mongoose.createConnection(process.env.DB1_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connection for the second database
const db2Connection: Connection = mongoose.createConnection(process.env.DB2_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export { db1Connection, db2Connection };
