/* eslint-disable import/extensions */
import {
  corporateInvestorData,
  fundManagerData,
  individualInvestorData,
} from 'cypress/constants/testCredentials';
/* eslint-enable import/extensions */

function loginAndVisit(
  userType:
    | 'fundManager'
    | 'individualInvestor'
    | 'corporateInvestor'
    | 'admin',
  path: string,
) {
  switch (userType) {
    case 'fundManager': {
      cy.login(fundManagerData.email, fundManagerData.password);
      cy.url().should('include', '/fund-manager');
      cy.get('[data-testid="navbar-dropdown-selector"]').click();
      cy.get(`[data-portal="true"] a[href="${path}"]`).click();
      break;
    }

    case 'individualInvestor': {
      cy.login(individualInvestorData.email, individualInvestorData.password);
      cy.url().should('include', '/investor');
      cy.get('[data-testid="navbar-dropdown-selector"]').click();
      cy.get(`[data-portal="true"] a[href="${path}"]`).click();
      break;
    }

    case 'corporateInvestor': {
      cy.login(corporateInvestorData.email, corporateInvestorData.password);
      cy.url().should('include', '/investor');
      cy.get('[data-testid="navbar-dropdown-selector"]').click();
      cy.get(`[data-portal="true"] a[href="${path}"]`).click();
      break;
    }

    case 'admin':
    default:
      cy.visitAdmin(path);
      break;
  }
}

export default loginAndVisit;
