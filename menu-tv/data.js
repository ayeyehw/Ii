/* ===== MENÚ DIGITAL MIMI CAFÉ — EDITA AQUÍ =====
 * Cambia un precio, guarda el archivo y la pantalla lo anima sola en la siguiente vuelta (sin recargar).
 * price: número en reales (null = "consulte").  when: "manha" | "tarde" | "sempre" (orden según la hora).
 * promo: pon un producto con precio "de/por" o deja promo: null.
 */
window.MENU = {
  brand: {
    tagline: "Seu cantinho de café e carinho.",
    address: "Rua da Floresta, 220 · Cruzeiro · Itajubá",
    hours: "Segunda a Domingo · 7h às 11h30 / 14h às 20h",
    instagram: "@mimicafe.br",
    morningUntil: 12 // hasta esta hora se priorizan cafés y desayunos
  },
  promo: { title: "Promoção do dia", name: "Cappuccino canela", desc: "Leite vaporizado com espresso e canela", from: 15, to: 12, img: "cappuccino" },
  favorites: [ // "mais pedidos" (el número es la popularidad relativa)
    { name: "Bubble Waffle Leite condensado", value: 96 },
    { name: "Milk-shake Nutella", value: 88 },
    { name: "Cappuccino canela", value: 81 },
    { name: "Pão na chapa Completo", value: 70 },
    { name: "Açaí Protein", value: 62 }
  ],
  screens: [
    { type: "cat", id: "cafes", when: "manha", title: "Cafés", img: "cappuccino", badge: "Passado na hora",
      sections: [{ items: [
        { n: "Espresso", d: "60 ml", p: 8 },
        { n: "Café no pano coado", d: "180 ml · passado na hora", p: 6 },
        { n: "Café no pano com leite", d: "180 ml", p: 8 },
        { n: "Cappuccino", d: "200 ml · leite vaporizado com espresso", p: 14 },
        { n: "Cappuccino canela", d: "200 ml · espresso e canela", p: 15, hot: true },
        { n: "Moça Nutella", d: "Nutella, borda de amendoim, leite vaporizado e espresso", p: 20 },
        { n: "Moça doce de leite", d: "Borda de paçoca, leite vaporizado e espresso", p: 18 },
        { n: "Achocolatado", d: "", p: 6 }
      ]}]},
    { type: "explode", id: "x-cappuccino", when: "manha", product: "cappuccino", name: "Cappuccino canela", size: "200 ml", p: 15 },
    { type: "cat", id: "pao", when: "manha", title: "Pão na chapa", img: "pao", badge: "Café da manhã",
      sections: [{ items: [
        { n: "Com manteiga", d: "Douradinho na chapa", p: 4 },
        { n: "Queijo quente", d: "Manteiga e queijo Minas", p: 9 },
        { n: "Com ovo", d: "1 ovo frito", p: 6 },
        { n: "Com requeijão", d: "", p: 8 },
        { n: "Com cream cheese", d: "", p: 4 },
        { n: "Completo", d: "Queijo Minas, peito de peru e 1 ovo frito", p: 12, hot: true },
        { n: "Com Nutella", d: "", p: 8 }
      ]}],
      note: "Adicionais: alface R$1 · tomate cereja R$1 · presunto R$3 · mussarela R$3 · queijo Minas R$5 · cream cheese R$4 · requeijão R$4 · peito de peru R$3 · ovo frito R$2" },
    { type: "cat", id: "chas-sucos", when: "sempre", title: "Chás & Sucos", img: "suco",
      sections: [
        { name: "Chás · preto, erva-doce ou camomila", items: [
          { n: "Com rodela de limão", p: 6 }, { n: "Com rodela de laranja", p: 6 }, { n: "Com rodela de gengibre", p: 6 }]},
        { name: "Sucos simples", cols: 2, items: [
          { n: "Acerola", p: 10 }, { n: "Abacaxi", p: 10 }, { n: "Laranja", p: 10 },
          { n: "Manga", p: 10 }, { n: "Maracujá", p: 10 }, { n: "Morango", p: 10 }]}
      ]},
    { type: "cat", id: "especiais", when: "tarde", title: "Bebidas geladas", img: "acai",
      sections: [
        { name: "Sucos especiais", items: [
          { n: "Morango com leite condensado", d: "Com picolé Pinta Língua", p: 15 },
          { n: "Limonada suíça", d: "Com picolé de limão", p: 15 },
          { n: "Achocolatado", d: "Com picolé de chocolate", p: 15 },
          { n: "Abacaxi tropical", d: "Com picolé de abacaxi", p: 15 },
          { n: "Maracujá cream", d: "Com picolé de maracujá", p: 15 }]},
        { items: [
          { n: "Açaí Protein", d: "Whey protein, banana e leite", p: 18, hot: true },
          { n: "Affogato", d: "Sorvete de leite condensado, espresso e borda de Nutella", p: 18 }]}
      ]},
    { type: "explode", id: "x-acai", when: "tarde", product: "acai", name: "Açaí Protein", size: "copo", p: 18 },
    { type: "cat", id: "shakes", when: "tarde", title: "Milk-shakes", sub: "500 ml", img: "milkshake", badge: "500 ml",
      sections: [{ cols: 2, items: [
        { n: "Paçoca", d: "Leite condensado, caramelo, borda de paçoca e chantilly", p: 20 },
        { n: "Nutella", d: "Torta belga, chocolate, borda de Nutella e chantilly", p: 20, hot: true },
        { n: "Café", d: "Café trufado, caramelo, doce de leite e amendoim", p: 20 },
        { n: "Unicórnio", d: "Leite condensado, granulado colorido e marshmallow", p: 20 },
        { n: "Morango", d: "Calda de morango, geleia de frutos vermelhos e chantilly", p: 25 },
        { n: "Limão", d: "Limão rosa, borda de frutos vermelhos e chantilly", p: 25 },
        { n: "Maracujá", d: "Sorvete de maracujá, leite condensado e chantilly", p: 25 }
      ]}]},
    { type: "explode", id: "x-shake", when: "tarde", product: "shake", name: "Milk-shake Morango", size: "500 ml", p: 25 },
    { type: "favorites", id: "favoritos", when: "sempre" },
    { type: "cat", id: "waffle", when: "tarde", title: "Bubble Waffle", img: "waffle", badge: "Feito na hora",
      sections: [
        { name: "Gelados", items: [
          { n: "Leite condensado", d: "Banana, sorvete, chocolate, coco ralado e chantilly", p: 25, hot: true },
          { n: "Unicórnio", d: "Morango, sorvete Unicórnio, caramelo, granulado e marshmallow", p: 25 },
          { n: "Torta belga", d: "Morango, sorvete Torta Belga, chocolate, amendoim e chantilly", p: 25 }]},
        { name: "Simples", items: [
          { n: "Tropical", d: "Banana, morango, kiwi, uva, leite condensado e brigadeiro", p: 20 },
          { n: "Banana caramel", d: "Banana, doce de leite, canela, caramelo e Moça Flakes", p: 20 },
          { n: "Churros", d: "Doce de leite, açúcar, canela e paçoca", p: 10 }]}
      ]},
    { type: "explode", id: "x-waffle", when: "tarde", product: "waffle", name: "Bubble Waffle Leite condensado", size: "gelado", p: 25 },
    { type: "promo", id: "promo", when: "sempre" },
    { type: "cat", id: "salgados", when: "sempre", title: "Baguetes & Crepes", img: "baguete",
      sections: [
        { name: "Baguete · pão de 15 cm com presunto e orégano", items: [
          { n: "Carne", d: "Patinho desfiado, cheddar e salada americana", p: 25 },
          { n: "Frango", d: "Frango desfiado, cream cheese e salada americana", p: 20 },
          { n: "Peito de peru", d: "Queijo mussarela e salada americana", p: 20 }]},
        { name: "Crepes suíços recheados", cols: 2, items: [
          { n: "Queijo", p: 6 }, { n: "Frango com requeijão", p: 10 }, { n: "Frango com cream cheese", p: 10 },
          { n: "Patinho com cheddar", p: 10 }, { n: "Romeo e Julieta", p: null }, { n: "Salsicha", p: null },
          { n: "Dois amores", d: "Leitinho com brigadeiro", p: 10 }]}
      ]},
    { type: "cat", id: "doces", when: "sempre", title: "Docinhos", img: "panqueca",
      sections: [
        { name: "Rolinho de canela", items: [{ n: "Frosty", d: "Cream cheese, baunilha, canela e 1 acompanhamento", p: 12, hot: true }]},
        { name: "Mini panquecas", items: [
          { n: "12 unidades", d: "2 frutas, 3 acompanhamentos, 1 calda e chantilly", p: 15 },
          { n: "24 unidades", d: "3 frutas, 4 acompanhamentos, 2 caldas e chantilly", p: 25 }]},
        { name: "Salada de frutas · 4 frutas do dia", items: [
          { n: "Com cobertura adicional", p: 12 }, { n: "Com recheio", d: "Leitinho, brigadeiro ou chantilly", p: 15 }, { n: "Com sorvete adicional", p: 18 }]}
      ]},
    { type: "cat", id: "sobremesas", when: "sempre", title: "Sobremesas", img: "cheesecake",
      sections: [{ items: [
        { n: "Bolos frios", p: 15 },
        { n: "Cheesecake de frutas vermelhas", p: 20, hot: true },
        { n: "Pudim de leite condensado", p: 6 }
      ]}]}
  ]
};
