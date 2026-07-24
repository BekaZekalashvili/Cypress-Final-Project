import sortOptions from '../fixtures/sortOptions.json';

// Hard Mode H3: ოთხივე სორტირება Data Driven ტესტებად
describe('სორტირების სრული მატრიცა — H3', () => {

  beforeEach(() => {
    cy.login();
  });

  sortOptions.forEach((sort) => {
    it(`სორტირება: ${sort.scenario}`, () => {
      cy.get('.product_sort_container').select(sort.value);

      if (sort.field === 'name') {
        cy.get('.inventory_item_name').then(($items) => {
          const names = [...$items].map((el) => el.innerText);
          const sorted = [...names].sort((a, b) =>
            sort.order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
          );
          expect(names).to.deep.equal(sorted);
        });
      } else {
        cy.get('.inventory_item_price').then(($prices) => {
          const values = [...$prices].map((el) => parseFloat(el.innerText.replace('$', '')));
          const sorted = [...values].sort((a, b) => (sort.order === 'asc' ? a - b : b - a));
          expect(values).to.deep.equal(sorted);
        });
      }
    });
  });

});

//komentari
