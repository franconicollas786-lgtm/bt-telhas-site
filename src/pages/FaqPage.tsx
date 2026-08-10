import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FAQ_ITEMS } from '../data/faq';
import { Seo } from '../components/Seo';
import { SITE_NAME } from '../site';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <Seo
        title="Perguntas frequentes — atacado de telhas, forros e rodapés"
        description="Dúvidas sobre atacado B2B, entrega na Região dos Lagos, orçamento de telhas e forros em PVC, cobertura de orçamento e condições para instaladores. BTTelhas em Cabo Frio."
        path="/faq"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <article className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <header className="mb-12 text-center md:text-left">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#8cc63f]">Central de ajuda</p>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Perguntas frequentes
            </h1>
            <p className="text-lg leading-relaxed text-gray-600">
              Respostas objetivas sobre atacado de telhas, forros, rodapés e atendimento B2B para profissionais e obras na{' '}
              <strong className="font-semibold text-gray-800">Região dos Lagos</strong> e entorno, com foco em{' '}
              <strong className="font-semibold text-gray-800">Cabo Frio</strong>.
            </p>
          </header>

          <section className="space-y-3" aria-label="Lista de perguntas e respostas">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.id}
                className="group rounded-2xl border border-gray-200 bg-gray-50/80 px-5 py-1 transition-colors open:border-[#8cc63f]/40 open:bg-white"
              >
                <summary className="cursor-pointer list-none py-4 pr-2 text-left font-semibold text-gray-900 marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-3">
                    <span>{item.question}</span>
                    <span
                      className="mt-0.5 shrink-0 text-[#8cc63f] transition-transform group-open:rotate-180"
                      aria-hidden
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </summary>
                <div className="border-t border-gray-100 pb-4 pt-0 text-gray-600 leading-relaxed">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </section>

          <p className="mt-10 text-center text-sm text-gray-500 md:text-left">
            Não encontrou o que precisa?{' '}
            <Link to="/#orcamento" className="font-medium text-[#8cc63f] hover:underline">
              Solicite um orçamento
            </Link>{' '}
            ou fale com a {SITE_NAME} pelo WhatsApp no rodapé do site.
          </p>
        </div>
      </article>
    </>
  );
}
