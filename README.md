# Barbearia do Vini — Site

Landing page da Barbearia do Vini (Serra Sede, Serra/ES). Site estático, sem build,
sem dependências — abre direto no navegador ou em qualquer host de arquivos estáticos.
No ar em [barbeariadovini.com.br](https://barbeariadovini.com.br).

## Estrutura

```
barbearia-do-vini/
├── index.html              → toda a página: HTML, CSS e JS inline num único arquivo
│                              (seções: hero, sobre, serviços, barbeiros, depoimentos,
│                              trabalhos, benefícios, faq, canal WhatsApp, horário/local, rodapé)
├── assets/
│   ├── fonts/
│   │   └── satoshi-{400,500,700}.woff2   → fonte de texto (@font-face inline no index.html)
│   └── img/
│       ├── hero-wall.jpg                 → fundo da seção principal
│       ├── sobre-ambiente.jpg, sobre-ferramentas.jpg, sobre-detalhe.jpg  → seção "Sobre"
│       ├── svc-corte.jpg, svc-barba.jpg, svc-corte-barba.jpg,
│       │   svc-corte-hidratacao.jpg      → cards de serviços em destaque
│       ├── team-rikelme.jpg, team-rafael.jpg, team-vinicius.jpg  → seção "Barbeiros"
│       ├── corte-01..05.jpg              → galeria "Trabalhos da VN"
│       └── logo-mark.png, logo-dark.png, logo-light.png, logo-lockup.png  → logo em variações
└── README.md
```

Nenhuma build tool, framework ou `node_modules`. Basta abrir `index.html` num
navegador para ver o site rodando localmente — CSS e JS já estão embutidos no
próprio arquivo, não há folhas de estilo ou scripts externos ao projeto.

## Rodar localmente

Duas opções:

1. **Direto:** dê duplo clique em `index.html`.
2. **Com servidor local** (recomendado, evita qualquer bloqueio de `file://` em alguns navegadores):
   ```bash
   npx serve .
   # ou
   python -m http.server 8000
   ```
   Depois acesse `http://localhost:8000`.

## Publicar em produção

O domínio `barbeariadovini.com.br` (arquivo `CNAME`) já está configurado via
GitHub Pages a partir da branch `main`, pasta `/ (root)`. Um push para `main`
publica direto.

Qualquer outro host de arquivo estático também funciona (Netlify, Vercel,
Cloudflare Pages, FTP comum etc.) — o projeto não depende de nenhuma tecnologia
de servidor.

## Atualizar conteúdo

- **Serviços em destaque:** cards `.svc-card` dentro de `<div class="carousel" id="svc">`, seção `#servicos`.
- **Horário de funcionamento e endereço:** último `<section>` antes do rodapé, card `.info-card` (o segundo tem `id="local"`) — mantenha sincronizado com o horário cadastrado no AppBarber.
- **Fotos da galeria "Trabalhos da VN":** substitua os arquivos em `assets/img/corte-0X.jpg` (mesmo nome) ou adicione novos `.gal-card`.
- **Links de agendamento:** WhatsApp (`wa.me/5527999188055`) e AppBarber
  (`sites.appbarber.com.br/barbeariadovini-0cm4`) aparecem em vários botões — usar
  busca e substituição no editor ao trocar qualquer um dos dois.

## Fontes das informações

Dados de endereço, horário, serviços e preços foram confirmados a partir do painel
oficial da barbearia no [AppBarber](https://sites.appbarber.com.br/barbeariadovini-0cm4),
do [cartão digital Taggo](https://taggo.one/barbeariadovini) e do perfil no Google.
Fotos de trabalhos e do interior vêm de material público (Google/portfólio da casa);
logos foram fornecidas pelo cliente.
