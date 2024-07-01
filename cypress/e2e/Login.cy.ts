const validUserData = {
  email: 'individual-investor@test.com',
  password: 'password',
};
const invalidUserData = {
  email: 'individual-investor7@app',
  password: 'password',
};

describe('it should login', () => {
  beforeEach(() => {
    cy.visit('/auth/sign-in');
  });

  it('should login with valid credentials', () => {
    cy.login(validUserData.email, validUserData.password);
  });

  it('should fail to login with invalid credentials', () => {
    cy.get('[data-cy-input="email"]').type(invalidUserData.email);
    cy.get('[data-cy-input="password"]').type(invalidUserData.password);

    cy.get('[data-cy-id="input-error-message"]')
      .contains('Email must be valid')
      .should('be.visible');

    cy.get('[data-cy-button="login"]').should('be.disabled');
  });
});
