// eslint-disable-next-line import/extensions
import type { UserType } from '@/libs/types/auth/user';

const selectUserType = (userType: UserType) => {
  switch (userType) {
    case 'individualInvestor':
      cy.get('[data-cy-id="investor"]').click();
      cy.get('[data-cy-id="individualInvestor"]').click();
      break;
    case 'corporateInvestor':
      cy.get('[data-cy-id="investor"]').click();
      cy.get('[data-cy-id="corporateInvestor"]').click();
      break;
    case 'fundManager':
      cy.get('[data-cy-id="fundManager"]').click();
      break;
    default:
      throw new Error(`Unsupported user type: ${userType}`);
  }
  cy.get('[data-cy-button="createAccount"]').click();
};

export default selectUserType;
