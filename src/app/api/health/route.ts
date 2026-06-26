import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** GET /api/health — cek koneksi database. Berguna untuk verifikasi setup. */
export async function GET() {
  try {
    const conn = await connectToDatabase();
    // readyState 1 = connected
    const connected = conn.connection.readyState === 1;
    return NextResponse.json({
      status: connected ? 'ok' : 'degraded',
      database: connected ? 'connected' : 'not-connected',
      dbName: conn.connection.name || null,
    });
  } catch (error) {
    console.error('Health check gagal:', error);
    return NextResponse.json(
      { status: 'error', database: 'unreachable' },
      { status: 503 }
    );
  }
}
