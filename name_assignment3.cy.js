/// <reference types="cypress" />

import { NewBankAccountPage } from "../page-objects/bankAccount";

describe("Real world app Bootcamp 2023 Assignment 3 (Refactor using page objects model)",()=> {

    let routingNumber = '123456789';
    let accountNumber = '111222333';
    let BANK_NAME = "Dummy Bank";

    beforeEach(() => {
        cy.visit('http://localhost:3000/signin')
        cy.get('#username').clear().type('Katharina_Bernier')
        cy.get('#password').clear({ force: true }).type('s3cret')
        cy.get('.MuiButton-label').click({ force: true })
    })

    it('Should create a new bank account', () => {
        NewBankAccountPage.addNew(routingNumber,accountNumber);
        NewBankAccountPage.elements.getSuccessCreationMsg();
    })

    //pending to migrate to page objects model
    it('Should delete an existing bank account', () => {
        cy.get('.MuiTypography-root').contains('Bank Accounts').click();
        cy.get('div.MuiGrid-root p').contains(BANK_NAME)
          .parents('[data-test*="bankaccount-list-item-"]')
          .within(() => {
            cy.get('[data-test="bankaccount-delete"]').click({ force: true });
        });
        cy.get('div.MuiGrid-root p').contains(`${BANK_NAME} (Deleted)`).should('be.visible');
      });
 
    after(() => {
        cy.get('span.MuiTypography-root').contains('Logout').click()
    })
})
