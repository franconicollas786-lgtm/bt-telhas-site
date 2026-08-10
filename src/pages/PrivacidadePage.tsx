import { Seo } from '../components/Seo';
import { SITE_NAME } from '../site';

export default function PrivacidadePage() {
  return (
    <>
      <Seo
        title="Política de privacidade"
        description={`Como a ${SITE_NAME} trata dados pessoais em conformidade com a LGPD.`}
        path="/privacidade"
      />
      <div className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">Política de privacidade</h1>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p className="text-sm text-gray-500">Última atualização: abril de 2026.</p>
            <p>
              A {SITE_NAME} respeita a privacidade dos visitantes e clientes. Este documento descreve de forma clara como
              tratamos informações quando você utiliza nosso site e nossos canais de contato (incluindo WhatsApp).
            </p>
            <section aria-labelledby="p1">
              <h2 id="p1" className="mb-3 text-xl font-semibold text-gray-900">
                1. Dados que podemos coletar
              </h2>
              <p>
                Ao solicitar orçamento ou entrar em contato, podemos receber nome, telefone, endereço de entrega, nome da
                empresa e dados do pedido informados voluntariamente por você. Também coletamos dados técnicos básicos do
                navegador (como tipo de dispositivo e páginas acessadas) por meio de tecnologias comuns da web, quando
                aplicável ao provedor de hospedagem.
              </p>
            </section>
            <section aria-labelledby="p2">
              <h2 id="p2" className="mb-3 text-xl font-semibold text-gray-900">
                2. Finalidades
              </h2>
              <p>
                Utilizamos os dados para responder solicitações, elaborar orçamentos, viabilizar entregas e prestar
                atendimento comercial. Mensagens enviadas por WhatsApp são processadas conforme os termos da plataforma
                Meta/WhatsApp.
              </p>
            </section>
            <section aria-labelledby="p3">
              <h2 id="p3" className="mb-3 text-xl font-semibold text-gray-900">
                3. Base legal (LGPD)
              </h2>
              <p>
                O tratamento fundamenta-se na execução de procedimentos preliminares ou de contrato a pedido do titular,
                no legítimo interesse para segurança e melhoria do atendimento, e no consentimento quando exigido (por
                exemplo, para comunicações opcionais).
              </p>
            </section>
            <section aria-labelledby="p4">
              <h2 id="p4" className="mb-3 text-xl font-semibold text-gray-900">
                4. Compartilhamento
              </h2>
              <p>
                Não vendemos seus dados. Podemos compartilhar informações apenas com prestadores necessários à operação
                (ex.: transportadoras) ou quando houver obrigação legal.
              </p>
            </section>
            <section aria-labelledby="p5">
              <h2 id="p5" className="mb-3 text-xl font-semibold text-gray-900">
                5. Seus direitos
              </h2>
              <p>
                Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade ou eliminação
                de dados, conforme a Lei nº 13.709/2018. Para exercer seus direitos, entre em contato pelos canais
                indicados no site.
              </p>
            </section>
            <section aria-labelledby="p6">
              <h2 id="p6" className="mb-3 text-xl font-semibold text-gray-900">
                6. Retenção
              </h2>
              <p>
                Mantemos os dados pelo tempo necessário para cumprir as finalidades descritas e obrigações legais,
                aplicando medidas de segurança compatíveis com o tipo de informação.
              </p>
            </section>
            <section aria-labelledby="p7">
              <h2 id="p7" className="mb-3 text-xl font-semibold text-gray-900">
                7. Alterações
              </h2>
              <p>
                Esta política pode ser atualizada. A data no topo desta página indica a versão vigente. Recomendamos
                revisitar o documento periodicamente.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
