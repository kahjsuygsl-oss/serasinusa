# Setup: Vercel + MongoDB Atlas

Panduan menyambungkan Next.js (project ini) ke database **MongoDB Atlas** dan men-deploy ke **Vercel**. Vercel tidak meng-host MongoDB; database berjalan di MongoDB Atlas (cloud), dan aplikasi Next.js di Vercel terhubung ke sana lewat connection string.

## 1. Buat database MongoDB Atlas

1. Daftar/masuk di <https://www.mongodb.com/cloud/atlas>.
2. Buat **Cluster** baru. Tier gratis **M0** sudah cukup untuk mulai.
3. **Database Access** → buat database user (username + password). Catat keduanya.
4. **Network Access** → **Add IP Address**. Karena IP Vercel dinamis, tambahkan `0.0.0.0/0`
   (allow from anywhere). Untuk produksi yang lebih ketat, gunakan daftar IP/Private Endpoint.
5. **Connect** → **Drivers** → salin connection string. Bentuknya:

   ```
   mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

   Sisipkan nama database sebelum tanda `?`, mis. `.../serasinusa?retryWrites=true...`.

> Alternatif: lewat **Vercel Marketplace** (Vercel Dashboard → Integrations → MongoDB Atlas),
> yang otomatis menambahkan `MONGODB_URI` ke Environment Variables project.

## 2. Konfigurasi environment variables

Lokal — salin `.env.example` menjadi `.env.local` lalu isi:

```bash
MONGODB_URI="mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/serasinusa?retryWrites=true&w=majority"
MONGODB_DB="serasinusa"
ADMIN_TOKEN="<string-acak-panjang>"   # mis. hasil: openssl rand -hex 32
```

Di Vercel — **Project → Settings → Environment Variables**, tambahkan ketiga variabel yang sama
(scope: Production + Preview + Development sesuai kebutuhan). `MONGODB_URI` dan `ADMIN_TOKEN`
bersifat rahasia, jangan diberi prefix `NEXT_PUBLIC_`.

## 3. Jalankan & uji lokal

```bash
npm install
npm run dev
```

- Cek koneksi DB: buka <http://localhost:3000/api/health> → `{"status":"ok","database":"connected"}`.
- Isi data contoh (butuh token admin):

  ```bash
  curl -X POST http://localhost:3000/api/seed -H "x-admin-token: <ADMIN_TOKEN>"
  ```

- Buka <http://localhost:3000/berita> — artikel tampil dari MongoDB.
- Buka <http://localhost:3000/kontak> — kirim form, pesan tersimpan ke koleksi `contacts`.

## 4. Deploy ke Vercel

1. Push branch ke GitHub.
2. Di Vercel: **New Project** → import repo. Framework terdeteksi **Next.js** otomatis.
3. Pastikan Environment Variables (langkah 2) sudah di-set.
4. **Deploy**. Setelah selesai, uji `https://<domain-vercel>/api/health`.

Node.js runtime di Vercel sudah ≥ 20, sesuai kebutuhan Next.js 16.

## 5. API yang tersedia

| Method | Endpoint            | Auth (`x-admin-token`) | Keterangan                          |
| ------ | ------------------- | ---------------------- | ----------------------------------- |
| GET    | `/api/health`       | —                      | Cek koneksi database                |
| GET    | `/api/posts`        | opsional (`?all=true`) | Daftar artikel (publik = published) |
| POST   | `/api/posts`        | wajib                  | Buat artikel                        |
| GET    | `/api/posts/:id`    | —                      | Detail artikel by id                |
| PUT    | `/api/posts/:id`    | wajib                  | Perbarui artikel                    |
| DELETE | `/api/posts/:id`    | wajib                  | Hapus artikel                       |
| POST   | `/api/seed`         | wajib                  | Isi artikel contoh                  |

Contoh membuat artikel:

```bash
curl -X POST https://<domain>/api/posts \
  -H "x-admin-token: <ADMIN_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Judul Artikel","content":"<p>Isi</p>","published":true}'
```

## 6. Catatan & langkah lanjut

- `ADMIN_TOKEN` adalah pelindung sementara endpoint tulis. **Panel Admin** dengan login
  email/password (tabel `users` di PRD) dan WYSIWYG editor adalah fase berikutnya — saat itu
  ganti guard token dengan autentikasi sesi/JWT.
- Schema data: koleksi `contacts` dan `posts` (lihat `src/lib/models/`).
