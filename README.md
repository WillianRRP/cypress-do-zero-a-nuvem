# Testes Automatizados com Cypress

Este projeto utiliza o **Cypress** para realizar testes automatizados de interface. Está preparado para rodar testes tanto em resoluções padrão quanto em resoluções móveis.

---

## ✅ Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas na sua máquina:

- **Git** – [v2.42.1](https://git-scm.com/)
- **Node.js** – [v20.13.1](https://nodejs.org/)
- **npm** – [v10.8.1](https://www.npmjs.com/)
- **Visual Studio Code** (ou outra IDE de sua preferência) – [v1.90.2](https://code.visualstudio.com/)

---

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

---

## 🚀 Comandos Disponíveis

### Abrir o Cypress (modo interativo)
```bash
npm run cypress:open
```

### Rodar os testes (modo headless)
```bash
npm run test
```

Ou diretamente via `npx`:
```bash
npx cypress run
```

---

### Abrir Cypress em resolução mobile (modo interativo)
Adicione ao `package.json`:
```json
"scripts": {
  "cy:open:mobile": "cypress open --config viewportWidth=410,viewportHeight=860"
}
```

Depois execute:
```bash
npm run cy:open:mobile
```

---

### Rodar testes em resolução mobile (modo headless)
Adicione ao `package.json`:
```json
"scripts": {
  "test:mobile": "cypress run --config viewportWidth=410,viewportHeight=860"
}
```

Depois execute:
```bash
npm run test:mobile
```

Ou diretamente via `npx`:
```bash
npx cypress run --config viewportWidth=410,viewportHeight=860
```

---

## 🧪 Como Testar

### Teste Padrão
1. Execute `npm run cypress:open` para o modo interativo.
2. Ou `npm run test` / `npx cypress run` para o modo headless.
3. Selecione o arquivo de teste e aguarde a execução.

### Teste em Resolução Mobile
1. Execute `npm run cy:open:mobile` ou `npx cypress open --config viewportWidth=410,viewportHeight=860` para modo interativo.
2. Execute `npm run test:mobile` ou `npx cypress run --config viewportWidth=410,viewportHeight=860` para modo headless.

---

## 📌 Observações

- Verifique se está na raiz do projeto ao rodar os comandos.
- A resolução `410x860` simula uma tela mobile, mas pode ser ajustada conforme o dispositivo desejado.