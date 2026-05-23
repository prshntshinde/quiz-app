import '@testing-library/jest-dom/vitest';
import { beforeAll, afterAll, afterEach, vi } from 'vitest';
import mongoose from 'mongoose';

const isCI = process.env.CI === 'true';

let mongoServer: Awaited<ReturnType<typeof import('mongodb-memory-server')['MongoMemoryServer']['create']>> | null = null;

beforeAll(async () => {
  if (isCI) {
    return;
  }
  const { MongoMemoryServer } = await import('mongodb-memory-server');
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  process.env.MONGODB_URI = uri;
  await mongoose.connect(uri);
}, 180000);

afterAll(async () => {
  if (mongoose.connection.readyState) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});

afterEach(async () => {
  if (mongoose.connection.readyState) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  }
});

Object.defineProperty(globalThis, 'alert', {
  writable: true,
  value: vi.fn(),
});