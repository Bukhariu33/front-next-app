// eslint-disable-next-line import/extensions
import { adminData } from 'cypress/constants/testCredentials';

function visitAdmin(path: string) {
  cy.login(adminData.email, adminData.password);
  cy.url().should('include', '/admin');
  cy.get(`[data-cy-link="${path}"]`).click();
}

export default visitAdmin;
