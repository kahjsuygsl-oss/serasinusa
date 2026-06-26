'use server';

import { connectToDatabase } from '@/lib/db';
import { Contact } from '@/lib/models/Contact';

export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Server Action: simpan pesan formulir kontak ke MongoDB.
 * Dipakai bersama `useActionState` di komponen ContactForm.
 */
export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !email || !message) {
    return { status: 'error', message: 'Nama, email, dan pesan wajib diisi.' };
  }
  if (!emailPattern.test(email)) {
    return { status: 'error', message: 'Format email tidak valid.' };
  }
  if (message.length > 5000) {
    return { status: 'error', message: 'Pesan terlalu panjang (maksimal 5000 karakter).' };
  }

  try {
    await connectToDatabase();
    await Contact.create({ name, email, message });
    return {
      status: 'success',
      message: 'Pesan berhasil dikirim. Terima kasih, kami akan segera menghubungi Anda.',
    };
  } catch (error) {
    console.error('Gagal menyimpan pesan kontak:', error);
    return {
      status: 'error',
      message: 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.',
    };
  }
}
