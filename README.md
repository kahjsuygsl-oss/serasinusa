# Serasi Nusa Redev

Redevelopment website Serasi Nusa menggunakan Next.js App Router.

## Development

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Validasi

```bash
npm run lint
npm run build
```

## Database & Hosting

Stack data proyek: **MongoDB Atlas** (database, via Mongoose) dengan deployment ke **Vercel**.
Butuh environment variable `MONGODB_URI`, `MONGODB_DB`, dan `ADMIN_TOKEN` — salin `.env.example`
ke `.env.local` lalu isi.

```bash
cp .env.example .env.local   # lalu isi MONGODB_URI dll
```

Cek koneksi setelah `npm run dev`: buka `http://localhost:3000/api/health`.

Panduan lengkap tersedia di:

- [docs/SETUP_VERCEL.md](./docs/SETUP_VERCEL.md) — setup MongoDB Atlas + deploy Vercel (aktif)
- [PRD.md](./PRD.md) — dokumen kebutuhan produk
- [docs/SETUP_CPANEL.md](./docs/SETUP_CPANEL.md) — rencana cPanel/MySQL lama (arsip)

> Catatan: proyek pindah dari rencana awal cPanel/MySQL ke Vercel/MongoDB.
