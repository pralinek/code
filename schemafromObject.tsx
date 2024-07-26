const mongoose = require('mongoose');
const { Schema } = mongoose;

function createSchemaDefinition(obj) {
  const schemaDefinition = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        // If the value is an object, recursively create a nested schema
        schemaDefinition[key] = createSchemaDefinition(value);
      } else if (Array.isArray(value)) {
        // If the value is an array, determine the type of the first element
        if (value.length > 0) {
          schemaDefinition[key] = [createSchemaDefinition(value[0])];
        } else {
          schemaDefinition[key] = [];
        }
      } else {
        // Use the type of the value as the schema type
        schemaDefinition[key] = getType(value);
      }
    }
  }
  return schemaDefinition;
}

function getType(value) {
  switch (typeof value) {
    case 'string':
      return String;
    case 'number':
      return Number;
    case 'boolean':
      return Boolean;
    default:
      return Schema.Types.Mixed;
  }
}

function createMongooseSchemaFromObject(obj, schemaName) {
  const schemaDefinition = createSchemaDefinition(obj);
  return new Schema(schemaDefinition, { collection: schemaName });
}

// Example usage
const exampleObject = {
  name: 'John Doe',
  age: 30,
  isActive: true,
  address: {
    street: '123 Main St',
    city: 'New York',
    zipCode: 10001
  },
  tags: ['developer', 'javascript'],
  metadata: {
    createdAt: new Date(),
    updatedBy: 'admin'
  }
};

const schemaName = 'ExampleCollection';
const exampleSchema = createMongooseSchemaFromObject(exampleObject, schemaName);
const ExampleModel = mongoose.model('Example', exampleSchema);

console.log(exampleSchema);
