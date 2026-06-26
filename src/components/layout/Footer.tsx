import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300 py-12 space-y-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <Image
            src="https://www.serasinusa.id/wp-content/uploads/2024/05/logo-serasi-nusa.png"
            alt="Logo Serasi Nusa"
            width={190}
            height={58}
            className="h-12 w-auto bg-white p-2 rounded-lg"
          />
          <p className="text-sm leading-relaxed max-w-sm">
            Bertujuan untuk melakukan kajian-kajian dalam bidang literasi, pendidikan, dan sosial kemasyarakatan.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-white font-semibold font-heading text-lg">Menu</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/tentang-kami" className="hover:text-primary transition-colors">Tentang Kami</Link></li>
            <li><Link href="/program" className="hover:text-primary transition-colors">Program</Link></li>
            <li><Link href="/berita" className="hover:text-primary transition-colors">Berita</Link></li>
            <li><Link href="/kontak" className="hover:text-primary transition-colors">Kontak</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-white font-semibold font-heading text-lg">Kontak</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0" />
              <span>Jalan Rinjani, Dusun Mibas, Desa Masbagik Utara Baru</span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone className="h-5 w-5 text-primary shrink-0" />
              <span>+62 819 1707 1886</span>
            </li>
            <li className="flex gap-3 items-center">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <span>admin@serasinusa.id</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-slate-800 pt-8 mt-8 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Serasi Nusa. All rights reserved.</p>
      </div>
    </footer>
  );
}
