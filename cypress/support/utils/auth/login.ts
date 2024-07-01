function login(email: string, password: string) {
  cy.get('[data-cy-input="email"]').type(email);
  cy.get('[data-cy-input="password"]').type(password);
  cy.get('[data-cy-button="login"]').click();
  cy.intercept('/api/auth/callback/credentials').as('login');
  cy.fillOtp('1234');

  cy.wait('@login').then(({ response }) => {
    expect(response?.statusCode).to.eq(200);
  });
}

export default login;
