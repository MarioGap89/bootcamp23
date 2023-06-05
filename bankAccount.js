/// <reference types="cypress" />

export class NewBankAccount {
    url = 'http://localhost:3000/bankaccounts/new';
  
    elements = {
        getBankAccounts: () => cy.get('.MuiTypography-root').contains('Bank Accounts'),
        getNewBankAccount: () => cy.get('[data-test="bankaccount-new"]'),
        getBankNameTxt: () => cy.get('#bankaccount-bankName-input'),
        getBankRoutingNumberTxt: () => cy.get('#bankaccount-routingNumber-input'),
        getBankAccountNumberTxt: () => cy.get('#bankaccount-accountNumber-input'),
        getSaveNew: () => cy.get('.MuiButton-label').contains('Save'),
        getSuccessCreationMsg: () => cy.get('[data-test*="bankaccount-list-item"]').contains("Dummy Bank"),
    }
  
    addNew(bankName,routingNumber, accountNumber) {
        this.elements.getBankAccounts().click();
        this.elements.getNewBankAccount().click({ force: true });
        this.elements.getBankNameTxt().clear().type(bankName);
        this.elements.getBankRoutingNumberTxt().clear().type(routingNumber);
        this.elements.getBankAccountNumberTxt().clear().type(accountNumber);
        this.elements.getSaveNew().click();
        this.elements.getSuccessCreationMsg();
    }
  }
  
  export const NewBankAccountPage = new NewBankAccount();
