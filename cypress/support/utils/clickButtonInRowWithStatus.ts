/**
 *
 * @param status  The status to search for
 * @param statusColumnNumber  The column number of the status column
 */
const clickButtonInRowWithStatus = (
  status: string,
  statusColumnNumber: number,
): void => {
  cy.get('[data-cy-id="table-body"] [data-cy-id="table-row"]')
    .filter((_, $row) => {
      const $cells = Cypress.$($row).find('td');
      const statusText = $cells
        .eq(statusColumnNumber - 1) // Adjust for 0-based index
        .text()
        .trim();
      return statusText === status;
    })
    .first()
    .then($row => {
      const $lastCell = Cypress.$($row).find('td').last();
      const $button = $lastCell.find('button');
      cy.wrap($button).should('exist').click({ force: true });
    });
};

export default clickButtonInRowWithStatus;
