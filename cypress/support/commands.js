// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getToken', () => {
    Cypress.env('token', '230107bdf24a56c024051525ece22e4afd02a8e7e78c26b071cf47f960831f9b')
})

Cypress.Commands.add('getUserById', (id_user) => {
    cy.request({
        url: `/public-api/users/${id_user}`,
        method: 'GET',
    })
})

Cypress.Commands.add('getUserByQuery', (p_name, p_email) => {
    cy.request({
        url: '/public-api/users',
        method: 'GET',
        qs:{ name: p_name, email: p_email}
    })
})

Cypress.Commands.add('postNewUser', (p_name, p_gender, p_email, p_status) => {
    cy.request({
        url: '/public-api/users',
        method: 'POST',
        body: {"name": p_name, "gender": p_gender, "email":p_email, "status":p_status}
    })
})

Cypress.Commands.add('deleteUser', (user_id) => {
    cy.request({
        url: `/public-api/users/${user_id}`,
        method: 'DELETE'
    })
})

//dessa forma nao sera preciso informar a linha contendo o token a cada nova requisicao.
Cypress.Commands.overwrite('request', (originalFn, ...options) => {
    if(options.length === 1){
        if(Cypress.env('token')){
            options[0].headers = {
                    Authorization: `Bearer ${Cypress.env('token')}`
            }
        }
    }

    return originalFn(...options)
})
