import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SITE_NAME, waUrl } from '../site';

const navLinkClass =
  'text-sm font-medium text-gray-600 transition-colors hover:text-[#8cc63f]';
const departmentLinkClass = 'block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-[#8cc63f]';
const departments = [
  { label: 'Forros', slug: 'forros' },
  { label: 'Telhas', slug: 'telhas' },
  { label: 'Ripados', slug: 'ripados' },
  { label: 'Rodapés', slug: 'rodapes' },
  { label: 'Acabamentos', slug: 'acabamentos' },
  { label: 'Acessórios diversos', slug: 'acessorios' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDepartmentMenuOpen, setIsDepartmentMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollYRef = useRef(0);
  const hideTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const clearHideTimeout = () => {
      if (hideTimeoutRef.current !== null) {
        window.clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };

    const scheduleHide = () => {
      clearHideTimeout();
      hideTimeoutRef.current = window.setTimeout(() => {
        if (window.scrollY > 24) {
          setIsHidden(true);
        }
      }, 1000);
    };

    const onScroll = () => {
      const currentY = window.scrollY;
      const isScrollingDown = currentY > lastScrollYRef.current;

      setIsCompact(currentY > 20);

      if (isScrollingDown && currentY > 20) {
        setIsHidden(false);
        scheduleHide();
      } else if (!isScrollingDown) {
        clearHideTimeout();
        setIsHidden(false);
      }

      if (currentY <= 0) {
        setIsCompact(false);
      }

      lastScrollYRef.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearHideTimeout();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{
        y: isHidden ? '-100%' : '0%',
      }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-[height] duration-200 ${isCompact ? 'h-16 md:h-20' : 'h-24 md:h-28'}`}>
          <div className="z-10 flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="flex items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#8cc63f] focus-visible:ring-offset-2"
            >
              <img
                src="/logo.png"
                alt={SITE_NAME}
                width={280}
                height={90}
                className={`w-auto max-w-[min(100%,280px)] object-contain object-left transition-[height] duration-200 ${isCompact ? 'h-12 sm:h-14 md:h-16' : 'h-16 sm:h-20 md:h-24'}`}
                decoding="async"
                fetchPriority="high"
              />
            </Link>
            <button
              type="button"
              className="shrink-0 rounded-lg p-2 text-gray-600 lg:hidden"
              onClick={() => {
                setIsMobileMenuOpen((o) => !o);
                setIsDepartmentMenuOpen(false);
              }}
              aria-expanded={isMobileMenuOpen}
              aria-controls="menu-mobile"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <nav
            className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:flex"
            aria-label="Principal"
          >
            <div className="relative">
              <button
                type="button"
                className={`${navLinkClass} inline-flex items-center`}
                onClick={() => setIsDepartmentMenuOpen((prev) => !prev)}
                aria-expanded={isDepartmentMenuOpen}
                aria-controls="menu-departamentos-desktop"
              >
                Produtos
              </button>
              <AnimatePresence>
                {isDepartmentMenuOpen ? (
                  <motion.div
                    id="menu-departamentos-desktop"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute left-0 top-8 z-50 w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-lg"
                  >
                    <div className="flex flex-col">
                      {departments.map((department) => (
                        <Link
                          key={department.slug}
                          to={`/?departamento=${department.slug}#produtos`}
                          className={departmentLinkClass}
                          onClick={() => setIsDepartmentMenuOpen(false)}
                        >
                          {department.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
            <Link to="/#orcamento" className={navLinkClass} onClick={() => setIsDepartmentMenuOpen(false)}>
              Orçamento rápido
            </Link>
            <Link to="/#sobre" className={navLinkClass} onClick={() => setIsDepartmentMenuOpen(false)}>
              Sobre nós
            </Link>
          </nav>

          <div className="z-10 shrink-0">
            <a
              href={waUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center justify-center rounded-full bg-[#8cc63f] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#8cc63f]/20 transition-all hover:bg-[#7ab332] hover:shadow-lg hover:shadow-[#8cc63f]/40 lg:inline-flex"
            >
              <Phone className="mr-2 h-4 w-4" aria-hidden />
              Fale Conosco
            </a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="menu-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-gray-100 bg-white lg:hidden"
          >
            <div className="flex flex-col gap-4 px-4 py-4">
              <button
                type="button"
                className="text-left text-base font-medium text-gray-800"
                onClick={() => setIsDepartmentMenuOpen((prev) => !prev)}
                aria-expanded={isDepartmentMenuOpen}
                aria-controls="menu-departamentos-mobile"
              >
                Produtos
              </button>
              <AnimatePresence>
                {isDepartmentMenuOpen ? (
                  <motion.div
                    id="menu-departamentos-mobile"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden rounded-lg border border-gray-100 bg-gray-50 p-2"
                  >
                    <div className="flex flex-col">
                      {departments.map((department) => (
                        <Link
                          key={department.slug}
                          to={`/?departamento=${department.slug}#produtos`}
                          className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700"
                          onClick={() => {
                            setIsDepartmentMenuOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {department.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <Link
                to="/#orcamento"
                className="text-base font-medium text-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Orçamento rápido
              </Link>
              <Link
                to="/#sobre"
                className="text-base font-medium text-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sobre nós
              </Link>
              <a
                href={waUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#8cc63f] px-5 py-3 text-sm font-medium text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Phone className="mr-2 h-4 w-4" aria-hidden />
                Fale Conosco
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
