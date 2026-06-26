import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontak - Serasi Nusa',
};

export default function Kontak() {
  return (
    <div className="py-20 min-h-[calc(100vh-100px)]">
      <div className="container mx-auto px-4 max-w-5xl space-y-16">
        <div className="border-b pb-8">
           <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 mb-4">Kontak</h1>
           <p className="text-slate-600 text-xl font-medium">Hubungi kami untuk informasi lebih lanjut mengenai Serasi Nusa Foundation</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pb-8 border-b border-slate-100">
           <div>
              <h6 className="text-sm uppercase tracking-widest text-slate-500 font-semibold mb-2">telepon</h6>
              <p className="font-medium text-lg">Tel: +62 819 1707 1886</p>
           </div>
           <div>
              <h6 className="text-sm uppercase tracking-widest text-slate-500 font-semibold mb-2">donasi</h6>
              <p className="font-medium text-lg">Kantor Serasi Nusa</p>
           </div>
           <div>
              <h6 className="text-sm uppercase tracking-widest text-slate-500 font-semibold mb-2">butuh bantuan</h6>
              <p className="font-medium text-lg text-primary hover:underline cursor-pointer">Hubungi Kami</p>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 pt-8">
           <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-slate-900">Bagaimana kami bisa membantu Anda?</h2>
              <p className="text-slate-700 leading-relaxed">Lembaga kami didedikasikan untuk membantu mereka yang membutuhkan. Hubungi kami untuk mengetahui bagaimana kami dapat membantu Anda.</p>
              
              <div className="pt-4">
                 <h6 className="text-sm uppercase tracking-widest text-slate-500 font-semibold mb-2">Kantor</h6>
                 <p className="font-medium">Jalan Rinjani, Dusun Mibas, Desa Masbagik Utara Baru</p>
              </div>

              <div className="pt-4">
                 <h6 className="text-sm uppercase tracking-widest text-slate-500 font-semibold mb-2">Ikuti kami</h6>
                 <p className="font-medium">Dimana kami bekerja</p>
              </div>
           </div>

           <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-6">Lokasi Kantor Kami</h3>
              <div className="w-full h-64 bg-slate-200 rounded-xl flex items-center justify-center overflow-hidden border border-slate-200">
                 {/* Peta embed placeholder */}
                 <span className="text-slate-400">Peta Google Maps tidak dapat dimuat otomatis (Area Iframe)</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
