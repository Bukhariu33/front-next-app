/* eslint-disable no-plusplus */

export const getColumnIndexByText = (
  headerText: string,
): Cypress.Chainable<number> => {
  return cy
    .get('[data-cy-id="table-head"] [data-cy-id="table-row"] th')
    .then($headers => {
      // Convert the headers to an array
      const headers = $headers.toArray();
      // Find the index of the header with the correct text
      const index = headers.findIndex(
        header => Cypress.$(header).text() === headerText,
      );
      if (index === -1) {
        throw new Error(
          `The index for the header "${headerText}" could not be determined.`,
        );
      }
      return index;
    });
};

export const testFilterSort = (
  filter: string,
  sort: 'asc' | 'desc' = 'asc',
) => {
  let optionFilter = filter;
  if (sort === 'desc') {
    // ID to ID (DESC)
    optionFilter = `${filter} (DESC)`;
  }
  cy.selectDropdownOption('sort-by', optionFilter);
  cy.get('[data-cy-button="apply-filters"]').click();

  // Get the index of the column to sort by
  getColumnIndexByText(filter).then(filterIndex => {
    cy.get('[data-cy-id="table-body"] [data-cy-id="table-row"]').then($rows => {
      // Map the text of each row to an array
      const values = $rows
        .map((_, row) => Cypress.$(row).find('td').eq(filterIndex).text())
        .get();
      // Iterate through the array and compare each row to the next
      for (let i = 0; i < values.length - 1; i++) {
        const currentText = values[i] ?? ''; // currentText is the text of the current row
        const nextText = values[i + 1] ?? ''; // nextText is the text of the next row

        // Perform the comparison using localeCompare.
        if (sort === 'asc') {
          // If the sort is ascending, the current row should be less than or equal to the next row
          expect(currentText.localeCompare(nextText)).to.be.at.most(
            0,
            `Row ${i} is not less than or equal to Row ${i + 1}`,
          );
        } else {
          // If the sort is descending, the current row should be greater than or equal to the next row
          expect(currentText.localeCompare(nextText)).to.be.at.least(
            0,
            `Row ${i} is not greater than or equal to Row ${i + 1}`,
          );
        }
      }
    });
  });
};

export const testFilterDate = (startDate: string, endDate: string) => {
  const startDateTime = new Date(startDate).getTime();
  const endDateTime = new Date(endDate).getTime();

  cy.get('[data-cy-input="date-filter-from"]').type(startDate);
  cy.get('[data-cy-input="date-filter-to"]').type(endDate);
  cy.get('[data-cy-button="apply-filters"]').click();

  // Get the index of the column to sort by
  getColumnIndexByText('Created At').then(createdAtColumnIndex => {
    cy.get('[data-cy-id="table-body"] [data-cy-id="table-row"]').each($row => {
      // Use the `createdAtColumnIndex` to get the date text from the correct column
      const dateText = $row.find('td').eq(createdAtColumnIndex).text();

      // Assert the row date is within the range
      const rowDateTime = new Date(dateText).getTime();
      expect(rowDateTime).to.be.at.least(
        startDateTime,
        `The date ${dateText} is before the start date ${startDate}.`,
      );
      expect(rowDateTime).to.be.at.most(
        endDateTime,
        `The date ${dateText} is after the end date ${endDate}.`,
      );
    });
  });
};
