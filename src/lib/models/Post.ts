import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

/**
 * Artikel berita/blog yang dikelola lewat Panel Admin (lihat PRD tabel `posts`).
 */
const PostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 255 },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 255,
      index: true,
    },
    content: { type: String, required: true },
    excerpt: { type: String, trim: true, maxlength: 500, default: '' },
    featured_image: { type: String, trim: true, maxlength: 500, default: '' },
    published: { type: Boolean, default: false, index: true },
    author: { type: String, trim: true, maxlength: 150, default: 'Admin' },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'posts',
  }
);

export type PostDoc = InferSchemaType<typeof PostSchema>;

export const Post: Model<PostDoc> =
  (mongoose.models.Post as Model<PostDoc>) ||
  mongoose.model<PostDoc>('Post', PostSchema);

/** Ubah judul menjadi slug ramah-URL: "Judul Baru!" -> "judul-baru". */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
