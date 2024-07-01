function getNumberOfRows(): Cypress.Chainable<number> {
  return cy
    .get('[data-testid="pagination-text"]')
    .invoke('text')
    .then(text => {
      // Using a regular expression to extract the last number in the string
      const regex = /(\d+) results/;
      const match = text.match(regex);

      if (match) {
        const lastNumber = parseInt(match[1] as string, 10);
        cy.log(`Last number in the text is: ${lastNumber}`);
        return cy.wrap(lastNumber); // Wrapping the number as a Cypress Chainable
      }
      cy.log('No number found before the word "results".');
      throw new Error('No number found');
    });
}

export default getNumberOfRows;
