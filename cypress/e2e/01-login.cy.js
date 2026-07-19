import users from '../fixtures/users.json';

describe('ლოგინის ტესტები — Data Driven', () => {

  users.forEach((user) => {
    it(`სცენარი: ${user.scenario}`, () => {
      cy.login(user.username, user.password);

      if (user.expectedType === 'url') {
        cy.url().should('include', user.expected);
      } else {
        cy.get('[data-test="error"]').should('be.visible').and('contain', user.expected);
      }
    });
  });

});
