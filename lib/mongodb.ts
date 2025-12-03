import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.warn('⚠️  MONGODB_URI not found in environment variables.');
  console.warn('⚠️  Please create a .env.local file with:');
  console.warn('⚠️  MONGODB_URI=your_mongodb_connection_string');
  console.warn('⚠️  JWT_SECRET=your_secret_key');
}

const options = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

if (uri) {
  if (process.env.NODE_ENV === 'development') {
    // In development, use a global variable to preserve the client across hot reloads
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production, create a new client
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export default clientPromise;
