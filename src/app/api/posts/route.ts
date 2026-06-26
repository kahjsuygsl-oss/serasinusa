import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Post, slugify } from '@/lib/models/Post';
import { serializePost } from '@/lib/posts';
import { isAuthorized } from '@/lib/auth';

// MongoDB butuh Node.js runtime (bukan Edge).
export const runtime = 'nodejs';
// Selalu dinamis: data berasal dari database.
export const dynamic = 'force-dynamic';

/**
 * GET /api/posts
 * Publik: hanya artikel `published`. Dengan header admin: semua (termasuk draft).
 * Query opsional: ?all=true (butuh token admin).
 */
export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const wantAll = searchParams.get('all') === 'true';
    const admin = isAuthorized(request);

    const filter = wantAll && admin ? {} : { published: true };
    const docs = await Post.find(filter).sort({ created_at: -1 }).lean();

    return NextResponse.json({ data: docs.map(serializePost) });
  } catch (error) {
    console.error('GET /api/posts gagal:', error);
    return NextResponse.json({ error: 'Gagal memuat artikel.' }, { status: 500 });
  }
}

/**
 * POST /api/posts — buat artikel baru. Butuh header `x-admin-token`.
 * Body JSON: { title, content, excerpt?, featured_image?, published?, author?, slug? }
 */
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Tidak diizinkan.' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Body JSON tidak valid.' }, { status: 400 });
  }

  const title = String(body.title ?? '').trim();
  const content = String(body.content ?? '').trim();

  if (!title || !content) {
    return NextResponse.json(
      { error: 'Field `title` dan `content` wajib diisi.' },
      { status: 400 }
    );
  }

  const slug = body.slug ? slugify(String(body.slug)) : slugify(title);

  try {
    await connectToDatabase();

    const exists = await Post.findOne({ slug }).lean();
    if (exists) {
      return NextResponse.json(
        { error: `Slug "${slug}" sudah dipakai. Gunakan judul/slug lain.` },
        { status: 409 }
      );
    }

    const created = new Post({
      title,
      slug,
      content,
      excerpt: body.excerpt ? String(body.excerpt) : '',
      featured_image: body.featured_image ? String(body.featured_image) : '',
      published: Boolean(body.published),
      author: body.author ? String(body.author) : 'Admin',
    });
    await created.save();

    return NextResponse.json({ data: serializePost(created.toObject()) }, { status: 201 });
  } catch (error) {
    console.error('POST /api/posts gagal:', error);
    return NextResponse.json({ error: 'Gagal membuat artikel.' }, { status: 500 });
  }
}
