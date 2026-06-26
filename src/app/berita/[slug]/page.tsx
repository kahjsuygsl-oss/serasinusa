import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/posts';

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) {
    return { title: 'Artikel tidak ditemukan - Serasi Nusa' };
  }
  return {
    title: `${post.title} - Serasi Nusa`,
    description: post.excerpt || undefined,
  };
}

export default async function ArtikelDetail(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch (error) {
    console.error('Gagal memuat artikel:', error);
    post = null;
  }

  if (!post) {
    notFound();
  }

  const tanggal = post.created_at
    ? new Date(post.created_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <article className="py-20 container mx-auto px-4 max-w-3xl min-h-screen">
      <Link href="/berita" className="text-primary font-medium hover:underline">
        « Kembali ke Berita
      </Link>

      <header className="mt-6 mb-8 border-b pb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-3">
          {post.title}
        </h1>
        <p className="text-sm text-slate-500">
          Oleh {post.author}
          {tanggal ? ` · ${tanggal}` : ''}
        </p>
      </header>

      {post.featured_image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full rounded-2xl mb-8 object-cover"
        />
      )}

      <div
        className="prose prose-slate max-w-none leading-relaxed text-slate-700 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:mb-4 [&_a]:text-primary [&_a]:underline"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
