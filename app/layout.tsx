import type { Metadata } from 'next';
import { ToastProvider } from '@/context/ToastContext';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'AI Booking & Inquiry Manager',
    template: '%s | AI Booking Manager',
  },
  description:
    'Manage bookings and customer inquiries with AI-powered clarity. Centralize requests, automate summaries, classify inquiries, and respond faster.',
  keywords: ['booking', 'AI', 'inquiry management', 'scheduling', 'dashboard'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-slate-900 font-sans antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
