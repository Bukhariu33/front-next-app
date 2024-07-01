/**
 *
 * @param label  The label of the date picker
 * @param date  The date to select in the date picker in days for example 10 or 15
 */

import dayjs from 'dayjs';

function selectDateFromPicker(cyId: string, date: Date) {
  const dayAreaLabel = dayjs(date).locale('en').format('D MMMM YYYY');

  // Find the date picker button by cy-data and click it to open the date picker
  cy.get(`[data-cy="${cyId}"]`).click();

  // button with data-direction="next"
  if (date.getDay() >= 29) {
    cy.get(
      `#date-time-picker-popover-${cyId}-dropdown button[data-direction="next"]`,
    ).click();
  }

  cy.get(`#date-time-picker-popover-${cyId}-dropdown`)
    // find
    .find(`table td button[aria-label="${dayAreaLabel}"]`)
    .click();

  // Click the submit button to confirm the date selection
  cy.get(`#date-time-picker-submit-button-${cyId}`).click();
}

export default selectDateFromPicker;
