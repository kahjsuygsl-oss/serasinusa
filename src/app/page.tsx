import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Lightbulb, Presentation } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center bg-slate-900 overflow-hidden">
        {/* Placeholder image background */}
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2000')" }}
        />
        <div className="container mx-auto px-4 z-10 text-white space-y-6">
          <span className="text-secondary font-medium tracking-wider uppercase text-sm">Yayasan Suluh Literasi Nusantara</span>
          <h1 className="text-5xl md:text-6xl font-bold font-heading leading-tight max-w-4xl">
            Mewujudkan Masyarakat Literat, Berdaya dan Berkarakter
          </h1>
          <div className="pt-4">
            <Link
              href="/program"
              className={buttonVariants({ size: "lg", className: "rounded-full px-8 text-white text-lg" })}
            >
              Lihat Program Kami
            </Link>
          </div>
        </div>
      </section>

      {/* Tentang Kami Snippet */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-primary font-semibold uppercase tracking-widest text-sm">Tentang Kami</h2>
            <h3 className="text-4xl font-bold font-heading text-slate-900">Serasi Nusa Foundation</h3>
            <p className="text-lg text-slate-700 leading-relaxed">
              Yayasan Suluh Literasi Nusantara merupakan Lembaga yang bergerak di bidang peningkatan literasi Masyarakat. Tidak hanya dalam bidang enam literasi dasar tetapi juga bergerak dalam bidang literasi lainnya sesuai dengan kebutuhan Masyarakat dan perkembangan zaman. 
            </p>
            <Link
              href="/tentang-kami"
              className={buttonVariants({ variant: "outline", className: "rounded-full mt-4" })}
            >
              Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl relative h-[400px]">
             <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800')" }}
              />
          </div>
        </div>
      </section>

      {/* Program Kami Snippet */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-secondary-foreground font-semibold uppercase tracking-widest text-sm">Layanan</h2>
            <h3 className="text-4xl font-bold font-heading text-slate-900">Program Kami</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all border border-slate-100 group">
              <BookOpen className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-xl mb-4">01. Pelatihan Keterampilan Berbahasa</h4>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all border border-slate-100 group">
              <Lightbulb className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-xl mb-4">02. Pelatihan Menulis Fiksi dan Non Fiksi</h4>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all border border-slate-100 group">
              <Users className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-xl mb-4">03. Pelatihan Keterampilan Pemuda</h4>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all border border-slate-100 group">
              <Presentation className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-xl mb-4">04. Pelatihan Public Speaking</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Donasi */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold font-heading">Ciptakan masa depan yang lebih baik</h2>
          <p className="text-xl text-primary-foreground/90 leading-relaxed">
            Setiap rupiah sangat berarti & membantu kami membawa harapan dan sumber daya penting bagi mereka yang membutuhkan.
          </p>
          <Link
            href="/kontak"
            className={buttonVariants({
              size: "lg",
              variant: "secondary",
              className: "rounded-full px-10 text-primary font-bold text-lg mt-4 shadow-xl hover:scale-105 transition-transform",
            })}
          >
            Donasi Sekarang
          </Link>
        </div>
      </section>
    </>
  );
}
