// cypress/support/e2e.js
import './commands';

// ბონუსი: ყოველი ჩავარდნილი ტესტის შემდეგ სქრინშოტი
afterEach(function () {
  if (this.currentTest.state === 'failed') {
    const testName = Cypress.currentTest.title.replace(/[^a-zA-Zა-ჰ0-9]/g, '_');
    cy.screenshot(`FAILED_${testName}`, { capture: 'runner' });
  }
});
