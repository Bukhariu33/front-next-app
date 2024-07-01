describe('should test admin fund manager flow', () => {
  beforeEach(() => {
    cy.visit('admin/auth/sign-in');
  });

  it('should login with admin and show list of fund managers', () => {
    cy.visitAdmin('/admin/fund-managers');
    cy.testFilterSort('ID');
    cy.testFilterSort('ID', 'desc');
    cy.testFilterDate('October 7, 2023', 'April 30, 2027');
    cy.getNumberOfRows().then(total => {
      expect(total).to.be.greaterThan(0);
    });
  });

  it('it should login with admin and go to fund manager tab and accept fund manager ', () => {
    cy.visitAdmin('/admin/fund-managers');

    cy.get('[data-cy-id="table-tabs"]').contains('Pending Approval').click();

    cy.url().should('include', '/admin/fund-managers?tab=pending');

    cy.get('[data-cy-id="table-body"] [data-cy-id="table-row"]')
      .first()
      .find('a')
      .click();
    const selectedStatus = 'Approved';
    cy.selectDropdownOption('selectStatus', selectedStatus);
    const routeUrl =
      selectedStatus === 'Approved'
        ? '/api/admin/fund-managers/*/approve'
        : '/api/admin/fund-managers/*/reject';

    cy.intercept({
      method: 'PATCH',
      url: `${routeUrl}`,
    }).as('updateFundManagerStatus');
    cy.get('[data-cy-button="confirm-modal"]').click();
    cy.wait('@updateFundManagerStatus').then(({ response }) => {
      expect(response?.statusCode).to.eq(200);
    });
    cy.get(`div:contains('${selectedStatus}')`).should('be.visible');
    cy.expectModal(/Your request has been successfully processed./i);
  });
});
