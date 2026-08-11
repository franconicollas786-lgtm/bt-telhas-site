import { Link } from 'react-router-dom';
import { Phone, MapPin, ExternalLink } from 'lucide-react';
import { IconFacebook, IconInstagram, IconWhatsApp } from './SocialBrandIcons';
import { ADDRESS_FULL, GOOGLE_MAPS_URL, PHONE_DISPLAY, SITE_NAME, facebookHref, instagramHref, waUrl } from '../site';

const iconWrap =
  'flex h-11 w-11 items-center justify-center rounded-full bg-gray-50 text-gray-600 transition-colors hover:bg-brand-ink hover:text-white';

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white pt-7 pb-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-6">
          <div className="md:col-span-2">
            <Link
              to="/"
              className="mb-2 inline-flex items-center max-w-full rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#8cc63f] focus-visible:ring-offset-2"
            >
              <img
                src="/logo.png"
                alt={SITE_NAME}
                width={280}
                height={90}
                className="h-9 w-auto max-w-full object-contain object-left sm:h-10 md:h-12"
                decoding="async"
              />
            </Link>
            <p className="mb-2 max-w-sm text-xs leading-snug text-gray-500">
              Referência em forros, telhas e painéis ripados na Região dos Lagos.
            </p>
            <div className="mb-2 max-w-md">
              <p className="mb-1 flex items-start gap-2 text-xs leading-snug text-gray-700">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-ink" aria-hidden />
                <span>{ADDRESS_FULL}</span>
              </p>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-brand-ink bg-white px-2.5 py-1 text-xs font-semibold text-brand-ink transition-colors hover:bg-brand-ink hover:text-white"
              >
                <ExternalLink className="h-3 w-3" aria-hidden />
                Ver no mapa
              </a>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={instagramHref()}
                target="_blank"
                rel="noopener noreferrer"
                className={iconWrap}
                aria-label="Instagram"
              >
                <IconInstagram />
              </a>
              <a
                href={facebookHref()}
                target="_blank"
                rel="noopener noreferrer"
                className={iconWrap}
                aria-label="Facebook"
              >
                <IconFacebook />
              </a>
              <a href={waUrl()} target="_blank" rel="noopener noreferrer" className={iconWrap} aria-label="WhatsApp">
                <IconWhatsApp />
              </a>
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-xs font-bold text-gray-900">Navegação</h2>
            <ul className="space-y-1">
              <li>
                <Link to="/#produtos" className="text-xs text-gray-500 transition-colors hover:text-brand-ink">
                  Catálogo de produtos
                </Link>
              </li>
              <li>
                <Link to="/#sobre" className="text-xs text-gray-500 transition-colors hover:text-brand-ink">
                  Sobre a {SITE_NAME}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-xs text-gray-500 transition-colors hover:text-brand-ink">
                  Perguntas frequentes
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-xs text-gray-500 transition-colors hover:text-brand-ink">
                  Política de privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos" className="text-xs text-gray-500 transition-colors hover:text-brand-ink">
                  Termos de uso
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-xs font-bold text-gray-900">Contato</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Phone className="mr-2 mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-ink" aria-hidden />
                <a
                  href={waUrl()}
                  className="text-xs text-gray-500 hover:text-brand-ink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-ink" aria-hidden />
                <div className="text-xs text-gray-500">
                  <p className="mb-1 leading-snug">{ADDRESS_FULL}</p>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-brand-ink hover:underline"
                  >
                    <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
                    Ver no mapa
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-5">
          <p className="text-center text-xs text-gray-400 md:text-left">
            © {new Date().getFullYear()} {SITE_NAME}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
