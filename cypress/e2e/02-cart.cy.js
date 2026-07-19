describe('კალათის ტესტები', () => {

  beforeEach(() => {
    cy.login();
  });

  it('პროდუქტის დამატებისას ბეჯზე ჩნდება "1"', () => {
    cy.addToCart('sauce-labs-backpack');
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });

  it('2 პროდუქტის დამატებისას ბეჯზე წერია "2"', () => {
    cy.addToCart('sauce-labs-backpack');
    cy.addToCart('sauce-labs-bike-light');
    cy.get('.shopping_cart_badge').should('have.text', '2');
  });

  it('Remove ღილაკი პროდუქტს შლის (ბეჯი ქრება)', () => {
    cy.addToCart('sauce-labs-backpack');
    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.get('#remove-sauce-labs-backpack').click();
    cy.get('.shopping_cart_badge').should('not.exist');
  });

  it('კალათის გვერდზე ჩანს დამატებული პროდუქტის სახელი', () => {
    cy.addToCart('sauce-labs-backpack');
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack');
  });

  // ბონუსი: სორტირების ტესტი
  it('Price (low to high) სორტირების შემდეგ პირველი ფასი ≤ ბოლო ფასზე', () => {
    cy.get('.product_sort_container').select('lohi');

    cy.get('.inventory_item_price').then(($prices) => {
      const values = [...$prices].map((el) =>
        parseFloat(el.innerText.replace('$', ''))
      );
      const first = values[0];
      const last = values[values.length - 1];
      expect(first).to.be.at.most(last);
    });
  });

});
