import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-white">BookingAI</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              The intelligent booking and inquiry management platform built for modern businesses.
            </p>
            <div className="flex gap-3 mt-5">
              {['Twitter', 'LinkedIn', 'GitHub'].map((s) => (
                <a key={s} href="#" className="text-xs text-slate-500 hover:text-white transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Product</h3>
            <ul className="space-y-2.5">
              {['Features', 'Pricing', 'Changelog', 'Roadmap', 'API Docs'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Industries</h3>
            <ul className="space-y-2.5">
              {['Restaurants', 'Hotels', 'Salons', 'Clinics', 'Coaches', 'Legal'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Company</h3>
            <ul className="space-y-2.5">
              {['About', 'Blog', 'Careers', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} BookingAI. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
