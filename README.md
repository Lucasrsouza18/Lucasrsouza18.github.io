# Lucas Ribeiro — Portfólio

Portfólio interativo com projetos de desenvolvimento web, IA aplicada e automação.

**Recursos:** rolagem suave (Lenis) e animações guiadas pelo scroll (GSAP ScrollTrigger):
- globo interativo no hero (arraste para girar) com rotas saindo de São Paulo;
- transição de cor azul → claro e texto que acende palavra por palavra;
- cena fixa com um caminhão real (foto recortada) atravessando a tela com a carga de projetos;
- galeria horizontal de projetos com filtros, cards com tilt e modal de detalhes (← →);
- trajetória como uma estrada com asfalto real sobre uma foto aérea, com o caminhão (visto de cima) dirigindo conforme a rolagem;
- navio porta-contêiner atravessando a tela antes do contato;
- skills que levam aos projetos, marquee no contato, terminal (`/`).

HTML, CSS e JavaScript puros — sem build. GSAP e Lenis vêm de CDN.

## Rodar localmente

```bash
python3 -m http.server 8000
```

## Personalizar

Edite o objeto `CONFIG` no topo de `data.js` (email, LinkedIn, GitHub, currículo). Projetos, trajetória e skills ficam nos arrays `PROJECTS`, `JOURNEY` e `SKILLS` do mesmo arquivo; `main.js` tem só o comportamento.

## Publicar no GitHub Pages

1. Crie um repositório chamado `SEU-USUARIO.github.io` (ou qualquer nome).
2. Envie estes arquivos para a branch `main`.
3. Em **Settings → Pages**, escolha *Deploy from a branch* → `main` / `root`.
4. O site fica em `https://SEU-USUARIO.github.io/` em cerca de um minuto.

## Créditos das imagens

Fotos do [Pexels](https://www.pexels.com/license/) (uso gratuito, sem atribuição obrigatória), com fundo recortado:
caminhão lateral (#40906559), caminhão visto de cima (#35501714), navio (#12530458), asfalto (#4040619) e campo aéreo (#9539633).
