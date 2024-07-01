const userData = {
  fullName: 'test_user',
  email: 'test@app',
  nationalId: '1231241242',
  dateOfBirth: 'May 21, 2002',
  mobile: '+966502222231',
  password: 'Test@1',
  crNumber: '1234567890',
};
const createIndividualInvestorAccount = () => {
  cy.get('[data-cy-input="fullName"]').type(userData.fullName);

  // Type the invalid email into the input  field
  cy.get('[data-cy-input="email"]').type(userData.email);

  // Type the random number into the input field
  cy.get('[data-cy-input="nationalId"]').type(userData.nationalId);

  // check for error message in p with text Email must be valid
  cy.get('span:contains("Email must be valid")').should('be.visible');

  cy.get('[data-test="dateOfBirth"]').type(userData.dateOfBirth);

  cy.get('[data-cy-input="mobile"]').click({ force: true });

  // Type the random Saudi mobile number into the input field
  cy.get('[data-cy-input="mobile"]').type(userData.mobile);

  cy.get('[data-cy-input="password"]').type(userData.password);
  cy.get('[data-cy-input="confirmPassword"]').type(userData.password);
  cy.get('[data-cy-input="terms-and-conditions"]').click();
  cy.get('[data-cy-input="privacy-policy"]').click();

  // check the button is disabled
  cy.get('[data-cy-button="next"]').should('be.disabled');
};

const createInvestorFail = () => {
  cy.selectUserType('individualInvestor');
  createIndividualInvestorAccount();
};

export default createInvestorFail;
