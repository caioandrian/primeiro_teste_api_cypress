/// <reference types="cypress" />

describe('Cypress Integration API', () => {
    //variaveis globais
    let booking_obj
    let booking_id
    let token

    before(()=>{
        //url base definida em cypress.json "baseUrl":  "https://restful-booker.herokuapp.com"
        cy.request({
            url: 'https://restful-booker.herokuapp.com/auth',
            method: 'POST',
            body: {
                username : "admin",
                password : "password123"
            }
        }).as('response')

        cy.get('@response').then((res) => {
            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.property("token")
            expect(res.body.token).to.be.not.empty

            token = res.body.token
            //console.log(token)
        })
    })

    it('Deve criar um livro', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            body: {
                firstname : "Caio",
                lastname : "Santos",
                totalprice : 500,
                depositpaid : true,
                bookingdates : {
                    checkin : "2022-01-01",
                    checkout : "2022-01-02"
                },
                additionalneeds : "Breakfast"
            }
        }).as('response')

        cy.get('@response').its('status').should('be.equal', 200)
        cy.get('@response').its('body.bookingid').should('exist')

        cy.get('@response').its('body').then((obj) => {
            booking_obj = obj.booking
            //console.log(bookingObj)
            booking_id = obj.bookingid
        })
    })

    it('Deve listar ID dos livros', () => {
        cy.request({
            url: 'https://restful-booker.herokuapp.com/booking',
            method: 'GET',
            //qs:[{bookingid: `${booking_obj}`}]
        }).as('response')

        cy.get('@response').then((res) => {
            expect(res.status).to.be.equal(200)
            expect(res.body[0]).to.have.property("bookingid")
            expect(res.body[0].bookingid).to.be.a('number')
        })
    })

    it('Deve buscar ID dos livros por Nome e Sobrenome', () => {
        cy.request({
            method: 'GET',
            url: `https://restful-booker.herokuapp.com/booking?firstname=${booking_obj.firstname}&lastname=${booking_obj.lastname}`,
        }).as('response')

        cy.get('@response').then((res) => {
            expect(res.status).to.be.equal(200)
            expect(res.body[0]).to.have.property("bookingid")
            expect(res.body[0].bookingid).to.be.a('number')
        })
    })

    it('Deve buscar ID dos livros por Data de Entrada e Data de Sa??da', () => {
        cy.request({
            method: 'GET',
            url: `https://restful-booker.herokuapp.com/booking?checkin=${booking_obj.bookingdates.checkin}&checkout=${booking_obj.bookingdates.checkout}`,
        }).as('response')

        cy.get('@response').then((res) => {
            console.log(res)

            expect(res.status).to.be.equal(200)
            expect(res.body[0]).to.have.property("bookingid")
            expect(res.body[0].bookingid).to.be.a('number')
        })
    })

    it('Deve recuperar um livro por ID', () => {
        cy.request({
            method: 'GET',
            url: `https://restful-booker.herokuapp.com/booking/${booking_id}`,
        }).as('response')

        cy.get('@response').its('status').should('be.equal', 200)
        cy.get('@response').its('body.firstname').should('exist').and('be.a', 'string')
        cy.get('@response').its('body.lastname').should('exist').and('be.a', 'string')
        cy.get('@response').its('body.totalprice').should('exist').and('be.a', 'number')
        cy.get('@response').its('body.depositpaid').should('exist').and('be.a', 'boolean')
        cy.get('@response').its('body.bookingdates').should('exist').and('be.a', 'object')
        cy.get('@response').its('body.bookingdates.checkin').should('exist').and('be.a', 'string')
        cy.get('@response').its('body.bookingdates.checkout').should('exist').and('be.a', 'string')
    })

    it('Deve atualizar um livro', () => {
        cy.request({
            method: 'PUT',
            url: `https://restful-booker.herokuapp.com/booking/${booking_id}`,
            headers: {Cookie: `token= ${token}`},
            body: {
                firstname : "Caio",
                lastname : "dos Santos",
                totalprice : 300,
                depositpaid : true,
                bookingdates : {
                    checkin : "2022-01-01",
                    checkout : "2022-01-02"
                },
                additionalneeds : "Breakfast"
            }
        }).as('response')

        cy.get('@response').its('status').should('be.equal', 200)
        cy.get('@response').its('body.lastname').should('be.equal', 'dos Santos')
        cy.get('@response').its('body.totalprice').should('eq', 300)
        cy.get('@response').its('body.bookingdates.checkout').should('eq', "2022-01-02")
    })

    it('Deve excluir um livro', () => {
        cy.request({
            method: 'DELETE',
            url: `https://restful-booker.herokuapp.com/booking/${booking_id}`,
            headers: {Cookie: `token= ${token}`},
        }).as('response')

        cy.get('@response').its('status').should('be.equal', 201)
    })
})