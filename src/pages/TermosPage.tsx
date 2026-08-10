import { Seo } from '../components/Seo';
import { SITE_NAME } from '../site';

export default function TermosPage() {
  return (
    <>
      <Seo
        title="Termos de uso"
        description={`Condições de uso do site e dos serviços da ${SITE_NAME}.`}
        path="/termos"
      />
      <div className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">Termos de uso</h1>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p className="text-sm text-gray-500">Última atualização: abril de 2026.</p>
            <p>
              Ao acessar o site da {SITE_NAME}, você concorda com estes termos. Se não concordar, interrompa o uso do
              site.
            </p>
            <section aria-labelledby="t1">
              <h2 id="t1" className="mb-3 text-xl font-semibold text-gray-900">
                1. Natureza do site
              </h2>
              <p>
                O conteúdo tem caráter informativo sobre produtos e serviços. Preços, disponibilidade e condições comerciais
                finais são confirmados no atendimento (incluindo WhatsApp), salvo indicação expressa em contrário.
              </p>
            </section>
            <section aria-labelledby="t2">
              <h2 id="t2" className="mb-3 text-xl font-semibold text-gray-900">
                2. Público B2B
              </h2>
              <p>
                A {SITE_NAME} direciona vendas a profissionais e empresas do setor. O uso indevido do site ou de
                informações para fins ilícitos é proibido.
              </p>
            </section>
            <section aria-labelledby="t3">
              <h2 id="t3" className="mb-3 text-xl font-semibold text-gray-900">
                3. Orçamentos e estimativas
              </h2>
              <p>
                Simulações e totais exibidos no formulário de orçamento são estimativas. Frete, impostos aplicáveis e
                condições de pagamento podem alterar o valor final, conforme combinado no atendimento.
              </p>
            </section>
            <section aria-labelledby="t4">
              <h2 id="t4" className="mb-3 text-xl font-semibold text-gray-900">
                4. Propriedade intelectual
              </h2>
              <p>
                Marcas, textos, layout e demais elementos do site são protegidos por legislação aplicável. É vedada a
                reprodução não autorizada.
              </p>
            </section>
            <section aria-labelledby="t5">
              <h2 id="t5" className="mb-3 text-xl font-semibold text-gray-900">
                5. Limitação de responsabilidade
              </h2>
              <p>
                Empregamos boas práticas para manter o site disponível, mas não garantimos operação ininterrupta ou
                ausência de erros. Links externos seguem políticas de terceiros.
              </p>
            </section>
            <section aria-labelledby="t6">
              <h2 id="t6" className="mb-3 text-xl font-semibold text-gray-900">
                6. Contato
              </h2>
              <p>Dúvidas sobre estes termos podem ser encaminhadas pelos canais de contato informados no rodapé do site.</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
