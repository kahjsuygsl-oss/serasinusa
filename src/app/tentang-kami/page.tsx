import { Metadata } from 'next';
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Tentang Kami - Serasi Nusa',
};

export default function TentangKami() {
  return (
    <div className="py-20 min-h-[calc(100vh-200px)]">
      <div className="container mx-auto px-4 max-w-5xl space-y-16">
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mt-4 text-slate-900 border-b pb-4">Tentang</h1>
            <h2 className="text-xl md:text-2xl text-slate-600 mt-4">Yayasan Suluh Literasi Nusantara</h2>
        </div>
        
        <div className="prose prose-lg prose-slate mx-auto text-slate-700 leading-relaxed max-w-4xl space-y-8">
          <div>
            <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4">Yayasan Suluh Literasi Nusantara</h3>
            <p>Merupakan Lembaga yang bergerak di bidang peningkatan literasi Masyarakat. Tidak hanya dalam bidang enam literasi dasar tetapi juga bergerak dalam bidang literasi lainnya sesuai dengan kebutuhan Masyarakat dan perkembangan zaman. Selain itu, Yayasan Suluh Literasi Nusantara atau dengan nama lain SERASI NUSA FOUNDATION bertujuan untuk melakukan kajian-kajian dalam bidang literasi, Pendidikan, dan social kemasyarakatan yang bisa digunakan sebagai masukan kepada pemerintah dan pemangku kepentingan lainnya untuk dapat diterapkan dalam berbagai kebijakan dan program kegiatan.</p>
          </div>

          <div>
             <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4">Visi & Misi</h3>
             <p className="font-medium">Mewujudkan masyarakat literat, berdaya dan berkarakter.</p>
             <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Menyediakan bahan literasi dan akses informasi untuk masyarakat</li>
                <li>Menumbuhkembangkan budaya baca di tengah masyarakat</li>
                <li>Melaksanakan aktifitas edukatif-rekreatif bagi anak dan pemuda</li>
                <li>Melatih keterampilan soft skill</li>
                <li>Melaksanakan pelatihan keterampilan kecakapan hidup</li>
                <li>Menumbuhkan karakter kebangsaan melalui bahan bacaan dan aktifitas bermakna</li>
                <li>Melakukan kajian-kajian ilmiah dalam bidang literasi, pendidikan, dan sosial kemasyarakatan lainnya</li>
             </ul>
          </div>

          <div>
             <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4">Tujuan</h3>
             <p>Berikut tujuan dari Serasi Nusa Foundation</p>
             <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Pengadaan buku bacaan berkualitas non pelajaran bagi anak usia dini dan orang dewasa</li>
                <li>Memberikan layanan baca kepada anak usia dini dan dewasa</li>
                <li>Meningkatkan kemampuan baca anak usia dini dan kelas awal</li>
                <li>Menyediakan akses informasi kepada masyarakat berupa koran, majalah, bulletin, dan tabloid baik cetak maupun digital</li>
                <li>Meningkatkan keterampilan masyarakat dalam hal kecakapan hidup sesuai dengan kondisi sosial masyarakat</li>
                <li>Meningkatkan kemampuan soft skill maupun hard skill bagi anak usia dini dan pemuda</li>
                <li>Menerbitkan hasil kajian ilmiah dalam bidang literasi, Pendidikan, dan social kemasyarakatan lainnya</li>
             </ul>
          </div>
          
          <div>
             <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4">TIM Kerja</h3>
             <h4 className="text-xl font-semibold mb-2">Struktur Kepengurusan Serasi Nusa Foundation</h4>
             <p className="mt-4">Every dollar counts and helps us bring hope, joy, and essential resources to those in need. Together, we can create a better tomorrow.</p>
             <Link href="/kontak" className={buttonVariants({ className: "mt-4" })}>
                Donate Today
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
