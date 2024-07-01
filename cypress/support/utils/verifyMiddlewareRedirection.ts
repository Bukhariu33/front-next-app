// eslint-disable-next-line import/extensions

function verifyMiddlewareRedirection(visitUrl: string, expectedUrl: string) {
  cy.visit(visitUrl);
  cy.url().should(url => {
    const parsedUrl = new URL(url);
    expect(parsedUrl.pathname).to.eq(expectedUrl);
  });
}

export default verifyMiddlewareRedirection;
