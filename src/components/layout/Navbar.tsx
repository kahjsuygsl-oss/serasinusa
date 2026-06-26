import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://www.serasinusa.id/wp-content/uploads/2024/05/logo-serasi-nusa.png"
            alt="Logo Serasi Nusa"
            width={190}
            height={58}
            className="h-12 w-auto"
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">Beranda</Link>
          <Link href="/tentang-kami" className="transition-colors hover:text-primary">Tentang Kami</Link>
          <Link href="/program" className="transition-colors hover:text-primary">Program</Link>
          <Link href="/berita" className="transition-colors hover:text-primary">Berita</Link>
          <Link href="/kontak" className="transition-colors hover:text-primary">Kontak</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/kontak"
            className={buttonVariants({ className: "hidden md:inline-flex rounded-full px-6 shadow-md hover:shadow-lg transition-all" })}
          >
            Donasi
          </Link>
        </div>
      </div>
    </header>
  );
}
