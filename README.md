# Portfólio (versão anterior)

> Este repositório contém a **versão anterior** do meu portfólio, orientada a redes e cibersegurança. Foi substituída por um novo portfólio focado em desenvolvimento .NET, RPA e IA. Mantém-se apenas como referência.

Demo (GitHub Pages): https://hackmaster300.github.io/Portifolio/html/

## O que é

Site de página única, feito em HTML, CSS e JavaScript sem frameworks:

- Barra lateral colapsável e navegação entre 4 secções (Início, Projectos, Sobre, Contacto)
- Vista de projectos com lista e painel de detalhe (descrição, motivação, desafios, resultados, tecnologias)
- Formulário de contacto que abre o cliente de email (`mailto:`)
- Fundo com formas geométricas animadas em CSS, tema escuro, layout responsivo
- Ícones Font Awesome (CDN)

## Estrutura

```
html/index.html     página
CSS/styles.css      estilos
Script/script.js    lógica (projectos, navegação, contacto)
img/                foto e ícones
```

## Executar

Abra `html/index.html` no browser ou use `python -m http.server`.

## Notas e limitações

- A lista de projectos é guardada em `localStorage` na primeira visita; quem já visitou pode ver uma lista desactualizada até limpar os dados do site.
- Algumas métricas dos projectos (por exemplo percentagens de redução de tempo) são estimativas e não têm medição documentada.
- Parte da interface foi gerada com apoio de uma ferramenta de IA (v0) e depois ajustada manualmente.
- Sem SEO (sem meta description nem Open Graph) e sem testes.

## Licença

MIT. Ver `LICENSE`.
