import mongoose from 'mongoose';

/**
 * Koneksi MongoDB via Mongoose dengan caching global.
 *
 * Di lingkungan serverless (Vercel), setiap invokasi function bisa memakai ulang
 * proses yang "hangat". Tanpa cache, setiap request akan membuka koneksi baru dan
 * cepat menghabiskan limit koneksi MongoDB Atlas. Pola di bawah menyimpan koneksi
 * pada `globalThis` agar dipakai ulang antar invokasi.
 */

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Simpan cache pada global agar bertahan antar hot-reload (dev) & invokasi (serverless).
const globalForMongoose = globalThis as typeof globalThis & {
  _mongoose?: MongooseCache;
};

const cached: MongooseCache = globalForMongoose._mongoose ?? {
  conn: null,
  promise: null,
};

globalForMongoose._mongoose = cached;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      'Environment variable MONGODB_URI belum di-set. Salin .env.example ke .env.local lalu isi connection string MongoDB Atlas.'
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB || undefined,
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset agar percobaan berikutnya bisa membuka koneksi baru.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
