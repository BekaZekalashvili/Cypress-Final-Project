import checkoutData from '../fixtures/checkoutData.json';

describe('სრული E2E სცენარი — გვირგვინი', () => {

  it('ლოგინიდან შეკვეთის დადასტურებამდე — სრული ციკლი', () => {
    // 1. ლოგინი
    cy.login();

    // 2. 2 პროდუქტის დამატება
    cy.addToCart('sauce-labs-backpack');
    cy.addToCart('sauce-labs-bike-light');
    cy.get('.shopping_cart_badge').should('have.text', '2');

    // 3. კალათაში გადასვლა და პროდუქტების გადამოწმება
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.get('.inventory_item_name').should('have.length', 2);
    cy.get('.inventory_item_name').eq(0).should('contain', 'Sauce Labs Backpack');
    cy.get('.inventory_item_name').eq(1).should('contain', 'Sauce Labs Bike Light');

    // 4. Checkout — ფორმის შევსება fixture-ის მონაცემებით
    cy.get('#checkout').click();
    const { firstName, lastName, zip } = checkoutData.valid;
    cy.fillCheckout(firstName, lastName, zip);

    // 5. Overview გვერდზე ჯამური ფასის შემოწმება
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.summary_total_label').should('be.visible');

    // H1 (ბონუსი / Hard Mode): Item total = ცალკეული ფასების ჯამი
    cy.get('.summary_subtotal_label')
      .invoke('text')
      .then((subtotalText) => {
        const subtotal = parseFloat(subtotalText.replace('Item total: $', ''));

        cy.get('.inventory_item_price')
          .then(($prices) => {
            const sum = [...$prices]
              .map((el) => parseFloat(el.innerText.replace('$', '')))
              .reduce((a, b) => a + b, 0);

            expect(subtotal).to.equal(sum);
          });
      });

    // 6. Finish → "Thank you for your order!"
    cy.get('#finish').click();
    cy.get('.complete-header').should('contain', 'Thank you for your order!');
  });

});

// ------------------------------------------------------------------
// H2 (Hard Mode): Data Driven სრული ციკლი — 3 სხვადასხვა შესყიდვა
// ------------------------------------------------------------------
describe('Data Driven სრული ციკლი — H2', () => {

  checkoutData.multiPurchase.forEach((purchase) => {
    it(`სცენარი: ${purchase.scenario}`, () => {
      cy.login();

      purchase.products.forEach((productId) => {
        cy.addToCart(productId);
      });
      cy.get('.shopping_cart_badge').should('have.text', String(purchase.products.length));

      cy.get('.shopping_cart_link').click();
      cy.get('.inventory_item_name').should('have.length', purchase.products.length);

      cy.get('#checkout').click();
      cy.fillCheckout(purchase.firstName, purchase.lastName, purchase.zip);

      cy.url().should('include', '/checkout-step-two.html');
      cy.get('.summary_total_label').should('be.visible');

      cy.get('#finish').click();
      cy.get('.complete-header').should('contain', 'Thank you for your order!');
    });
  });

});
