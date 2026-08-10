import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppFloat } from './WhatsAppFloat';
import { ScrollToTop } from './ScrollToTop';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <a href="#conteudo-principal" className="skip-link">
        Ir para o conteúdo
      </a>
      <ScrollToTop />
      <Header />
      <main id="conteudo-principal">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
