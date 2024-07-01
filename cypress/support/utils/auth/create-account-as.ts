import type { UserType } from '@/libs/types/auth/user';

const userData = {
  fullName: 'test_user',
  email: 'test@app.com',
  nationalId: '1231241242',
  dateOfBirth: 'May 21, 2002',
  mobile: '+966502222231',
  password: 'Test@1',
  crNumber: '1234567890',
};
const createIndividualInvestorAccount = () => {
  cy.get('[data-cy-input="fullName"]').type(userData.fullName);

  // Type the random email into the input  field
  cy.get('[data-cy-input="email"]').type(userData.email);

  // Type the random number into the input field
  cy.get('[data-cy-input="nationalId"]').type(userData.nationalId);

  cy.get('[data-test="dateOfBirth"]').type(userData.dateOfBirth);

  cy.get('[data-cy-input="mobile"]').click({ force: true });

  // Type the random Saudi mobile number into the input field
  cy.get('[data-cy-input="mobile"]').type(userData.mobile);

  cy.get('[data-cy-input="password"]').type(userData.password);
  cy.get('[data-cy-input="confirmPassword"]').type(userData.password);
  cy.get('[data-cy-input="terms-and-conditions"]').click();
  cy.get('[data-cy-input="privacy-policy"]').click();

  cy.get('[data-cy-button="next"]').click();

  cy.intercept('/api/auth/individual-investor/register').as('register');
  cy.fillOtp('1234');

  cy.wait('@register').then(({ response }) => {
    expect(response?.statusCode).to.eq(201);
  });
};

const createCorporateInvestorAccount = () => {
  cy.get('[data-cy-input="fullName"]').type(userData.fullName);

  cy.get('[data-cy-input="email"]').type(userData.email);

  cy.get('[data-cy-input="nationalId"]').type(userData.nationalId);

  cy.get('[data-test="dateOfBirth"]').type(userData.dateOfBirth);

  cy.get('[data-cy-input="mobile"]').click({ force: true });

  cy.get('[data-cy-input="mobile"]').type(userData.mobile);

  cy.get('[data-cy-input="password"]').type(userData.password);
  cy.get('[data-cy-input="confirmPassword"]').type(userData.password);

  cy.get('[data-cy-button="next"]').click();

  cy.get('[data-cy-input="crNumber"]').type(userData.crNumber);

  cy.get('[data-cy-input="terms-and-conditions"]').click();
  cy.get('[data-cy-input="privacy-policy"]').click();
  cy.get('[data-cy-button="next"]').click();
  cy.get('[data-cy-button="createAccount"]').click();
  cy.intercept('/api/auth/corporate-investor/register').as('register');
  cy.fillOtp('1234');

  cy.wait('@register').then(({ response }) => {
    expect(response?.statusCode).to.eq(201);
  });
};

const createFundManagerAccount = () => {
  cy.get('[data-cy-input="fullName"]').type(userData.fullName);

  cy.get('[data-cy-input="email"]').type(userData.email);

  cy.get('[data-cy-input="mobile"]').click({ force: true });

  cy.get('[data-cy-input="mobile"]').type(userData.mobile);

  cy.get('[data-cy-input="password"]').type(userData.password);
  cy.get('[data-cy-input="confirmPassword"]').type(userData.password);

  cy.get('button:contains("Next")').click();

  cy.get('[data-cy-input="crNumber"]').type(userData.crNumber);

  cy.get('[data-cy-input="terms-and-conditions"]').click();
  cy.get('[data-cy-input="privacy-policy"]').click();
  cy.get('[data-cy-button="next"]').click();
  cy.get('[data-cy-button="createAccount"]').click();
  cy.intercept('/api/auth/fund-managers/register').as('register');
  cy.fillOtp('1234');

  cy.wait('@register').then(({ response }) => {
    expect(response?.statusCode).to.eq(201);
  });
};

const createAccountAs = (userType: UserType) => {
  // select userType
  cy.selectUserType(userType);

  // fill the form
  switch (userType) {
    case 'individualInvestor':
      createIndividualInvestorAccount();
      break;
    case 'corporateInvestor':
      createCorporateInvestorAccount();
      break;
    case 'fundManager':
      createFundManagerAccount();
      break;
    default:
      break;
  }
};

export default createAccountAs;
