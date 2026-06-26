import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

/**
 * Pesan dari formulir kontak pengunjung (lihat PRD tabel `contacts`).
 */
const ContactSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 150 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 191 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false },
    collection: 'contacts',
  }
);

export type ContactDoc = InferSchemaType<typeof ContactSchema>;

// Hindari OverwriteModelError saat hot-reload / invokasi ulang serverless.
export const Contact: Model<ContactDoc> =
  (mongoose.models.Contact as Model<ContactDoc>) ||
  mongoose.model<ContactDoc>('Contact', ContactSchema);
