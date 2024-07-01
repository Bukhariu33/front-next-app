// eslint-disable-next-line import/extensions
import hasDaysPassed from '@/utils/hasDaysPassed';

describe(`should test investor's my investments flow`, () => {
  beforeEach(() => {
    cy.visit('admin/auth/sign-in');
    cy.loginAndVisit('corporateInvestor', '/investor/my-investments');
  });

  it('should open my investments page and show investments dashboard and fallback messages if no investments', () => {
    cy.intercept('/api/investor/investments/dashboard', req => {
      req.headers['Cache-Control'] = 'no-cache';
    }).as('dashboard');

    cy.intercept('/api/investor/investments*', req => {
      req.headers['Cache-Control'] = 'no-cache';
    }).as('investments');

    cy.url().should('contain', '/investor/my-investments');
    cy.wait('@dashboard').then(({ response }) => {
      if (response?.body) {
        cy.get('[data-cy-id="investments-dashboard"]').should('be.visible');
      } else {
        cy.get('[data-cy-id="investments-dashboard"]').should('not.exist');
        cy.get('[data-cy-id="no-investments"]').should('be.visible');
      }
    });

    cy.wait('@investments').then(({ response }) => {
      if (response?.body.data.length > 0) {
        const numberOfInvestments = response?.body.data.length;
        cy.get('[data-testid="fund-card"]').as('fundCards');
        cy.get('@fundCards').should('have.length', numberOfInvestments);
      } else {
        cy.get('[data-cy-id="noInvestmentsYet"]').should('be.visible');
      }
    });
  });

  it('should open my investments page and view investment details', () => {
    cy.intercept('/api/investor/investments*', req => {
      req.headers['Cache-Control'] = 'no-cache';
    }).as('investments');

    cy.url().should('contain', '/investor/my-investments');

    cy.wait('@investments').then(({ response }) => {
      if (response?.body.data.length > 0) {
        cy.get('[data-testid="fund-card"]')
          .first()
          .within(() => {
            cy.get(`[data-cy-button="investment-details"]`).click();
          });
        cy.url().should(
          'contain',
          `/investor/my-investments/${response?.body.data[0].id}`,
        );
      }
    });
  });

  it('should open my investments page and try to cancel investment', () => {
    cy.intercept('/api/investor/investments*', req => {
      req.headers['Cache-Control'] = 'no-cache';
    }).as('investments');

    cy.url().should('contain', '/investor/my-investments');

    cy.wait('@investments').then(({ response }) => {
      if (response?.body.data.length > 0) {
        cy.get('[data-testid="fund-card"]')
          .first()
          .within(() => {
            cy.get(`[data-cy-button="investment-details"]`).click();
          });
        cy.url().should(
          'contain',
          `/investor/my-investments/${response?.body.data[0].id}`,
        );
        cy.get('[data-cy-button="cancel-investment"]').click();
        const canCancelInvestment = !hasDaysPassed(
          new Date(response?.body.data[0].investmentDate),
          2,
        );
        if (canCancelInvestment) {
          cy.expectModalAction(
            'Are you sure you want to cancel your investment ?',
            () => {
              cy.get('[data-cy-button="cancel-investment"]').click();
            },
          );
        } else {
          cy.expectModalAction(
            'We have received your request to cancel your investment.',
          );
        }
      }
    });
  });
});
