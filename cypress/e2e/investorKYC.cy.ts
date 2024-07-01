/* eslint-disable import/extensions */
import {
  corporateInvestorData,
  individualInvestorData,
} from 'cypress/constants/testCredentials';
import finishKyc from 'cypress/support/utils/finish-kyc';

describe(`should test investors kyc flow`, () => {
  beforeEach(() => {
    cy.visit('auth/sign-in');
  });

  it('should test suitable corporate investor kyc', () => {
    cy.login(corporateInvestorData.email, corporateInvestorData.password);

    cy.get('[data-cy="kyc-alert"]')
      .should('be.visible')
      .get('a[href="/investor/kyc/personal-information"]')
      .click();

    finishKyc('corporate');
  });
  it('should test suitable individual investor kyc', () => {
    cy.login(individualInvestorData.email, individualInvestorData.password);

    cy.get('[data-cy="kyc-alert"]')
      .should('be.visible')
      .get('a[href="/investor/kyc/personal-information"]')
      .click();

    finishKyc('individual');
  });
  it('should test investor account after finishing kyc', () => {
    cy.login(individualInvestorData.email, individualInvestorData.password);

    cy.get('[data-cy="kyc-alert"]').should('not.exist');

    cy.verifyMiddlewareRedirection(
      '/investor/kyc/personal-information',
      '/investor',
    );
    cy.verifyMiddlewareRedirection(
      '/investor/kyc/client-classification',
      '/investor',
    );
    cy.verifyMiddlewareRedirection(
      '/investor/kyc/financial-condition',
      '/investor',
    );
    cy.verifyMiddlewareRedirection(
      '/investor/kyc/approval-and-declaration',
      '/investor',
    );
    cy.verifyMiddlewareRedirection('/investor/kyc/rating', '/investor');
    cy.verifyMiddlewareRedirection(
      '/investor/kyc/rating-not-acceptable-report',
      '/investor',
    );
  });

  it('should test unsuitable individual investor kyc', () => {
    cy.exec('node ./scripts/setupTest investors');
    cy.exec('node ./scripts/setupTest kyc');
    cy.login(individualInvestorData.email, individualInvestorData.password);

    cy.get('[data-cy="kyc-alert"]')
      .should('be.visible')
      .get('a[href="/investor/kyc/personal-information"]')
      .click();

    finishKyc('individual', 'unsuitable');
  });
});
