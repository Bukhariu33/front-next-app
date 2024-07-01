function expectSuccessModal(modalText: string | number | RegExp) {
  cy.get('.mantine-Modal-content')
    .contains('p', modalText)
    .should('be.visible');

  cy.get('.mantine-Modal-content')
    .get('button')
    .contains('span', 'Close')
    .click();

  cy.get('.mantine-Modal-content').should('not.exist');
}

export default expectSuccessModal;
