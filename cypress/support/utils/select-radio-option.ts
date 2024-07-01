/**
 *
 * @param dataCY  The data-cy value of the radio container
 * @param labelText  Optional: The text of the radio option to select, if not passed then the first radio option available will be selected
 */

function selectRadioOption(dataCY: string, labelText?: string | RegExp) {
  if (labelText) {
    cy.get(`[data-cy="${dataCY}"] label`)
      .contains(labelText)
      .then($label => {
        cy.wrap($label).scrollIntoView();
        cy.wrap($label).click();
      });
    return;
  }
  cy.get(`[data-cy="${dataCY}"] [type="radio"]`)
    .first()
    .then($radio => {
      cy.wrap($radio).scrollIntoView();
      cy.wrap($radio).check();
    });
}

export default selectRadioOption;
