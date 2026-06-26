import { connectToDatabase } from '@/lib/db';
import { Post } from '@/lib/models/Post';

/**
 * Bentuk artikel yang aman dikirim ke komponen (plain object, tanpa kelas Mongoose).
 */
export type PostView = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string | null;
  published: boolean;
  author: string;
  created_at: string | null;
  updated_at: string | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializePost(doc: any): PostView {
  return {
    id: String(doc._id),
    title: doc.title,
    slug: doc.slug,
    content: doc.content,
    excerpt: doc.excerpt ?? '',
    featured_image: doc.featured_image ? String(doc.featured_image) : null,
    published: Boolean(doc.published),
    author: doc.author ?? 'Admin',
    created_at: doc.created_at ? new Date(doc.created_at).toISOString() : null,
    updated_at: doc.updated_at ? new Date(doc.updated_at).toISOString() : null,
  };
}

/** Daftar artikel yang sudah tayang, terbaru lebih dulu. */
export async function getPublishedPosts(): Promise<PostView[]> {
  await connectToDatabase();
  const docs = await Post.find({ published: true }).sort({ created_at: -1 }).lean();
  return docs.map(serializePost);
}

/** Satu artikel berdasarkan slug (hanya yang tayang). */
export async function getPostBySlug(slug: string): Promise<PostView | null> {
  await connectToDatabase();
  const doc = await Post.findOne({ slug, published: true }).lean();
  return doc ? serializePost(doc) : null;
}
