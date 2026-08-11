# Barbearia do Vini — Site

Landing page da Barbearia do Vini (Serra Sede, Serra/ES). Site estático, sem build,
sem dependências — abre direto no navegador ou em qualquer host de arquivos estáticos.

## Estrutura

```
barbearia-do-vini/
├── index.html              → toda a página (seções: hero, sobre, serviços, V Club, galeria, horário/local, equipe, rodapé)
├── assets/
│   ├── css/
│   │   └── style.css       → estilos do site (paleta, tipografia, layout)
│   └── img/
│       ├── hero.jpg              → fundo da seção principal
│       ├── interior.jpg          → foto do interior da barbearia (seção "Sobre")
│       ├── corte-01..05.jpg      → fotos de trabalhos/cortes (galeria)
│       ├── logo-dark.png         → logo oficial, fundo escuro (usado no rodapé)
│       ├── logo-light.png        → logo oficial, fundo claro (reserva para uso em materiais claros)
│       ├── vclub-badge.jpg       → selo da assinatura V Club (seção "V Club")
│       └── favicon.svg           → ícone da aba do navegador
└── README.md
```

Nenhuma build tool, framework ou `node_modules` — é só HTML + CSS. Basta abrir
`index.html` num navegador para ver o site rodando localmente.

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

### Opção 1 — GitHub Pages (grátis, recomendado)

1. Crie um repositório no GitHub (veja seção **Git & GitHub** abaixo).
2. Depois do primeiro push, vá em **Settings → Pages** no repositório.
3. Em **Source**, selecione a branch `main` e a pasta `/ (root)`.
4. Salve. Em alguns minutos o site fica disponível em:
   `https://<seu-usuario>.github.io/<nome-do-repositorio>/`

### Opção 2 — Netlify / Vercel (arrastar e soltar)

Ambos aceitam publicar a pasta do projeto direto, sem git:
- [app.netlify.com/drop](https://app.netlify.com/drop) — arraste a pasta `barbearia-do-vini` inteira.
- [vercel.com/new](https://vercel.com/new) — importe a pasta ou conecte o repositório GitHub.

Qualquer host de arquivo estático funciona (Cloudflare Pages, Surge, hospedagem
compartilhada comum via FTP etc.) — o projeto não depende de nenhuma tecnologia de servidor.

## Git & GitHub

O projeto já está inicializado como repositório git local (primeiro commit feito).
Para subir para o GitHub:

```bash
# 1. Crie um repositório vazio em https://github.com/new
#    (NÃO marque "Initialize with README" — o projeto já tem um)

# 2. Conecte o repositório local ao remoto (troque <usuario> e <repo>):
git remote add origin https://github.com/<usuario>/<repo>.git

# 3. Envie o código:
git branch -M main
git push -u origin main
```

Se preferir usar a GitHub CLI (`gh`) em vez do passo 1 manual:
```bash
gh repo create barbearia-do-vini --public --source=. --remote=origin --push
```

## Atualizar conteúdo

- **Preços e serviços:** editar a seção `<div class="price-board">` em `index.html`.
- **Assinatura V Club:** seção `<section id="vclub">`.
- **Horário de funcionamento:** seção `<section id="horario">` — mantenha sincronizado
  com o horário cadastrado no AppBarber.
- **Fotos da galeria:** substitua os arquivos em `assets/img/corte-0X.jpg` (mesmo nome)
  ou adicione novos `<figure>` em `<section id="galeria">`.
- **Links de agendamento:** WhatsApp (`wa.me/5527999188055`) e AppBarber
  (`sites.appbarber.com.br/barbeariadovini-0cm4`) aparecem em vários botões — usar
  busca e substituição no editor ao trocar qualquer um dos dois.

## Fontes das informações

Dados de endereço, horário, serviços e preços foram confirmados a partir do painel
oficial da barbearia no [AppBarber](https://sites.appbarber.com.br/barbeariadovini-0cm4),
do [cartão digital Taggo](https://taggo.one/barbeariadovini) e do perfil no Google.
Fotos de trabalhos e do interior vêm de material público (Google/portfólio da casa);
logos e selo do V Club foram fornecidos pelo cliente.
