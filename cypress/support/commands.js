// ***********************************************
// Custom Commands — cypress/support/commands.js
// ***********************************************

/**
 * cy.login(username, password)
 * ერთადერთი ადგილი კოდში, სადაც გვხვდება cy.visit()
 * ამატებს username/password ველებში მნიშვნელობებს და აჭერს Login-ს.
 * ცარიელი სტრიქონის .type('') ჩავარდება Cypress-ში, ამიტომ ვამოწმებთ
 * პირობით — ცარიელ სტრიქონს არ ვუწერთ type-ს, უბრალოდ ვტოვებთ ველს ცარიელი.
 */
Cypress.Commands.add('login', (username = 'standard_user', password = 'secret_sauce') => {
  cy.visit('/');

  if (username !== '') {
    cy.get('#user-name').type(username);
  }

  if (password !== '') {
    cy.get('#password').type(password);
  }

  cy.get('#login-button').click();
});

/**
 * cy.addToCart(productId)
 * productId — პროდუქტის data-test id-ის ბოლო ნაწილი,
 * მაგ: 'sauce-labs-backpack' → #add-to-cart-sauce-labs-backpack
 */
Cypress.Commands.add('addToCart', (productId) => {
  cy.get(`#add-to-cart-${productId}`).click();
});

/**
 * cy.fillCheckout(firstName, lastName, zip)
 * ავსებს checkout ფორმის ველებს და აჭერს Continue-ს.
 */
Cypress.Commands.add('fillCheckout', (firstName, lastName, zip) => {
  if (firstName !== '') {
    cy.get('#first-name').type(firstName);
  }
  if (lastName !== '') {
    cy.get('#last-name').type(lastName);
  }
  if (zip !== '') {
    cy.get('#postal-code').type(zip);
  }
  cy.get('#continue').click();
});

/**
 * ბონუსი: cy.logout()
 * ხსნის burger მენიუს და აჭერს Logout-ს.
 */
Cypress.Commands.add('logout', () => {
  cy.get('#react-burger-menu-btn').click();
  cy.get('#logout_sidebar_link').should('be.visible').click();
});
