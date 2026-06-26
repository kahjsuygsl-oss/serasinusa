import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/db';
import { Post, slugify } from '@/lib/models/Post';
import { serializePost } from '@/lib/posts';
import { isAuthorized } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isValidId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

/** GET /api/posts/:id — ambil satu artikel berdasarkan id. */
export async function GET(_request: Request, ctx: RouteContext<'/api/posts/[id]'>) {
  const { id } = await ctx.params;
  if (!isValidId(id)) {
    return NextResponse.json({ error: 'ID tidak valid.' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const doc = await Post.findById(id).lean();
    if (!doc) {
      return NextResponse.json({ error: 'Artikel tidak ditemukan.' }, { status: 404 });
    }
    return NextResponse.json({ data: serializePost(doc) });
  } catch (error) {
    console.error('GET /api/posts/[id] gagal:', error);
    return NextResponse.json({ error: 'Gagal memuat artikel.' }, { status: 500 });
  }
}

/** PUT /api/posts/:id — perbarui artikel. Butuh header `x-admin-token`. */
export async function PUT(request: Request, ctx: RouteContext<'/api/posts/[id]'>) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Tidak diizinkan.' }, { status: 401 });
  }

  const { id } = await ctx.params;
  if (!isValidId(id)) {
    return NextResponse.json({ error: 'ID tidak valid.' }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Body JSON tidak valid.' }, { status: 400 });
  }

  // Hanya update field yang dikirim.
  const update: Record<string, unknown> = {};
  if (body.title !== undefined) update.title = String(body.title).trim();
  if (body.content !== undefined) update.content = String(body.content);
  if (body.excerpt !== undefined) update.excerpt = String(body.excerpt);
  if (body.featured_image !== undefined)
    update.featured_image = body.featured_image ? String(body.featured_image) : '';
  if (body.published !== undefined) update.published = Boolean(body.published);
  if (body.author !== undefined) update.author = String(body.author);
  if (body.slug !== undefined) update.slug = slugify(String(body.slug));
  else if (body.title !== undefined) update.slug = slugify(String(body.title));

  try {
    await connectToDatabase();

    if (update.slug) {
      const clash = await Post.findOne({ slug: update.slug, _id: { $ne: id } }).lean();
      if (clash) {
        return NextResponse.json(
          { error: `Slug "${update.slug}" sudah dipakai artikel lain.` },
          { status: 409 }
        );
      }
    }

    const doc = await Post.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).lean();

    if (!doc) {
      return NextResponse.json({ error: 'Artikel tidak ditemukan.' }, { status: 404 });
    }
    return NextResponse.json({ data: serializePost(doc) });
  } catch (error) {
    console.error('PUT /api/posts/[id] gagal:', error);
    return NextResponse.json({ error: 'Gagal memperbarui artikel.' }, { status: 500 });
  }
}

/** DELETE /api/posts/:id — hapus artikel. Butuh header `x-admin-token`. */
export async function DELETE(request: Request, ctx: RouteContext<'/api/posts/[id]'>) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Tidak diizinkan.' }, { status: 401 });
  }

  const { id } = await ctx.params;
  if (!isValidId(id)) {
    return NextResponse.json({ error: 'ID tidak valid.' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const doc = await Post.findByIdAndDelete(id).lean();
    if (!doc) {
      return NextResponse.json({ error: 'Artikel tidak ditemukan.' }, { status: 404 });
    }
    return NextResponse.json({ data: { id }, message: 'Artikel dihapus.' });
  } catch (error) {
    console.error('DELETE /api/posts/[id] gagal:', error);
    return NextResponse.json({ error: 'Gagal menghapus artikel.' }, { status: 500 });
  }
}
