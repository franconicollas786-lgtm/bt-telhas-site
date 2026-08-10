-- Banco de dados sugerido para o site BTTelhas
-- Compatível com MySQL 8+ / MariaDB 10.4+

SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE DATABASE IF NOT EXISTS bttelhas
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE bttelhas;

-- =========================
-- Tabelas de catálogo
-- =========================

CREATE TABLE IF NOT EXISTS categories (
  id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(60) NOT NULL,
  name VARCHAR(80) NOT NULL,
  sort_order TINYINT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categories_slug (slug),
  UNIQUE KEY uq_categories_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(20) NOT NULL,
  category_id TINYINT UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NULL,
  price_cash DECIMAL(10,2) NOT NULL,
  price_card DECIMAL(10,2) NULL,
  unit_label VARCHAR(20) NOT NULL,
  image_url VARCHAR(500) NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_products_category (category_id),
  KEY idx_products_name (name),
  CONSTRAINT fk_products_category
    FOREIGN KEY (category_id) REFERENCES categories (id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS product_images (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  product_id VARCHAR(20) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  sort_order TINYINT UNSIGNED NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_product_images_product (product_id),
  CONSTRAINT fk_product_images_product
    FOREIGN KEY (product_id) REFERENCES products (id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================
-- FAQ
-- =========================

CREATE TABLE IF NOT EXISTS faq_items (
  id VARCHAR(80) NOT NULL,
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  sort_order TINYINT UNSIGNED NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_faq_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================
-- Solicitações de orçamento
-- =========================

CREATE TABLE IF NOT EXISTS quote_requests (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  customer_name VARCHAR(140) NOT NULL,
  company_name VARCHAR(140) NULL,
  contact_number VARCHAR(40) NOT NULL,
  delivery_address VARCHAR(255) NOT NULL,
  source_channel VARCHAR(30) NOT NULL DEFAULT 'site',
  status ENUM('novo', 'em_atendimento', 'fechado', 'cancelado') NOT NULL DEFAULT 'novo',
  notes TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_quote_requests_status (status),
  KEY idx_quote_requests_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS quote_request_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  quote_request_id BIGINT UNSIGNED NOT NULL,
  product_id VARCHAR(20) NULL,
  product_name_snapshot VARCHAR(255) NOT NULL,
  quantity DECIMAL(12,2) NOT NULL,
  unit_label_snapshot VARCHAR(20) NOT NULL,
  unit_price_cash_snapshot DECIMAL(10,2) NOT NULL,
  unit_price_card_snapshot DECIMAL(10,2) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_quote_request_items_quote (quote_request_id),
  KEY idx_quote_request_items_product (product_id),
  CONSTRAINT fk_quote_request_items_quote
    FOREIGN KEY (quote_request_id) REFERENCES quote_requests (id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_quote_request_items_product
    FOREIGN KEY (product_id) REFERENCES products (id)
    ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================
-- Seed mínimo alinhado ao site atual
-- =========================

INSERT INTO categories (slug, name, sort_order) VALUES
  ('telhas', 'Telhas', 1),
  ('forros', 'Forros', 2),
  ('ripados', 'Ripados e Painéis', 3),
  ('rodapes', 'Rodapés', 4),
  ('acabamentos', 'Acabamentos', 5),
  ('acessorios', 'Acessórios e Diversos', 6)
ON DUPLICATE KEY UPDATE
  slug = VALUES(slug),
  name = VALUES(name),
  sort_order = VALUES(sort_order);

INSERT INTO faq_items (id, question, answer, sort_order) VALUES
  (
    'quem-compra-atacado',
    'A BTTelhas vende para o público em geral ou só para empresas e profissionais?',
    'Somos um atacadista B2B: vendemos telhas, forros em PVC, rodapés, ripados e acessórios para instaladores, construtoras e profissionais da construção civil. O foco é quem compra em volume para obra. Se você é profissional ou empresa do setor, fale conosco pelo WhatsApp ou use o orçamento no site para ver condições e disponibilidade.',
    1
  ),
  (
    'regiao-entrega-cabo-frio',
    'A BTTelhas atende só Cabo Frio ou faz entrega em outras cidades do Rio de Janeiro?',
    'Nossa base fica em Cabo Frio (Porto do Carro), na Região dos Lagos. Atendemos a região e combinamos entrega e prazos conforme disponibilidade de estoque e logística. Para obras em outros municípios do RJ, entre em contato informando endereço e produtos: avaliamos frete e prazo no atendimento.',
    2
  ),
  (
    'como-pedir-orcamento-telhas-forros',
    'Como pedir orçamento de telhas, forros ou rodapés com preço de atacado?',
    'Você pode usar o catálogo online para ver referências e valores orientativos, selecionar produtos para consultar disponibilidade no WhatsApp ou preencher o formulário de orçamento rápido enviando os dados para nosso WhatsApp. Informe quantidades, local de entrega e, se possível, comparativo com outro orçamento: trabalhamos para oferecer condição competitiva para profissionais.',
    3
  ),
  (
    'cobre-orcamento-concorrente',
    'A BTTelhas cobre orçamento de outro fornecedor de telhas ou forros?',
    'Sim. Traga o orçamento ou a lista de itens com quantidades e marcas quando possível. Analisamos e buscamos equiparar ou melhorar a proposta, conforme disponibilidade de produto e condições comerciais. Esse é um dos diferenciais para instaladores e obras que precisam fechar custo.',
    4
  ),
  (
    'quais-produtos-linha',
    'Quais tipos de produtos a BTTelhas trabalha além de telhas?',
    'Trabalhamos com uma linha ampla para cobertura e acabamento: telhas (incluindo fibrocimento, ecológicas, coloniais, translúcidas e acessórios como cumeeiras), forros em PVC (lisos, frisados, madeirados, normatizados), ripados e painéis, rodapés, perfis e acabamentos diversos, além de itens complementares para obra. O catálogo no site reúne as principais referências com preços para atacado.',
    5
  ),
  (
    'prazo-estoque-disponibilidade',
    'Os produtos do catálogo estão sempre em estoque? Qual o prazo de entrega?',
    'Disponibilidade e prazo variam por item, cor e volume. Use a opção de consultar disponibilidade no WhatsApp ou fale com nossa equipe informando produto e quantidade. Assim confirmamos estoque, prazo de separação e previsão de entrega na sua região, inclusive para pedidos maiores ou materiais sob consulta.',
    6
  ),
  (
    'formas-pagamento-b2b',
    'Quais formas de pagamento e condições existem para compras no atacado?',
    'No site exibimos referência em dinheiro ou Pix e, quando aplicável, valor no cartão. Condições finais (parcelamento, prazos e descontos para volume) são alinhadas diretamente no atendimento B2B, conforme perfil do cliente e do pedido. Chame no WhatsApp para negociar sua compra.',
    7
  )
ON DUPLICATE KEY UPDATE
  question = VALUES(question),
  answer = VALUES(answer),
  sort_order = VALUES(sort_order);

-- Observação:
-- O site atual mantém os produtos no frontend (src/data.ts).
-- Se quiser, podemos gerar também neste arquivo um seed completo com TODOS os produtos e imagens.
