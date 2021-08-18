/// <reference types="cypress" />

describe('AUTOMAÇÃO API CYPRESS - GOREST.CO.IN', () => {

    let id_new_user

    const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()

    beforeEach(()=>{
        cy.getToken();
    })

    describe("Deve Criar um Novo Usuário", () => {
        it('Entrada Válida', () => {
            cy.postNewUser("Tester", "Male", `teste_${id}@qualquer.com`, "Active")
                .then((res) => {
                    expect(res).to.have.property('status', 200)
                    expect(res.body).to.have.property('code', 201)
                    expect(res.body.data).to.have.property('id')

                    expect(res.body.data).to.have.property('name', "Tester")
                    //valida se o nome nao possui numeros
                    expect(res.body.data).to.have.property('name').to.be.deep.match(/\D+/)
                    //valida se o nome é uma string
                    expect(res.body.data).to.have.property('name').to.be.a('string')

                    expect(res.body.data).to.have.property('gender', "male")
                    //valida se o genero nao possui numeros
                    expect(res.body.data).to.have.property('gender').to.be.deep.match(/\D+/)
                    //valida se o genero é uma string
                    expect(res.body.data).to.have.property('gender').to.be.a('string')

                    expect(res.body.data).to.have.property('status', "active")
                    //valida se o status nao possui numeros
                    expect(res.body.data).to.have.property('status').to.be.deep.match(/\D+/)
                    //valida se o status é uma string
                    expect(res.body.data).to.have.property('status').to.be.a('string')

                    expect(res.body.data).to.have.property('email', `teste_${id}@qualquer.com`)

                    id_new_user = res.body.data.id
                })
        })

        it('Entrada Inválida (email duplicado)', () => {
            cy.postNewUser("Tester", "Male", `teste_${id}@qualquer.com`, "Active")
                .then((res) => {
                    expect(res).to.have.property('status', 200)
                    expect(res.body).to.have.property('code', 422)
                    expect(res.body.data[0]).to.have.property('field', "email")
                    expect(res.body.data[0]).to.have.property('message', "has already been taken")
                })
        })
    })

    describe("Deve Recuperar um Usuário", () => {
        it("Id Válido", () => {
            cy.getUserById(id_new_user).then((res) => {
                expect(res).to.have.property('status', 200)
                expect(res.body).to.have.property('code', 200)
                expect(res.body.data).to.have.property('id')

                expect(res.body.data).to.have.property('name', "Tester")
                //valida se o nome nao possui numeros
                expect(res.body.data).to.have.property('name').to.be.deep.match(/\D+/)
                //valida se o nome é uma string
                expect(res.body.data).to.have.property('name').to.be.a('string')

                expect(res.body.data).to.have.property('gender', "male")
                //valida se o genero nao possui numeros
                expect(res.body.data).to.have.property('gender').to.be.deep.match(/\D+/)
                //valida se o genero é uma string
                expect(res.body.data).to.have.property('gender').to.be.a('string')

                expect(res.body.data).to.have.property('status', "active")
                //valida se o status nao possui numeros
                expect(res.body.data).to.have.property('status').to.be.deep.match(/\D+/)
                //valida se o status é uma string
                expect(res.body.data).to.have.property('status').to.be.a('string')

                expect(res.body.data).to.have.property('email', `teste_${id}@qualquer.com`)
            })
        })

        it("Id Inválido", () => {
            cy.getUserById(579900).then((res) => {
                expect(res.body).to.have.property('code', 404)
                expect(res.body.data).to.have.property('message', "Resource not found")
            })
        })
    })

    describe("Deve Deletar um Usuário", () => {
        it('Usuário Existente', () => {
            cy.deleteUser(id_new_user).then((res_delete) => {
                expect(res_delete).to.have.property('status', 200)
                expect(res_delete.body).to.have.property('code', 204)
            })

            cy.getUserById(id_new_user).then((res) => {
                expect(res).to.have.property('status', 200)
                expect(res.body).to.have.property('code', 404)
            })
        })

        it('Usuário Inexistente', () => {
            cy.deleteUser(65645645).then((res_delete) => {
                expect(res_delete).to.have.property('status', 200)
                expect(res_delete.body).to.have.property('code', 404)
            })
        })
    })

})
