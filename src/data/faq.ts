/**
 * Perguntas frequentes — usado na página /faq e no JSON-LD (FAQPage) para SEO.
 */
export type FaqItem = {
  id: string;
  question: string;
  /** Texto plano para schema.org (sem HTML). */
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'quem-compra-atacado',
    question: 'A BTTelhas vende para o público em geral ou só para empresas e profissionais?',
    answer:
      'Somos um atacadista B2B: vendemos telhas, forros em PVC, rodapés, ripados e acessórios para instaladores, construtoras e profissionais da construção civil. O foco é quem compra em volume para obra. Se você é profissional ou empresa do setor, fale conosco pelo WhatsApp ou use o orçamento no site para ver condições e disponibilidade.',
  },
  {
    id: 'regiao-entrega-cabo-frio',
    question: 'A BTTelhas atende só Cabo Frio ou faz entrega em outras cidades do Rio de Janeiro?',
    answer:
      'Nossa base fica em Cabo Frio (Porto do Carro), na Região dos Lagos. Atendemos a região e combinamos entrega e prazos conforme disponibilidade de estoque e logística. Para obras em outros municípios do RJ, entre em contato informando endereço e produtos: avaliamos frete e prazo no atendimento.',
  },
  {
    id: 'como-pedir-orcamento-telhas-forros',
    question: 'Como pedir orçamento de telhas, forros ou rodapés com preço de atacado?',
    answer:
      'Você pode usar o catálogo online para ver referências e valores orientativos, selecionar produtos para consultar disponibilidade no WhatsApp ou preencher o formulário de orçamento rápido enviando os dados para nosso WhatsApp. Informe quantidades, local de entrega e, se possível, comparativo com outro orçamento: trabalhamos para oferecer condição competitiva para profissionais.',
  },
  {
    id: 'cobre-orcamento-concorrente',
    question: 'A BTTelhas cobre orçamento de outro fornecedor de telhas ou forros?',
    answer:
      'Sim. Traga o orçamento ou a lista de itens com quantidades e marcas quando possível. Analisamos e buscamos equiparar ou melhorar a proposta, conforme disponibilidade de produto e condições comerciais. Esse é um dos diferenciais para instaladores e obras que precisam fechar custo.',
  },
  {
    id: 'quais-produtos-linha',
    question: 'Quais tipos de produtos a BTTelhas trabalha além de telhas?',
    answer:
      'Trabalhamos com uma linha ampla para cobertura e acabamento: telhas (incluindo fibrocimento, ecológicas, coloniais, translúcidas e acessórios como cumeeiras), forros em PVC (lisos, frisados, madeirados, normatizados), ripados e painéis, rodapés, perfis e acabamentos diversos, além de itens complementares para obra. O catálogo no site reúne as principais referências com preços para atacado.',
  },
  {
    id: 'prazo-estoque-disponibilidade',
    question: 'Os produtos do catálogo estão sempre em estoque? Qual o prazo de entrega?',
    answer:
      'Disponibilidade e prazo variam por item, cor e volume. Use a opção de consultar disponibilidade no WhatsApp ou fale com nossa equipe informando produto e quantidade. Assim confirmamos estoque, prazo de separação e previsão de entrega na sua região, inclusive para pedidos maiores ou materiais sob consulta.',
  },
  {
    id: 'formas-pagamento-b2b',
    question: 'Quais formas de pagamento e condições existem para compras no atacado?',
    answer:
      'No site exibimos referência em dinheiro ou Pix e, quando aplicável, valor no cartão. Condições finais (parcelamento, prazos e descontos para volume) são alinhadas diretamente no atendimento B2B, conforme perfil do cliente e do pedido. Chame no WhatsApp para negociar sua compra.',
  },
];
