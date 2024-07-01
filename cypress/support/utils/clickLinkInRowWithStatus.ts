/**
 *
 * @param status  The status to search for
 * @param statusColumnNumber  The column number of the status column
 */
const clickLinkInRowWithStatus = (
  status: string,
  statusColumnNumber: number,
): void => {
  cy.get('table tbody tr').each($row => {
    const $cells = $row.find('td');
    const $statusCell = $cells.eq(statusColumnNumber - 1); // Adjust for 0-based index
    const $firstCell = $cells.first();

    // Search for a nested div that contains the given status text
    const $nestedDiv = $statusCell.find(`div:contains("${status}")`);

    // Check if such a div is found
    if ($nestedDiv.length > 0) {
      // Get the link in the first td
      const $link = $firstCell.find('a');

      // Wrap it as a Cypress object and click it
      cy.wrap($link).click();

      // Break the .each() loop early since we've found and clicked the element
      return false;
    }
    return true;
  });
};

export default clickLinkInRowWithStatus;
