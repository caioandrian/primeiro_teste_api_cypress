# Teste de API 
Desafio

#### **API**:
- website: https://gorest.co.in
- base url do projeto, está declarado no arquivo cypress.json

<br/>

### ---- Lista de Rotas Testadas ----
<br/>

- / users [POST]
- / users/{_$id} [GET, DELETE]

<br/>

### ---- Diferenciais no projeto ----
<br/>

- BDD (não aplicável, apenas leitura)
- Cypress Mochawesome Reporter / Cypress Multi Reporters (não recomendado, usar multiple-cucumber-html-reporter)

<br/>

### ---- Lista de dependências ----
<br/>

    { "cypress": "^7.3.0",
    "cypress-mochawesome-reporter": "^2.0.1",
    "cypress-multi-reporters": "^1.5.0",
    "mocha": "^8.4.0",
    "mochawesome": "^6.2.2" }

**Instalar dependências via node**
> npm install

**Executar os testes pela interface gráfica do cypress**
> npm run cy:open

**Gerar reports json / screenshots**
> npm run cy:run
