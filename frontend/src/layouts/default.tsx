import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="mx-auto max-w-12xl px-6 flex-grow pt-8">{children}</main>
      <Footer />
    </div>
  );
}
