import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Berita & Kegiatan - Serasi Nusa',
};

const posts = [
  { id: 1, title: 'Kemampuan Membaca Anak Indonesia: Analisis Mendalam dan Strategi Peningkatan', snippet: 'Ringkasan Eksekutif Kemampuan membaca merupakan fondasi krusial bagi perkembangan anak dan kemajuan bangsa. Namun, kondisi kemampuan membaca anak-anak di Indonesia' },
  { id: 2, title: 'Urgensi Literasi Digital di Indonesia', snippet: 'Masih segar dalam ingatan kita beberapa waktu lalu jagat maya dihebohkan dengan adanya temuan Microsoft bahwa netizen (baca: warganet) Indonesia' },
  { id: 3, title: 'Why a startup fails if they had a strategy?', snippet: 'Strategy is a general plan to achieve one or more long-term or overall goals under conditions of uncertainty but it doesn’t always goes according to plan.' },
];

const inspiringTales = [
  { title: "The Special One", desc: "Join our non-profit organisation to help create a brighter future for those in need. Every donation counts towards making a difference in the lives of those less fortunate." },
  { title: "A Better Education for Everyone", desc: "Our non-profit organisation is dedicated to improving access to education for all. With your support, we can help provide the resources and opportunities needed for success." },
  { title: "The Special One", desc: "Join our non-profit organisation to help create a brighter future for those in need. Every donation counts towards making a difference in the lives of those less fortunate." },
  { title: "A Better Education for Everyone", desc: "Our non-profit organisation is dedicated to improving access to education for all. With your support, we can help provide the resources and opportunities needed for success." }
];

export default function Berita() {
  return (
    <div className="py-20 container mx-auto px-4 max-w-5xl min-h-screen space-y-16">
       <div className="border-b pb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 mb-4">Kegiatan</h1>
          <p className="text-slate-600 text-xl font-medium">Temukan berbagai Berita dan Kegiatan menarik</p>
       </div>
       
       <div className="space-y-12">
          {posts.map(post => (
            <article key={post.id} className="border-b border-slate-100 pb-8 last:border-0">
               <h3 className="text-2xl font-bold font-heading text-slate-900 mb-3 hover:text-primary transition-colors">
                  <Link href={`#`}>{post.title}</Link>
               </h3>
               <p className="text-slate-600 mb-4 leading-relaxed">{post.snippet}</p>
               <Link href={`#`} className="text-primary font-medium hover:underline">Baca Selengkapnya »</Link>
            </article>
          ))}
       </div>

       <div className="pt-16 border-t border-slate-200">
          <h2 className="text-3xl font-bold font-heading text-slate-900 mb-4">Inspiring tales of transformation</h2>
          <p className="text-slate-600 mb-8 max-w-2xl">Get inspired by the remarkable stories of transformation through our non-profit organization. Join us in making a positive impact today.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
             {inspiringTales.map((tale, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:shadow-lg transition-transform hover:-translate-y-1 cursor-pointer">
                   <h5 className="font-bold text-lg mb-3">{tale.title}</h5>
                   <p className="text-slate-600 mb-4 text-sm leading-relaxed">{tale.desc}</p>
                   <Link href="#" className="text-primary text-sm font-semibold hover:underline">Read More</Link>
                </div>
             ))}
          </div>
       </div>
    </div>
  )
}
