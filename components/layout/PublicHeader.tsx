'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Menu, X, ChevronRight } from 'lucide-react';

export default function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-slate-900">BookingAI</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <a href="#features" className="px-3.5 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium rounded-lg hover:bg-zinc-50 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="px-3.5 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium rounded-lg hover:bg-zinc-50 transition-colors">
              How it works
            </a>
            <a href="#testimonials" className="px-3.5 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium rounded-lg hover:bg-zinc-50 transition-colors">
              Testimonials
            </a>
            <a href="#faq" className="px-3.5 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium rounded-lg hover:bg-zinc-50 transition-colors">
              FAQ
            </a>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin/login"
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 rounded-lg hover:bg-zinc-50 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/book"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Book a demo
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-zinc-50 transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 py-3 space-y-1">
          <a href="#features" className="block px-3 py-2.5 text-sm text-slate-700 hover:bg-zinc-50 rounded-lg font-medium">Features</a>
          <a href="#how-it-works" className="block px-3 py-2.5 text-sm text-slate-700 hover:bg-zinc-50 rounded-lg font-medium">How it works</a>
          <a href="#testimonials" className="block px-3 py-2.5 text-sm text-slate-700 hover:bg-zinc-50 rounded-lg font-medium">Testimonials</a>
          <a href="#faq" className="block px-3 py-2.5 text-sm text-slate-700 hover:bg-zinc-50 rounded-lg font-medium">FAQ</a>
          <div className="pt-2 border-t border-zinc-100 flex flex-col gap-2">
            <Link href="/admin/login" className="px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-zinc-50 rounded-lg text-center">Sign in</Link>
            <Link href="/book" className="px-3 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold text-center hover:bg-indigo-700">Book a demo</Link>
          </div>
        </div>
      )}
    </header>
  );
}
