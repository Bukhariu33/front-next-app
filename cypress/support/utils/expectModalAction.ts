/**
 * @param bodyText the text or regex to be found in the modal body
 * @param action an optional function to be executed after the modal is found
 */
function expectModalAction(
  bodyText: string | number | RegExp,
  action?: () => void,
) {
  cy.get('.mantine-Modal-content').contains('p', bodyText).should('be.visible');
  action?.();
}

export default expectModalAction;
