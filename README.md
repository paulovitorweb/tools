# Utilitários

Coleção estática de ferramentas em React e TypeScript. Cada ferramenta tem sua própria entrada HTML, código e estilos; componentes comuns ficam em `src/shared`.

## Desenvolvimento

```bash
npm install
npm run dev
```

- Acesse: `http://localhost:5173/`

## Ferramentas

- Leitor de crontab
- Calculadora de IMC
- Conversor Timestamp Unix ↔ data/hora
- JWT Decoder
- Gerador de UUID v4
- Gerador de hashes MD5, SHA-1, SHA-256 e SHA-512
- Gerador de senhas
- Diff de textos
- Gerador de lorem ipsum
- Contador de caracteres, palavras, linhas e bytes
- Calculadora de volume e retenção Kafka
- JSON Prettify, minify e validação
- Gerador de EndToEndId do Pix para desenvolvimento e testes
- Sorteador de números com ou sem repetição
- Sorteador de nomes com ou sem repetição

Cada ferramenta tem uma entrada HTML em `tools/<ferramenta>` e sua implementação em `src/tools/<ferramenta>`. Componentes e estilos comuns ficam em `src/shared`.

## Publicação no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` gera e publica o site automaticamente a cada push na branch `main`. No repositório do GitHub, selecione **Settings → Pages → Source → GitHub Actions**.

A configuração usa caminhos relativos para funcionar tanto em domínio próprio quanto em subdiretórios do GitHub Pages.
