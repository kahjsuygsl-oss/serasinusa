import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Program - Serasi Nusa',
};

export default function Program() {
  return (
    <div className="py-20 min-h-[calc(100vh-100px)]">
      <div className="container mx-auto px-4 max-w-5xl space-y-16">
        <div className="border-b pb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 mb-4">Program</h1>
          <p className="text-slate-600 text-xl font-medium">Berbagai program menarik kami tawarkan untuk masyarakat</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold font-heading text-slate-900">Every small act of kindness creates a ripple of positive change.</h2>
          <p className="text-slate-700 text-lg leading-relaxed">Join us in creating a positive change with our non-profit organization. Even the smallest act of kindness can make a significant impact on the lives of those in need. Come be a part of our cause today!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 pt-8">
           <div className="space-y-4">
             <h5 className="font-bold text-xl font-heading text-slate-800">How we work</h5>
             <p className="text-slate-600 leading-relaxed">We collaborate with local communities, volunteers, and donors to achieve our goal of making a meaningful impact on people&apos;s lives. Our non-profit organization strives to make a positive difference in society by supporting those in need.</p>
             <Link href="#" className="inline-block text-primary font-semibold hover:underline mt-2">Learn More</Link>
           </div>
           
           <div className="space-y-4">
             <h5 className="font-bold text-xl font-heading text-slate-800">Proofing our impact</h5>
             <p className="text-slate-600 leading-relaxed">We are committed to transparency and accountability which is why we regularly share our impact reports with our donors. Our non-profit organization&apos;s work is evidence-based, and we consistently strive to improve our impact through innovative solutions.</p>
             <Link href="#" className="inline-block text-primary font-semibold hover:underline mt-2">See Proof</Link>
           </div>
        </div>
      </div>
    </div>
  )
}
