/// <reference types="Cypress" />

//const apiBankAccounts = `${Cypress.env("apiUrl")}/bankAccounts` //commented because it had an issue with the project
const apiBankAccounts = 'http://localhost:3001/bankAccounts/'
const urlBankAccounts = 'http://localhost:3000/bankAccounts/'

describe("APIassignment", () => {
    beforeEach(() => {       
        //login via UI
        cy.visit('http://localhost:3000/signin')
        cy.get('#username').clear().type('Katharina_Bernier')
        cy.get('#password').clear().type('s3cret')
        cy.get('.MuiButton-label').click()
        //login via API        
        cy.request(
            'POST',
            'http://localhost:3001/login',
            {
                "username": "Katharina_Bernier",
                "password": "s3cret",
                rememberUser: true
            }
        )
    })

    let bankAccountsID = [];
    let bankName = "Test Bank "

    it("Should create 5 bank accounts via API and verify them via UI", () => {
        for(let i = 0; i < 5; i++){
            cy.request(
                'POST', 
                apiBankAccounts,
                {
                    "bankName": bankName + i,
                    "accountNumber": "123456789",
                    "routingNumber": "123123123" 
                })
                .then(function (response) {
                    //bankAccountID = response.body.account.id;
                    bankAccountsID.push(response.body.account.id);
                    expect(response.status).to.eq(200);
                })
        }
        cy.visit(urlBankAccounts);
        for(let i = 0; i < 5; i++)
            cy.get('div.MuiGrid-root p').contains(bankName + i).should('be.visible');
    })

    it("Should get the 5 just-created bank accounts via API and verify them via UI", () => {
        bankAccountsID.forEach(id => {
            cy.request(
            { 
                method:'GET',
                url:apiBankAccounts + id
            })
            .then(function (response) {
                expect(response.status).to.eq(200)
            })
        })
        cy.visit(urlBankAccounts);
        for(let i = 0; i < 5; i++)
            cy.get('div.MuiGrid-root p').contains(bankName + i).should('be.visible');
    })

    it("Should delete 5 bank accounts via API and verify them via UI", () => {
        bankAccountsID.forEach(id => {
            cy.request(
                { 
                    method: 'DELETE',
                    url: apiBankAccounts + id
                })
                .then(function (response) {
                    expect(response.status).to.eq(200)
                })
        
        })
        cy.visit(urlBankAccounts);
        for(let i = 0; i < 5; i++)
            cy.get('div.MuiGrid-root p').contains(bankName + i + " (Deleted)").should('be.visible');
    })
})
