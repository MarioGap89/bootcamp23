/// <reference types="cypress" />


describe("Real world app Bootcamp 2023 Assignment 2",()=> {

    beforeEach(() => {
        cy.visit('http://localhost:3000/signin')
        cy.get('#username').clear().type('Katharina_Bernier')
        cy.get('#password').clear().type('s3cret')
        cy.get('.MuiButton-label').click()
        
    })

    it('createBankAccount', () => {

        const BANK_NAME = "Dummy Bank"
        cy.get('.MuiTypography-root').contains('Bank Accounts').click()
        
        cy.get('[data-test="bankaccount-new"').click()
        cy.get('#bankaccount-bankName-input').clear().type(BANK_NAME)
        cy.get('#bankaccount-routingNumber-input').clear().type('123456789')
        cy.get('#bankaccount-accountNumber-input').clear().type('123456789')  
        cy.get('.MuiButton-label').contains('Save').click()
        
        cy.get('[data-test*="bankaccount-list-item"]').contains(BANK_NAME).each((item, index, list)=>{
            if(Cypress.$(item).text() != BANK_NAME+" (Deleted)")
                expect(Cypress.$(item).text()).to.contains(BANK_NAME)                
        })
    })

    it('deleteBankAccount', () => {
        const BANK_NAME = "Dummy Bank "
        cy.get('.MuiTypography-root').contains('Bank Accounts').click()
        cy.get('[data-test*="bankaccount-list-item"]').contains(BANK_NAME).each((item, index, list)=>{
                expect(Cypress.$(item).text()).to.contains(BANK_NAME + " (Deleted)")                
        })
    })
 
    after(() => {
        cy.get('span.MuiTypography-root').contains('Logout').click()
    })
})