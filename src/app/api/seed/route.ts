import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Post, slugify } from '@/lib/models/Post';
import { serializePost } from '@/lib/posts';
import { isAuthorized } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Artikel contoh (diambil dari konten statis lama halaman Berita).
const samplePosts = [
  {
    title: 'Kemampuan Membaca Anak Indonesia: Analisis Mendalam dan Strategi Peningkatan',
    excerpt:
      'Ringkasan Eksekutif Kemampuan membaca merupakan fondasi krusial bagi perkembangan anak dan kemajuan bangsa.',
    content:
      '<p>Kemampuan membaca merupakan fondasi krusial bagi perkembangan anak dan kemajuan bangsa. Namun, kondisi kemampuan membaca anak-anak di Indonesia masih memerlukan perhatian serius.</p><p>Artikel ini membahas analisis mendalam beserta strategi peningkatan literasi membaca.</p>',
  },
  {
    title: 'Urgensi Literasi Digital di Indonesia',
    excerpt:
      'Masih segar dalam ingatan kita beberapa waktu lalu jagat maya dihebohkan dengan temuan Microsoft.',
    content:
      '<p>Masih segar dalam ingatan kita beberapa waktu lalu jagat maya dihebohkan dengan adanya temuan Microsoft bahwa netizen Indonesia menempati posisi tertentu dalam hal kesopanan digital.</p><p>Hal ini menegaskan pentingnya literasi digital.</p>',
  },
  {
    title: 'Why a startup fails if they had a strategy?',
    excerpt:
      'Strategy is a general plan to achieve one or more long-term or overall goals under conditions of uncertainty.',
    content:
      '<p>Strategy is a general plan to achieve one or more long-term or overall goals under conditions of uncertainty but it doesn’t always go according to plan.</p>',
  },
];

/**
 * POST /api/seed — isi database dengan artikel contoh. Butuh header `x-admin-token`.
 * Aman dipanggil berulang: artikel dengan slug yang sudah ada akan dilewati.
 */
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Tidak diizinkan.' }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const created = [];
    for (const sample of samplePosts) {
      const slug = slugify(sample.title);
      const exists = await Post.findOne({ slug }).lean();
      if (exists) continue;
      const doc = new Post({ ...sample, slug, published: true, author: 'Admin' });
      await doc.save();
      created.push(serializePost(doc.toObject()));
    }

    return NextResponse.json({
      message: `${created.length} artikel contoh ditambahkan.`,
      data: created,
    });
  } catch (error) {
    console.error('POST /api/seed gagal:', error);
    return NextResponse.json({ error: 'Gagal melakukan seeding.' }, { status: 500 });
  }
}
