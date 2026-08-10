export type Category = 'Telhas' | 'Forros' | 'Ripados e Painéis' | 'Rodapés' | 'Acabamentos' | 'Acessórios e Diversos';

export interface Product {
  id: string;
  name: string;
  description?: string;
  category: Category;
  unit: string;
  /** URL pública da foto do produto. Se omitido, o site usa uma imagem ilustrativa da categoria. */
  imageUrl?: string;
  /** URLs públicas para variações/galeria do produto (ex.: arquivos com sufixo -2). */
  imageUrls?: string[];
  /** Vem da API do painel admin; ausente nos dados fixos abaixo (fallback offline). */
  isBestSeller?: boolean;
}

export const products: Product[] = [
  // Telhas
  { id: 'tK', name: 'Telha Trapezoidal - Kingspan', imageUrl: '/itens%20bttelhas/Telha%20Trapezoidal%20Kingspan.png', category: 'Telhas', unit: 'un' },
  { id: 't1', name: 'Cuumeira Onduline Verde - [2,00 x 0,48]', imageUrl: '/itens%20bttelhas/Cumeeira%20onduline%20verde%202,00%20x%200,48.jpeg', category: 'Telhas', unit: 'un' },
  { id: 't2', name: 'Telha Fibrocimento Casalit 5mm - [2,44 x 1,10]', imageUrl: '/itens%20bttelhas/Telha%20fibrocimento%20Casalit%205mm%202,44%20x%201,10.jpeg', category: 'Telhas', unit: 'un' },
  { id: 't3', name: 'Telha Transparente Fibra - [2,44 x 1,10]', imageUrls: ['/itens%20bttelhas/Telha%20Transparente%20fibra%202,44x1,10-2.jpeg', '/itens%20bttelhas/Telha%20Transparente%20fibra%202,44x1,10.jpeg'], category: 'Telhas', unit: 'un' },
  { id: 't5', name: 'Telha translúcida de pvc (leitosa) 2,44 x 0,50', imageUrl: '/itens%20bttelhas/Telha%20translucida%20de%20pvc%20(leitosa)%202,44%20x%200,50.jpeg', category: 'Telhas', unit: 'un' },
  { id: 't6', name: 'Telha translúcida de pvc (leitosa) 2,44 x 1,10', imageUrls: ['/itens%20bttelhas/Telha%20translucida%20de%20pvc%20(leitosa)%202,44%20x%201,10-2.jpeg', '/itens%20bttelhas/Telha%20translucida%20de%20pvc%20(leitosa)%202,44%20x%201,10.jpeg'], category: 'Telhas', unit: 'un' },
  { id: 't7', name: 'Telha Ecológica - [2,20 x 0,92]', imageUrl: '/itens%20bttelhas/Telha%20ecologica%202,20x0,92.jpeg', category: 'Telhas', unit: 'un' },
  { id: 't8', name: 'Telha Onduline Clássica [2,00 x 0,95]', description: '2 ºC mais fria que as telhas de fibrocimento de 5 mm', imageUrl: '/itens%20bttelhas/TELHA%20ONDULINE%20CLASSICA.png', category: 'Telhas', unit: 'un' },
  { id: 't9', name: 'Telha colonial 2,42x0,88', imageUrl: '/itens%20bttelhas/Telha%20colonial%20Plan%202,42x0,88.jpeg', category: 'Telhas', unit: 'un' },
  { id: 't10', name: 'Telha colonial terracota 3,30x0,86', imageUrl: '/itens%20bttelhas/Telha%20colonial%20Plan%20terracota%203,30x0,86.jpeg', category: 'Telhas', unit: 'un' },
  { id: 't11', name: 'Telhas coloniais translúcidas polipropileno - [2,30x0,86]', imageUrl: '/itens%20bttelhas/TELHA%20COLONIAL%20TRANSLUCIDA%20PVC_.png', category: 'Telhas', unit: 'un' },
  { id: 't12', name: 'Telhas coloniais translúcidas polipropileno - [2,42 x 0,88]', imageUrl: '/itens%20bttelhas/TELHA%20COLONIAL%20TRANSLUCIDA%20PVC_.png', category: 'Telhas', unit: 'un' },
  { id: 't13', name: 'Telha colonial Marfim 3,30x0,86 (AFORT)', imageUrl: '/itens%20bttelhas/Telha%20colonial%20Marfim%203,30x0,86%20plan%20(AFORT).jpeg', category: 'Telhas', unit: 'un' },
  { id: 't14', name: 'Cumeeira ecológica Ibaplac - [L: 0,92m]', imageUrl: '/itens%20bttelhas/Cumeeira%20ecologica%20ibaplac%200,92.jpeg', category: 'Telhas', unit: 'un' },
  { id: 't15', name: 'Cumeeira central articulada', imageUrl: '/itens%20bttelhas/CUMEEIRA_.png', category: 'Telhas', unit: 'un' },
  { id: 't16', name: 'Cumeeira central articulada marfim', imageUrl: '/itens%20bttelhas/Cumeeira%20central%20articulada%20marfim.jpeg', category: 'Telhas', unit: 'un' },


  // Forros
  { id: 'f1', name: 'Forro PVC Branco Neve - [Frisado] [8mm]', description: 'Folhas com 4, 5, 6 e 7 metros', imageUrl: '/itens%20bttelhas/PVC%20branco%20neve%20frisado%20de%208mm.jpeg', category: 'Forros', unit: 'm²' },
  { id: 'f2', name: 'Forro PVC Branco Neve - [Junta Seca] [0,25cm]', imageUrl: '/itens%20bttelhas/Forro%20pvc%20branco%20neve,%20junta%20seca%20com%200,25cm.jpeg', category: 'Forros', unit: 'm²' },
  { id: 'f3', name: 'Forro PVC - [Junta seca] [Liso normatizado]', imageUrl: '/itens%20bttelhas/Forro%20PVC%20junta%20seca%20LISO%20normatizado.jpeg', category: 'Forros', unit: 'm²' },
  { id: 'f4', name: 'Forro PVC Real PVC - Cor Peroba', imageUrl: '/itens%20bttelhas/Forro%20pvc%20cor%20peroba%20Real%20Pvc.jpeg', category: 'Forros', unit: 'm²' },
  { id: 'f5', name: 'Forro PVC Real PVC - Carvalho', imageUrl: '/itens%20bttelhas/Forro%20pvc%20Carvalho%20Real%20Pvc.jpeg', category: 'Forros', unit: 'm²' },
  { id: 'f6', name: 'Forro PVC Real PVC - Madeirado Cerejeira/imbuia [7mm]', imageUrl: '/itens%20bttelhas/Forro%20PVC%20promocao%20madeirado%20Real%20%207mm.jpeg', category: 'Forros', unit: 'm²' },
  { id: 'f7', name: 'Forro PVC Frisado - [cores: Sucupira e Cerejeira]', imageUrl: '/itens%20bttelhas/Forro%20Pvc%20frisado%20Sucupira%20ou%20Cerejeira.jpeg', category: 'Forros', unit: 'm²' },
  { id: 'f8', name: 'Forro PVC Junta seca - [cores: York ou Angelim]', imageUrl: '/itens%20bttelhas/FORRO%20PVC%20YORK,%20ANGELIM%20OU%20JARANDA%20JUNTA%20SECA.png', category: 'Forros', unit: 'm²' },
  { id: 'f9', name: 'Forro PVC - Amêndoa Red', imageUrl: '/itens%20bttelhas/FORRO%20PVC%20AMENDOA%20RED_.png', category: 'Forros', unit: 'm²' },
  { id: 'f10', name: 'Forro PVC - Preto [Alta qualidade]', imageUrl: '/itens%20bttelhas/FORRO%20PVC%20PRETO_.png', category: 'Forros', unit: 'm²' },
  { id: 'f11', name: 'Forro PVC Branco - [Alto brilho]', imageUrl: '/itens%20bttelhas/Forro%20pvc%20branco%20alto%20brilho.jpeg', category: 'Forros', unit: 'm²' },
  { id: 'f12', name: 'Forro PVC Madeirado Arraforros - Ipê', imageUrl: '/itens%20bttelhas/Forro%20PVC%20madeirado%20(ARAFORROS)%20ipe.jpeg', category: 'Forros', unit: 'm²' },
  { id: 'f13', name: 'Forro PVC Posto de gasolina - [10mm]', imageUrl: '/itens%20bttelhas/FORRO%20PVC%2010MM%20POSTO%20DE%20GASOLINA_.png', category: 'Forros', unit: 'm²' },
  { id: 'f14', name: 'Forro Frisado Real PVC - Branco [6mm]', imageUrl: '/itens%20bttelhas/FORRO%20FRISADO%20BRANCO%206%20mm%20REAL%20PVC_.png', category: 'Forros', unit: 'm²' },
  { id: 'f15', name: 'Forro PVC Real PVC - Branco neve [7mm normatizado]', imageUrl: '/itens%20bttelhas/Forro%20PVC%20branco%20neve%20(7mm%20normatizado)%20REAL%20PVC.jpeg', category: 'Forros', unit: 'm²' },
  { id: 'f16', name: 'Forro PVC Branco Tradicional - [Vinilplast]', imageUrl: '/itens%20bttelhas/Forro%20PVC%20branco%20tradicional%20(vinilplast).jpeg', category: 'Forros', unit: 'm²' },

  // Ripados e Painéis
  { id: 'r1', name: 'Painel ripado auto colante EVA 10m', description: 'Cores Cinamomo, Nogueira natural e black', imageUrl: '/itens%20bttelhas/Painel%20ripado%20auto%20colante%20EVA%2010m.jpeg', category: 'Ripados e Painéis', unit: 'rolo' },
  { id: 'r2', name: 'Painel ripado auto colante EVA 2,5m', imageUrl: '/itens%20bttelhas/Painel%20ripado%20auto%20colante%20EVA%202,5m.jpeg', category: 'Ripados e Painéis', unit: 'rolo' },
  { id: 'r3', name: 'Painel Ripado PVC - Milão [3,00 x 0,20]', imageUrl: '/itens%20bttelhas/RIPADO%20PVC%20MILAO.png', category: 'Ripados e Painéis', unit: 'peça' },
  { id: 'r4', name: 'Ripado PVC - [mogno, cerejeira, preto, branco] [3,00 x 0,20]', imageUrls: ['/itens%20bttelhas/Ripado%20de%20Pvc%20(mogno,%20cerejeira,%20preto,%20branco)%203,00%20x%200,20-2.jpeg', '/itens%20bttelhas/Ripado%20de%20Pvc%20(mogno,%20cerejeira,%20preto,%20branco)%203,00%20x%200,20.jpeg'], category: 'Ripados e Painéis', unit: 'peça' },
  { id: 'r5', name: 'Ripado PVC [cor: angelim]', imageUrl: '/itens%20bttelhas/Ripado%20na%20cor%20Angelim%203,00%20x%200,20.jpeg', category: 'Ripados e Painéis', unit: 'peça' },

  // Rodapés
  { id: 'ro1', name: 'Rodapé auto colante 10cm x 10m', imageUrl: '/itens%20bttelhas/Rodape%20auto%20colante%2010cm%20x%2010m.jpeg', category: 'Rodapés', unit: 'rolo' },
  { id: 'ro2', name: 'Rodapé auto colante 7cm x 5m', imageUrl: '/itens%20bttelhas/Rodape%20auto%20colante%207cm%20x%205m.jpeg', category: 'Rodapés', unit: 'rolo' },

  // Acabamentos
  { id: 'ac1', name: 'Acabamento U real pvc', imageUrl: '/itens%20bttelhas/ACABAMENTO%20U.png', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac2', name: 'Sanca Real Pvc 6m', imageUrl: '/itens%20bttelhas/Sanca%20Real%20Pvc%206m.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac3', name: 'Emenda H Real Pvc 6m', imageUrl: '/itens%20bttelhas/EMENDA%20H%20REAL%20PVC%206MM.png', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac4', name: 'Acabamento U cor peroba 6m', imageUrl: '/itens%20bttelhas/Acabamento%20U%20cor%20peroba%206m.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac5', name: 'Emenda H peróba 6m', imageUrl: '/itens%20bttelhas/Emenda%20H%20peroba%206m.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac6', name: 'Acabamento U cor Carvalho 6m', imageUrl: '/itens%20bttelhas/Acabamento%20U%20cor%20Carvalho%206m.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac7', name: 'Emenda H Carvalho 6m', imageUrl: '/itens%20bttelhas/Emenda%20H%20Carvalho%206m.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac8', name: 'Sanca cerejeira ou imbuia', imageUrl: '/itens%20bttelhas/Sanca%20cerejeira%20ou%20imbuia.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac9', name: 'Emenda H cerejeira ou imbuia', imageUrl: '/itens%20bttelhas/Emenda%20H%20cerejeira%20ou%20imbuia.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac10', name: 'Acabamento U cerejeira ou imbuia', imageUrl: '/itens%20bttelhas/Acabamento%20U%20cerejeira%20ou%20imbuia.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac11', name: 'Acabamento U sucupira ou cerejeira 6m', imageUrl: '/itens%20bttelhas/Acabamento%20U%20sucupira%20ou%20cerejeira%206m.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac12', name: 'Acabamento sanca sucupira ou cerejeira', imageUrl: '/itens%20bttelhas/Acabamento%20sanca%20sucupira%20ou%20cerejeira.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac13', name: 'Emenda H sucupira ou cerejeira 6m', imageUrl: '/itens%20bttelhas/Emenda%20H%20sucupira%20ou%20cerejeira%206m.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac14', name: 'Acabamento U York, Angelim ou Jarandá', imageUrl: '/itens%20bttelhas/Acabamento%20U%20York,%20Angelim%20ou%20Jaranda.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac15', name: 'Emenda H York ou Angelim', imageUrl: '/itens%20bttelhas/EMENDA%20H%20YORK%20E%20ANGELIM_.png', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac16', name: 'Acabamento U Amêndoa Red 6m', imageUrl: '/itens%20bttelhas/Acabamento%20U%20Amendoa%20Red%206m.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac17', name: 'Acabamento U preto 6m', imageUrl: '/itens%20bttelhas/Acabamento%20U%20preto%206m.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac18', name: 'Acabamento U brilho 6m', imageUrl: '/itens%20bttelhas/Acabamento%20U%20brilho%206m.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac19', name: 'Acabamento U ipê 6m', imageUrl: '/itens%20bttelhas/Acabamento%20U%20ipe%206m.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac20', name: 'Acabamento U neutro marrom', imageUrl: '/itens%20bttelhas/Acabamento%20U%20neutro%20marrom.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac21', name: 'Emenda H ipê', imageUrl: '/itens%20bttelhas/Emenda%20H%20ipe.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac22', name: 'Acabamentos U Milão 6m', imageUrl: '/itens%20bttelhas/Acabamentos%20U%20Milao%206m.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac23', name: 'Cantoneira L 3m', imageUrl: '/itens%20bttelhas/Cantoneira%20L%203m.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac24', name: 'Fechamento', imageUrl: '/itens%20bttelhas/Cantoneira%20L%203m.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac25', name: 'Cantoneiras L 3m Angelim', imageUrl: '/itens%20bttelhas/Cantoneiras%20L%203m%20Angelim.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac26', name: 'Fechamento Angelim', imageUrl: '/itens%20bttelhas/Cantoneiras%20L%203m%20Angelim.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac27', name: 'Cantoneira em L 2,5 x 2,5 cm 3m', imageUrl: '/itens%20bttelhas/CANTONERA%20EM%20L_.png', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac28', name: 'Arremate tipo Sanca 6m', imageUrl: '/itens%20bttelhas/SANCAO.png', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac29', name: 'Rodaforro tipo U 6m', imageUrl: '/itens%20bttelhas/ACABAMENTO%20U.png', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac30', name: 'Emenda H 6m', imageUrl: '/itens%20bttelhas/EMENDA%20H%20REAL%20PVC%206MM.png', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac31', name: 'Arremate tipo Sanca 6m', imageUrl: '/itens%20bttelhas/SANCAO.png', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac32', name: 'Canto de meia esquadria', imageUrl: '/itens%20bttelhas/Canto%20de%20meia%20esquadria.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac33', name: 'Plastilon de Pvc 6m', imageUrl: '/itens%20bttelhas/Plastilon%20de%20Pvc%206m.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac34', name: 'Emenda H Flexível 6m', imageUrl: '/itens%20bttelhas/Emenda%20H%20Flexivel%206m.jpeg', category: 'Acabamentos', unit: 'peça' },
  { id: 'ac35', name: 'Meia cana / Sanca cerejeira 6m', imageUrl: '/itens%20bttelhas/Sanca%20cerejeira%20ou%20imbuia.jpeg', category: 'Acabamentos', unit: 'peça' },

  // Acessórios e Diversos
  { id: 'ad1', name: 'Chapas PT ecológicas 6mm 2,20x1,10', imageUrl: '/itens%20bttelhas/Chapas%20PT%20ecologicas%206mm%202,20x1,10.jpeg', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad2', name: 'Chapas PT ecológicas 10mm 2,20x1,10', imageUrl: '/itens%20bttelhas/Chapas%20PT%20ecologicas%2010mm%202,20x1,10.jpeg', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad3', name: 'Tapume onduline 2,00 x 0,97', imageUrl: '/itens%20bttelhas/Tapume%20onduline%202,00%20x%200,97.jpeg', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad4', name: 'Kit prego telha verde 18 unid', imageUrl: '/itens%20bttelhas/Kit%20prego%20telha%20verde%2018%20unid.jpeg', category: 'Acessórios e Diversos', unit: 'kit' },
  { id: 'ad5', name: 'Kit parafusos verde 18 unid', imageUrl: '/itens%20bttelhas/Kit%20parafusos%20verde%2018%20unid.jpeg', category: 'Acessórios e Diversos', unit: 'kit' },
  { id: 'ad6', name: 'Isopor 20mm (12 placas 1,0 x 0,50)', imageUrl: '/itens%20bttelhas/Isopor%2020mm%20(12%20placas%201,0%20x%200,50).jpeg', category: 'Acessórios e Diversos', unit: 'pacote' },
  { id: 'ad7', name: 'Kits instalação faça você mesmo', imageUrl: '/itens%20bttelhas/Kit%20parafusos%2020%20unidades.jpeg', category: 'Acessórios e Diversos', unit: 'kit' },
  { id: 'ad8', name: 'Portas sanfonadas cinza/bege/branca 0,60', imageUrl: '/itens%20bttelhas/Portas%20sanfonadas%20cinza-bege-branca%200,60.jpeg', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad9', name: 'Portas sanfonadas cinza/bege/branca 0,70', imageUrl: '/itens%20bttelhas/Portas%20sanfonadas%20cinza-bege-branca%200,70.jpg', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad10', name: 'Portas sanfonadas cinza/bege/branca 0,80', imageUrl: '/itens%20bttelhas/Portas%20sanfonadas%20cinza-bege-branca%200,80.jpeg', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad11', name: 'Portas sanfonadas branca/mogno 0,90', imageUrl: '/itens%20bttelhas/Portas%20sanfonadas%20branca-mogno%200,90.jpeg', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad12', name: 'Portas sanfonadas branca/mogno 1,00', imageUrl: '/itens%20bttelhas/Portas%20sanfonadas%20branca-mogno%201,00.jpeg', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad13', name: 'Portas sanfonadas branca/mogno 1,20', imageUrl: '/itens%20bttelhas/Portas%20sanfonadas%20branca-mogno%201,00.jpeg', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad14', name: 'Portas sanfonadas branca Plasbil 1,10', imageUrl: '/itens%20bttelhas/Portas%20sanfonadas%20branca%20Plasbil%201,10.jpeg', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad15', name: 'Kit parafusos 20 unidades', imageUrl: '/itens%20bttelhas/Kit%20parafusos%2020%20unidades.jpeg', category: 'Acessórios e Diversos', unit: 'kit' },
  { id: 'ad16', name: 'Luminária led embutir 18w', imageUrls: ['/itens%20bttelhas/Luminaria%20led%20embutir%2018w%20quadrada.jpeg', '/itens%20bttelhas/Luminaria%20led%20embutir%2018w%20redonda.jpeg'], category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad17', name: 'Luminária led embutir 24w', imageUrl: '/itens%20bttelhas/Luminaria%20led%20embutir%2018w%20quadrada.jpeg', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad18', name: 'F-530', imageUrl: '/itens%20bttelhas/F-530.jpeg', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad19', name: 'Regulador F-530', imageUrl: '/itens%20bttelhas/Regulador%20F-530.jpeg', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad20', name: 'Tirante F-530 3m', imageUrl: '/itens%20bttelhas/Tirante%20F-530%203m.jpeg', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad21', name: 'Cantoneira em L', imageUrl: '/itens%20bttelhas/CANTONERA%20EM%20L_.png', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad22', name: 'Manta adesiva Brasilit 10cm', imageUrl: '/itens%20bttelhas/Manta%20adesiva%20Brasilit%2010cm.jpeg', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad23', name: 'Manta adesiva Brasilit 15cm', imageUrl: '/itens%20bttelhas/Manta%20adesiva%20Brasilit%2015cm.jpeg', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad24', name: 'Manta adesiva Brasilit 20cm', imageUrl: '/itens%20bttelhas/Manta%20adesiva%20Brasilit%2020cm.jpeg', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad25', name: 'Metalon galvanizado 6m', imageUrl: '/itens%20bttelhas/Metalon%20galvanizado%206m.jpeg', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad26', name: 'Parafuso ponta de agulha 4,3x13', imageUrl: '/itens%20bttelhas/Parafuso%20ponta%20de%20agulha%204,3x13.jpeg', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad27', name: 'Parafuso 5/16x110mm', imageUrl: '/itens%20bttelhas/Parafuso%205x16x110mm.jpeg', category: 'Acessórios e Diversos', unit: 'un' },
  { id: 'ad28', name: 'Emenda P/ metalon', imageUrl: '/itens%20bttelhas/EMENDA%20-%20EMENDA%20P_%20METALON%20-%20CANTONERA.png', category: 'Acessórios e Diversos', unit: 'un' },
];
