/// <reference types="Cypress" />
// the above is supposed to give you autocomplete

describe('tasks page', () => {
  it('should render the main image', () => {
    cy.visit('http://127.0.0.1:5173/');
    cy.get('.main-header img')
  })

  it('should dispay the title', () => {
    cy.visit('http://127.0.0.1:5173/');
    cy.get('h1').should('have.length', 1);
    cy.get('h1').contains('React Tasks');
  })
})