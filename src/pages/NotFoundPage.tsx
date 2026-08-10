import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Seo } from '../components/Seo';

export default function NotFoundPage() {
  const { pathname, search } = useLocation();

  return (
    <>
      <Seo
        title="Página não encontrada"
        description="O endereço solicitado não existe ou foi movido."
        path={`${pathname}${search}`}
        noIndex
        omitCanonical
      />
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-gray-50 px-4 py-20 text-center">
        <p className="mb-2 text-6xl font-extrabold text-[#8cc63f]">404</p>
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Página não encontrada</h1>
        <p className="mb-8 max-w-md text-gray-600">
          Verifique o endereço digitado ou volte à página inicial para continuar navegando.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-[#8cc63f] px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-[#7ab332]"
        >
          <Home className="h-5 w-5" aria-hidden />
          Ir para o início
        </Link>
      </div>
    </>
  );
}
