const checkIfAlreadyChosen = ($option: any) => {
  // Check if the element isn't already checked with 'data-checked="true"'
  if (
    !$option.attr('data-checked') ||
    $option.attr('data-checked') !== 'true'
  ) {
    // If not, click the option
    cy.wrap($option).click();
  } else {
    cy.get('body').type('{esc}');
  }
};

/**
 *
 * @param placeholder  The placeholder of the dropdown
 * @param optionText  The text of the option to select
 */

function selectDropdownOption(dataCyId: string, option?: string) {
  cy.get(`[data-cy-input="${dataCyId}"]`).click();
  if (option) {
    cy.get(`div[role="option"]:contains("${option}")`)
      .first()
      .filter(':visible')
      .then(checkIfAlreadyChosen);
  } else {
    cy.get('div[role="option"]')
      .filter(':visible')
      .first()
      .then(checkIfAlreadyChosen);
  }
}

export default selectDropdownOption;
