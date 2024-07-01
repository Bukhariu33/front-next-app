// eslint-disable-next-line import/extensions
import createInvestorFail from 'cypress/support/utils/auth/create-account-fail';

describe('Register', () => {
  beforeEach(() => {
    cy.visit('/auth');
  });

  it('should register individual investor', () => {
    cy.createAccountAs('individualInvestor');
  });
  it('should register corporate investor', () => {
    cy.createAccountAs('corporateInvestor');
  });
  it('should register fund manager', () => {
    cy.createAccountAs('fundManager');
  });
  it('should fail to register individual investor', () => {
    createInvestorFail();
  });
});
