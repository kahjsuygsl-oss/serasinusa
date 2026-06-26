# Setup cPanel + MySQL/MariaDB

Dokumen ini menjelaskan cara menyiapkan project Serasi Nusa Redev untuk lingkungan lokal dan deployment ke cPanel dengan database MySQL/MariaDB.

## 1. Kebutuhan Minimal
- Node.js `>=20.9.0`
- npm
- cPanel dengan fitur **Setup Node.js App** atau fitur sejenis
- MySQL/MariaDB dari cPanel
- Akses File Manager, Terminal/SSH, atau Git di cPanel
- Domain atau subdomain yang diarahkan ke aplikasi

Project memakai Next.js `16.2.4`, sehingga Node.js 18 tidak cukup.

## 2. Setup Lokal
Jalankan dari folder project:

```bash
npm install
npm run lint
npm run build
npm run dev
```

Buka:

```text
http://localhost:3000
```

## 3. Membuat Database di cPanel
1. Masuk ke cPanel.
2. Buka menu **MySQL Databases**.
3. Buat database baru, contoh:

```text
serasinusa_app
```

4. Buat user database baru, contoh:

```text
serasinusa_user
```

5. Beri user tersebut akses ke database dengan **All Privileges**.
6. Catat informasi berikut:

```text
DB_HOST=localhost
DB_PORT=3306
DB_NAME=nama_database_dari_cpanel
DB_USER=nama_user_dari_cpanel
DB_PASSWORD=password_user_database
```

Di banyak cPanel, nama database dan user akan otomatis diberi prefix akun hosting, misalnya `akunhosting_serasinusa_app`.

## 4. Environment Variable
Buat environment variable di cPanel Node.js App atau file `.env.production` sesuai dukungan hosting.

Contoh:

```env
DATABASE_URL="mysql://akunhosting_serasinusa_user:password@localhost:3306/akunhosting_serasinusa_app"
NEXT_PUBLIC_SITE_URL="https://domain-anda.com"
ADMIN_EMAIL="admin@domain-anda.com"
ADMIN_PASSWORD="ganti-dengan-password-kuat"
```

Jika password database memakai karakter khusus seperti `@`, `#`, `/`, atau `:`, karakter tersebut perlu di-URL-encode. Contoh `@` menjadi `%40`.

## 5. SQL Schema Awal
Skema ini bisa dijalankan dari phpMyAdmin pada database yang sudah dibuat. Aplikasi tetap sebaiknya menghasilkan UUID dari sisi backend/ORM agar kompatibel dengan berbagai versi MySQL/MariaDB di cPanel.

```sql
CREATE TABLE users (
  id CHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(191) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id CHAR(36) NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content LONGTEXT NOT NULL,
  featured_image VARCHAR(500) NULL,
  published TINYINT(1) NOT NULL DEFAULT 0,
  author_id CHAR(36) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_posts_author_id (author_id),
  INDEX idx_posts_published_created_at (published, created_at),
  CONSTRAINT fk_posts_author
    FOREIGN KEY (author_id)
    REFERENCES users(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

CREATE TABLE contacts (
  id CHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(191) NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_contacts_created_at (created_at)
);
```

## 6. Jika Menggunakan Prisma
Prisma belum terpasang di project saat ini. Jika backend database mulai diimplementasikan, gunakan konfigurasi MySQL:

```bash
npm install @prisma/client
npm install -D prisma
npx prisma init --datasource-provider mysql
```

Pastikan `.env` berisi:

```env
DATABASE_URL="mysql://user:password@localhost:3306/nama_database"
```

Untuk production cPanel:

```bash
npx prisma generate
npx prisma migrate deploy
```

Gunakan `migrate deploy` di server production, bukan `migrate dev`.

## 7. Jika Menggunakan Drizzle
Drizzle belum terpasang di project saat ini. Jika memilih Drizzle, gunakan driver MySQL:

```bash
npm install drizzle-orm mysql2
npm install -D drizzle-kit
```

Atur koneksi menggunakan `DATABASE_URL` dari cPanel.

## 8. Deployment Next.js ke cPanel
Pastikan cPanel menyediakan Node.js `>=20.9.0`.

Langkah umum:
1. Masuk ke cPanel.
2. Buka **Setup Node.js App**.
3. Buat aplikasi baru.
4. Pilih Node.js versi `20.9.0` atau lebih baru.
5. Pilih mode `production`.
6. Arahkan application root ke folder project.
7. Tambahkan environment variable dari bagian 4.
8. Upload project atau pull dari Git.
9. Jalankan dependency install:

```bash
npm ci
```

10. Build aplikasi:

```bash
npm run build
```

11. Jalankan aplikasi:

```bash
npm run start
```

Jika panel cPanel meminta startup file dan tidak bisa menjalankan `npm run start`, gunakan pengaturan yang disediakan hosting untuk menjalankan command `next start`. Beberapa hosting cPanel membutuhkan konfigurasi tambahan dari provider karena Next.js berjalan sebagai server Node.js, bukan file PHP biasa.

## 9. Static Hosting Fallback
Jika cPanel tidak mendukung Node.js `>=20.9.0`, aplikasi tidak dapat menjalankan Next.js server secara penuh.

Alternatif:
- Gunakan hosting lain yang mendukung Node.js modern.
- Atau ubah project menjadi static export untuk halaman publik saja.

Static export tidak cocok untuk:
- Panel admin
- Login admin
- CRUD artikel
- Form kontak yang menyimpan ke database
- Route Handler/API dinamis

## 10. Checklist Production
- `npm run lint` sukses.
- `npm run build` sukses.
- Database MySQL/MariaDB sudah dibuat.
- User database sudah diberi All Privileges.
- `DATABASE_URL` sudah benar.
- Node.js cPanel minimal `20.9.0`.
- Domain/subdomain sudah diarahkan ke aplikasi.
- SSL aktif.
- Password admin awal diganti dengan password kuat.
- Backup database cPanel dijadwalkan rutin.
