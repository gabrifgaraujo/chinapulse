require('dotenv').config();
const mongoose = require('mongoose');
const Trend = require('../src/models/Trend');
const Product = require('../src/models/Product');
const Alert = require('../src/models/Alert');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Trend.deleteMany({});
    await Product.deleteMany({});
    await Alert.deleteMany({});

    const products = await Product.insertMany([
      {
        name: "Sérum Clareador Vitamina C",
        category: "beleza",
        averagePrice: 45.00,
        chinaPrice: 14.50,
        platforms: ["AliExpress"],
        opportunityScore: 95,
        scoreHistory: [82, 85, 88, 90, 92, 94, 95],
        imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
        highScoreReason: "Alta viralidade no Xiaohongshu + forte busca por Skincare no BR",
        relatedTrend: "Glass Skin & Skincare Coreano",
        description: "Sérum facial de alta potência com vitamina C encapsulada e ácido hialurônico. Sucesso absoluto em plataformas asiáticas com margem excelente para revenda no Brasil."
      },
      {
        name: "Projetor Portátil HY300",
        category: "eletrônicos",
        averagePrice: 280.00,
        chinaPrice: 95.00,
        platforms: ["AliExpress", "Shopee"],
        opportunityScore: 89,
        scoreHistory: [74, 78, 82, 85, 87, 88, 89],
        imageUrl: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=600&q=80",
        highScoreReason: "Alta viralidade no Douyin + preço competitivo no Brasil",
        relatedTrend: "Projetores portáteis para home office",
        description: "Projetor inteligente com Android integrado, rotação de 180 graus e foco automático. Ideal para entretenimento em casa e apresentações compactas."
      },
      {
        name: "Organizador de Acrílico",
        category: "casa",
        averagePrice: 75.00,
        chinaPrice: 22.00,
        platforms: ["Shein"],
        opportunityScore: 82,
        scoreHistory: [70, 73, 76, 79, 80, 81, 82],
        imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
        highScoreReason: "Crescimento acelerado em vídeos de organização no TikTok",
        relatedTrend: "Minimalismo Estético & Organização",
        description: "Organizadores modulares transparentes de alta resistência para cosméticos, escritório e acessórios. Visual clean e alta demanda no e-commerce."
      },
      {
        name: "Massageador Facial Gua Sha",
        category: "beleza",
        averagePrice: 30.00,
        chinaPrice: 8.50,
        platforms: ["Shopee", "AliExpress"],
        opportunityScore: 91,
        scoreHistory: [78, 81, 84, 87, 89, 90, 91],
        imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        highScoreReason: "Tendência contínua de rotina de bem-estar e estética facial",
        relatedTrend: "Yoga & Wellness Tech",
        description: "Pedra natural de Jade ou Quartzo para drenagem linfática e massagem facial relaxante. Item essencial em rotinas de autocuidado."
      },
      {
        name: "Capa Celular com Lente",
        category: "eletrônicos",
        averagePrice: 55.00,
        chinaPrice: 16.00,
        platforms: ["AliExpress"],
        opportunityScore: 78,
        scoreHistory: [65, 68, 71, 74, 76, 77, 78],
        imageUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80",
        highScoreReason: "Alta margem de lucro e apelo visual em reels",
        relatedTrend: "Acessórios de Celular & Tech Wear",
        description: "Case protetora com proteção de lente deslizante e acabamento fosco premium. Proteção máxima com design tecnológico."
      },
      {
        name: "Vela Aromática Design",
        category: "casa",
        averagePrice: 60.00,
        chinaPrice: 18.00,
        platforms: ["Shein"],
        opportunityScore: 85,
        scoreHistory: [72, 75, 78, 81, 83, 84, 85],
        imageUrl: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
        highScoreReason: "Forte demanda em decoração sensorial e presentes",
        relatedTrend: "Decoração Sensorial & Home Comfort",
        description: "Velas aromáticas artesanais em recipientes de design geométrico. Cera vegetal de coco com essências importadas de longa duração."
      },
      {
        name: "Bolsa Minimalista Nylon",
        category: "moda",
        averagePrice: 120.00,
        chinaPrice: 38.00,
        platforms: ["Shein", "Shopee"],
        opportunityScore: 94,
        scoreHistory: [80, 84, 88, 91, 92, 93, 94],
        imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
        highScoreReason: "Viral nas redes chinesas com grande volume de importação",
        relatedTrend: "Moda Modest Fashion & Athleisure",
        description: "Bolsa tiracolo unissex em nylon impermeável de alta densidade. Leve, espaçosa e com múltiplos compartimentos."
      },
      {
        name: "Kit Pincéis Kabuki",
        category: "beleza",
        averagePrice: 40.00,
        chinaPrice: 12.00,
        platforms: ["AliExpress"],
        opportunityScore: 75,
        scoreHistory: [62, 65, 68, 71, 73, 74, 75],
        imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
        highScoreReason: "Produto coringa de maquiagem com alta taxa de conversão",
        relatedTrend: "Clean Beauty & Maquiagem Prática",
        description: "Conjunto profissional de pincéis com cerdas sintéticas ultramacias e cabo ergonômico. Acabamento perfeito para base e pó."
      },
      {
        name: "Luminária de Mesa LED",
        category: "casa",
        averagePrice: 95.00,
        chinaPrice: 32.00,
        platforms: ["AliExpress", "Shopee"],
        opportunityScore: 80,
        scoreHistory: [68, 71, 74, 77, 79, 80, 80],
        imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
        highScoreReason: "Popular no nicho de setups de trabalho e estudos",
        relatedTrend: "Design de Mesa & Home Office",
        description: "Luminária LED touch recarregável com ajuste de temperatura de cor e intensidade de brilho. Design dobrável minimalista."
      },
      {
        name: "Óculos de Sol Vintage",
        category: "moda",
        averagePrice: 45.00,
        chinaPrice: 14.00,
        platforms: ["Shein"],
        opportunityScore: 88,
        scoreHistory: [75, 78, 81, 84, 86, 87, 88],
        imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
        highScoreReason: "Tendência retrô forte entre o público jovem",
        relatedTrend: "Moda Y2K & Acessórios Retro",
        description: "Armação geométrica inspirada nos anos 2000 com proteção UV400 completa. O queridinho dos influenciadores de moda."
      },
      {
        name: "Fone Bluetooth Cancelamento",
        category: "eletrônicos",
        averagePrice: 150.00,
        chinaPrice: 48.00,
        platforms: ["AliExpress"],
        opportunityScore: 92,
        scoreHistory: [79, 83, 87, 89, 90, 91, 92],
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        highScoreReason: "Forte demanda por gadgets de áudio de baixo custo",
        relatedTrend: "Audio Imersivo & Work From Anywhere",
        description: "Fones sem fio com cancelamento ativo de ruído (ANC), baixa latência e até 30h de reprodução com estojo."
      },
      {
        name: "Liquidificador Portátil",
        category: "casa",
        averagePrice: 110.00,
        chinaPrice: 35.00,
        platforms: ["Shopee"],
        opportunityScore: 84,
        scoreHistory: [71, 74, 77, 80, 82, 83, 84],
        imageUrl: "https://images.unsplash.com/photo-1570222094114-d074f7e1e6e4?auto=format&fit=crop&w=600&q=80",
        highScoreReason: "Produto utilitário de alta rotação em e-commerce",
        relatedTrend: "Cozinha Inteligente & Vida Saudável",
        description: "Mini liquidificador recarregável via USB para vitaminas e shakes em qualquer lugar. Lâminas em aço inox de alta rotação."
      },
      {
        name: "Top Fitness Sem Costura",
        category: "moda",
        averagePrice: 65.00,
        chinaPrice: 20.00,
        platforms: ["Shein"],
        opportunityScore: 90,
        scoreHistory: [77, 80, 83, 86, 88, 89, 90],
        imageUrl: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=600&q=80",
        highScoreReason: "Forte aceitação do público fitness no Brasil",
        relatedTrend: "Fitness Athleisure",
        description: "Top esportivo com alta sustentação, tecido respirável sem costura e bojo removível. Conforto absoluto para treinos."
      },
      {
        name: "Máscara LED de Fototerapia",
        category: "beleza",
        averagePrice: 350.00,
        chinaPrice: 120.00,
        platforms: ["AliExpress"],
        opportunityScore: 86,
        scoreHistory: [73, 76, 79, 82, 84, 85, 86],
        imageUrl: "https://images.unsplash.com/photo-1512290900722-9a70f8a85d39?auto=format&fit=crop&w=600&q=80",
        highScoreReason: "Tecnologia de clínica adaptada para uso doméstico",
        relatedTrend: "Skincare Tecnológico & Estética em Casa",
        description: "Máscara facial com 7 cores de LED para tratamento de acne, rejuvenescimento e estímulo de colágeno em casa."
      },
      {
        name: "Teclado Mecânico Compacto",
        category: "eletrônicos",
        averagePrice: 220.00,
        chinaPrice: 75.00,
        platforms: ["AliExpress"],
        opportunityScore: 83,
        scoreHistory: [70, 73, 76, 79, 81, 82, 83],
        imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
        highScoreReason: "Comunidade dev/gamer em expansão buscando teclados custom",
        relatedTrend: "Home Office Setup & PC Building",
        description: "Teclado mecânico 60% com switches intercambiáveis, iluminação RGB customizável e conexão Bluetooth/USB-C."
      }
    ]);

    const trends = await Trend.insertMany([
      { title: "Glass Skin", description: "Pele iluminada e ultra hidratada", category: "beleza", platforms: ["Douyin", "Xiaohongshu"], viralityScore: 98, brazilImpactScore: 95, scoreHistory: [88, 91, 94, 96, 97, 98], tags: ["skincare", "coreano", "viral"], relatedProducts: [products[0]._id] },
      { title: "Minimalismo Estético", description: "Design de interiores clean", category: "casa", platforms: ["Xiaohongshu"], viralityScore: 92, brazilImpactScore: 88, scoreHistory: [80, 83, 86, 89, 91, 92], tags: ["casa", "decor", "organização"], relatedProducts: [products[2]._id] },
      { title: "Gadgets de Produtividade", description: "Tech para home office", category: "eletrônicos", platforms: ["Weibo"], viralityScore: 85, brazilImpactScore: 80, scoreHistory: [72, 75, 78, 81, 83, 85], tags: ["tech", "office", "gadgets"], relatedProducts: [products[1]._id] },
      { title: "Moda Modest Fashion", description: "Estilo conservador e chique", category: "moda", platforms: ["Douyin"], viralityScore: 89, brazilImpactScore: 82, scoreHistory: [76, 79, 82, 85, 87, 89], tags: ["moda", "estilo", "tendência"], relatedProducts: [products[6]._id] },
      { title: "Yoga & Wellness Tech", description: "Gadgets para saúde mental", category: "beleza", platforms: ["Xiaohongshu"], viralityScore: 87, brazilImpactScore: 85, scoreHistory: [75, 78, 81, 84, 86, 87], tags: ["wellness", "saúde", "beleza"], relatedProducts: [products[3]._id] },
      { title: "Tech Wear", description: "Estilo urbano tecnológico", category: "moda", platforms: ["Weibo"], viralityScore: 80, brazilImpactScore: 75, scoreHistory: [68, 71, 74, 77, 79, 80], tags: ["streetwear", "tech", "moda"], relatedProducts: [products[4]._id] },
      { title: "Home Office Setup", description: "Workstation completa", category: "eletrônicos", platforms: ["Douyin"], viralityScore: 91, brazilImpactScore: 90, scoreHistory: [79, 82, 85, 88, 90, 91], tags: ["setup", "gamer", "produtividade"], relatedProducts: [products[14]._id] },
      { title: "Clean Beauty", description: "Cosméticos naturais", category: "beleza", platforms: ["Xiaohongshu"], viralityScore: 88, brazilImpactScore: 86, scoreHistory: [76, 79, 82, 85, 87, 88], tags: ["beleza", "natural", "skincare"], relatedProducts: [products[7]._id] },
      { title: "Moda Y2K", description: "Retrô anos 2000", category: "moda", platforms: ["TikTok"], viralityScore: 95, brazilImpactScore: 92, scoreHistory: [83, 86, 89, 92, 94, 95], tags: ["y2k", "retro", "moda"], relatedProducts: [products[9]._id] },
      { title: "Cozinha Inteligente", description: "Gadgets de cozinha", category: "casa", platforms: ["Douyin"], viralityScore: 83, brazilImpactScore: 78, scoreHistory: [70, 73, 76, 79, 81, 83], tags: ["cozinha", "smart", "utilidades"], relatedProducts: [products[11]._id] },
      { title: "Fitness Athleisure", description: "Roupa academia no dia a dia", category: "moda", platforms: ["Xiaohongshu"], viralityScore: 93, brazilImpactScore: 90, scoreHistory: [81, 84, 87, 90, 92, 93], tags: ["fitness", "moda", "gym"], relatedProducts: [products[12]._id] },
      { title: "Skincare Tecnológico", description: "Aparelhos de estética", category: "beleza", platforms: ["Douyin"], viralityScore: 90, brazilImpactScore: 89, scoreHistory: [78, 81, 84, 87, 89, 90], tags: ["skincare", "tech", "beleza"], relatedProducts: [products[13]._id] },
      { title: "Decoração Sensorial", description: "Velas e luzes relaxantes", category: "casa", platforms: ["Xiaohongshu"], viralityScore: 86, brazilImpactScore: 84, scoreHistory: [74, 77, 80, 83, 85, 86], tags: ["decor", "velas", "casa"], relatedProducts: [products[5]._id] },
      { title: "Audio Imersivo", description: "Qualidade sonora premium", category: "eletrônicos", platforms: ["Weibo"], viralityScore: 89, brazilImpactScore: 87, scoreHistory: [77, 80, 83, 86, 88, 89], tags: ["audio", "tech", "musica"], relatedProducts: [products[10]._id] },
      { title: "Design de Mesa", description: "Iluminação e organização", category: "casa", platforms: ["Xiaohongshu"], viralityScore: 82, brazilImpactScore: 79, scoreHistory: [70, 73, 76, 79, 81, 82], tags: ["mesa", "office", "decor"], relatedProducts: [products[8]._id] },
      { title: "Acessórios de Celular", description: "Personalização tech", category: "eletrônicos", platforms: ["Douyin"], viralityScore: 79, brazilImpactScore: 76, scoreHistory: [67, 70, 73, 76, 78, 79], tags: ["celular", "acessórios", "tech"], relatedProducts: [products[4]._id] },
      { title: "Moda Sustentável", description: "Consciência no consumo", category: "moda", platforms: ["Weibo"], viralityScore: 84, brazilImpactScore: 81, scoreHistory: [72, 75, 78, 81, 83, 84], tags: ["sustentavel", "moda", "eco"], relatedProducts: [products[6]._id] },
      { title: "Beleza Holística", description: "Bem estar geral", category: "beleza", platforms: ["Xiaohongshu"], viralityScore: 81, brazilImpactScore: 78, scoreHistory: [69, 72, 75, 78, 80, 81], tags: ["wellness", "beleza", "saúde"], relatedProducts: [products[3]._id] }
    ]);

    await Alert.insertMany([
      { keyword: "Skincare Coreano", category: "beleza", isActive: true },
      { keyword: "Gadgets", category: "eletrônicos", isActive: true },
      { keyword: "Minimalismo", category: "casa", isActive: true }
    ]);

    console.log("Banco populado com sucesso!");
    process.exit();
  } catch (error) {
    console.error("Erro no seed:", error);
    process.exit(1);
  }
};

module.exports = seedData;

if (require.main === module) {
  seedData();
}
