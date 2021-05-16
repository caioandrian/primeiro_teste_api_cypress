/// <reference types="cypress" />

describe('AUTOMAÇÃO API CYPRESS - GOREST.CO.IN', () => {

    let id_new_user

    beforeEach(()=>{
        cy.getToken();
    })

    describe("Deve Criar um Novo Usuário", () => {
        it('Entrada Válida', () => {
            cy.postNewUser("Caio Tester", "Male", "teste_api_caio@qualquer.com", "Active")
                .then((res) => {
                    console.log(res)
                    expect(res).to.have.property('status', 200)
                    expect(res.body).to.have.property('code', 201)
                    expect(res.body.data).to.have.property('id')
                    expect(res.body.data).to.have.property('name', "Caio Tester")
                    expect(res.body.data).to.have.property('gender', "Male")
                    expect(res.body.data).to.have.property('email', "teste_api_caio@qualquer.com")
                    expect(res.body.data).to.have.property('status', "Active")

                    id_new_user = res.body.data.id
                })
        })

        it('Entrada Inválida (email duplicado)', () => {
            cy.postNewUser("Caio Tester", "Male", "teste_api_caio@qualquer.com", "Active")
                .then((res) => {
                    console.log(res)
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
                console.log(res)
                expect(res).to.have.property('status', 200)
                expect(res.body).to.have.property('code', 200)
                expect(res.body.data).to.have.property('id')
                expect(res.body.data).to.have.property('name', "Caio Tester")
                expect(res.body.data).to.have.property('gender', "Male")
                expect(res.body.data).to.have.property('email', "teste_api_caio@qualquer.com")
                expect(res.body.data).to.have.property('status', "Active")
            })
        })

        it("Id Inválido", () => {
            cy.getUserById(579900).then((res) => {
                console.log(res)
                expect(res.body).to.have.property('code', 404)
                expect(res.body.data).to.have.property('message', "Resource not found")
            })
        })
    })

    describe("Deve Deletar um Usuário", () => {
        it('Usuário Existente', () => {
            cy.deleteUser(id_new_user).then((res_delete) => {
                console.log(res_delete)
                expect(res_delete).to.have.property('status', 200)
                expect(res_delete.body).to.have.property('code', 204)
            })

            cy.getUserById(id_new_user).then((res) => {
                console.log(res)
                expect(res).to.have.property('status', 200)
                expect(res.body).to.have.property('code', 404)
            })
        })

        it('Usuário Inexistente', () => {
            cy.deleteUser(65645645).then((res_delete) => {
                //console.log(res_delete)
                expect(res_delete).to.have.property('status', 200)
                expect(res_delete.body).to.have.property('code', 404)
            })
        })
    })

})
