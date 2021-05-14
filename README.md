# test_api_gorest_cypress
Utilizando a <b>API gorest.co.in</b> automatizar os seguintes endpoints (todos os fluxos cabíveis para cada endpoint).<br/>

<b>Ferramenta para automação: Cypress versão 7.3.0</b><br/>

<b>GET</b> /public-api/users/123 (Get User Details)<br/>
<b>POST</b> /public-api/users (Create New User)<br/>
<b>DELETE</b> /public-api/users/123 (Delete User)

<br/>----<br/>

<b>Funcionalidades testadas:<br/></b>

- Cadastrar um novo usuário<br/>
- Recuperar informações de um usuário<br/>
- Deletar um usuário do sistema<br/>

<b>* mais detalhes sobre os cenários escritos em BDD estão dentro da pasta features no arquivo em PDF chamado features. <br/></b>

<br/>----<br/>

<b>Organização dos arquivos:</b><br/>
- A pasta integration contém o arquivo test_api.js com os conjuntos de testes.<br/>
- A pasta features contém um arquivo pdf com cenários escritos em BDD.<br/>
- A pasta reports recebe um arquivo HTML e json contendo o resultado do testes reportados.
- A base da URL para testar a API foi colocada no arquivo cypress.json.<br/>
- Os métodos para execução das requisições foram colocadas separadamente no arquivo Commands.js dentro da pasta support.<br/>

<b>* mais detalhes sobre a documentação, instalação e execução, está disponível no arquivo em PDF com o nome "Documentação e Instalação".</b><br/>



