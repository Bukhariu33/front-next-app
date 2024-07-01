// eslint-disable-next-line import/extensions
import { fundManagerData } from 'cypress/constants/testCredentials';

const statuses = ['contractApproved', 'funded', 'live'];

describe('should test fund manager fund flow', () => {
  beforeEach(() => {
    cy.visit('auth/sign-in');
  });

  it('should login with fund manager and show list of funds', () => {
    cy.login(fundManagerData.email, fundManagerData.password);
    cy.url().should('include', '/fund-manager');
    cy.get('[data-testid="fund-card"]').should('have.length.greaterThan', 0);
  });

  it('should login with fund manager and click on fund with status pending approval and approve it', () => {
    cy.login(fundManagerData.email, fundManagerData.password);
    cy.url().should('include', '/fund-manager');
    cy.getFundCard('fundApproved', 'view-details');

    cy.get(
      '[data-test-id="tabs"][data-orientation="horizontal"] button',
    ).should('have.length', 1);
    const selectedStatus = 'fundApproved';
    const selectedButton = 'approve-fund';
    cy.getFundCard(`${selectedStatus}`, `${selectedButton}`);
    const routeURL =
      selectedStatus === 'fundApproved'
        ? '/api/fund-manager/funds/*/approve'
        : '/api/fund-manager/funds/*/reject';

    cy.intercept({
      method: 'PATCH',
      url: `${routeURL}`,
    }).as('updateFundStatus');
    cy.get('[data-cy-button="confirm-modal"]').click();

    cy.wait('@updateFundStatus').then(({ response }) => {
      expect(response?.statusCode).to.equal(200);
    });

    cy.get('[data-cy-button="close"]').click();
    cy.get(`[data-cy-button=${selectedButton}]`).should('not.exist');

    cy.get(
      '[data-test-id="tabs"][data-orientation="horizontal"] button',
    ).should($buttons => {
      expect($buttons.length).to.be.greaterThan(1);
    });
  });

  it('should login with fund manager and click on fund with status other than fundApproved', () => {
    cy.login(fundManagerData.email, fundManagerData.password);
    cy.url().should('include', '/fund-manager');
    cy.getFundCard(statuses, 'view-details');
    cy.get('[data-cy-button="approve-fund"]').should('not.exist');
    cy.get(
      '[data-test-id="tabs"][data-orientation="horizontal"] button',
    ).should($buttons => {
      expect($buttons.length).to.be.greaterThan(1);
    });
  });
});
