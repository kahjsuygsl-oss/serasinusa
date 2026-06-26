'use client';

import { useActionState } from 'react';
import { submitContact, type ContactFormState } from '@/app/kontak/actions';
import { Button } from '@/components/ui/button';

const initialState: ContactFormState = { status: 'idle', message: '' };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Nama
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={150}
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="Nama lengkap Anda"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={191}
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="email@contoh.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Pesan
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={5000}
          rows={5}
          className="w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="Tuliskan pesan atau pertanyaan Anda"
        />
      </div>

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? 'Mengirim…' : 'Kirim Pesan'}
      </Button>

      {state.status !== 'idle' && (
        <p
          role="status"
          aria-live="polite"
          className={
            state.status === 'success'
              ? 'rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700'
              : 'rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700'
          }
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
