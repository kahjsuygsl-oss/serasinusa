/**
 * Penjaga sederhana untuk endpoint tulis (create/update/delete) artikel.
 *
 * Ini BUKAN sistem autentikasi penuh — hanya pelindung sementara berbasis token
 * rahasia (header `x-admin-token`). Untuk Panel Admin produksi, ganti dengan
 * autentikasi sesi/JWT (lihat PRD bagian "Autentikasi Aman").
 */
export function isAuthorized(request: Request): boolean {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false;

  const provided =
    request.headers.get('x-admin-token') ??
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ??
    '';

  return provided.length > 0 && provided === expected;
}
