import createFund from 'cypress/support/utils/create-fund';

describe('should test admin fund flow', () => {
  beforeEach(() => {
    cy.visit('admin/auth/sign-in');
  });

  it('should login with admin and show list of funds', () => {
    cy.visitAdmin('/admin/funds');
    cy.getNumberOfRows().then(total => {
      expect(total).to.be.greaterThan(0);
    });
  });

  it('should login with admin an add fund', () => {
    cy.visitAdmin('/admin/funds');

    cy.getNumberOfRows().then(totalBefore => {
      cy.get('[data-cy-button="create-new-fund"]').click();

      createFund();

      cy.intercept({
        method: 'POST',
        url: '/api/admin/funds',
      }).as('funds');

      cy.get('[data-cy-button="create-fund"]').click();

      cy.wait('@funds').then(({ response }) => {
        expect(response?.statusCode).to.eq(201);
      });

      cy.url().should('include', '/admin/funds');

      cy.getNumberOfRows().then(totalAfter => {
        expect(totalAfter).to.eq(totalBefore + 1);
      });
    });
  });

  it('should login with admin and add fund with empty fields', () => {
    cy.visitAdmin('/admin/funds');

    cy.get('[data-cy-button="create-new-fund"]').click();

    cy.url().should('include', '/admin/funds/new');
    cy.get('[data-cy-button="create-fund"]').click();

    cy.get('[data-cy-id="input-error-message"]')
      .contains('This field is required')
      .should('be.visible');
  });

  it('should login with admin and approve fund or reject fund', () => {
    cy.visitAdmin('/admin/funds');

    cy.clickLinkInRowWithStatus('Pending Approval', 6);

    const selectedStatus = 'Fund Approved';

    cy.selectDropdownOption('selectStatus', selectedStatus);
    const routeUrl =
      selectedStatus === 'Fund Approved'
        ? '/api/admin/funds/*/approve'
        : '/api/admin/funds/*/reject';

    cy.intercept({
      method: 'PUT',
      url: `${routeUrl}`,
    }).as('updateFundStatus');

    cy.get('[data-cy-button="confirm-modal"]').click();

    cy.wait('@updateFundStatus').then(({ response }) => {
      expect(response?.statusCode).to.eq(200);
    });

    cy.get(`div:contains('${selectedStatus}')`).should('be.visible');

    cy.expectModal(/Your request has been successfully processed./i);
  });
});
