import checkoutData from '../fixtures/checkoutData.json';

describe('Checkout ვალიდაციები', () => {

  beforeEach(() => {
    cy.login();
    cy.addToCart('sauce-labs-backpack');
    cy.get('.shopping_cart_link').click();
    cy.get('#checkout').click();
  });

  it('ცარიელი First Name → შეცდომა "First Name is required"', () => {
    const { firstName, lastName, zip } = checkoutData.invalidCases[0];
    cy.fillCheckout(firstName, lastName, zip);
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'First Name is required');
  });

  it('ცარიელი Postal Code → შესაბამისი შეცდომა', () => {
    const { firstName, lastName, zip } = checkoutData.invalidCases[2];
    cy.fillCheckout(firstName, lastName, zip);
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Postal Code is required');
  });

  it('ვალიდური მონაცემები → გადადის overview გვერდზე', () => {
    const { firstName, lastName, zip } = checkoutData.valid;
    cy.fillCheckout(firstName, lastName, zip);
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.summary_total_label').should('be.visible');
  });

});
