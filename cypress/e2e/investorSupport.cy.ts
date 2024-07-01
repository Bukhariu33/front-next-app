describe(`should test investor support flow`, () => {
  beforeEach(() => {
    cy.visit('auth/sign-in');
    cy.loginAndVisit('individualInvestor', '/investor/support');
  });

  it('should create a new support ticket', () => {
    cy.get('a[href="/investor/support/new"]').click();

    cy.get('[data-cy-button="send"]').as('submitButton');
    cy.get('@submitButton').should('be.disabled');

    cy.get('[data-cy-input="title"]').type('Ticket Subject');
    cy.selectDropdownOption('category', 'User Training');
    cy.get('[data-cy-input="message"]').type('First Message');

    cy.uploadFile('ticketAttachments', 'test.jpeg', 'image/jpeg');

    cy.intercept({
      method: 'POST',
      url: '/api/support/create-ticket',
    }).as('createRequest');
    cy.get('@submitButton').click();
    cy.wait('@createRequest').then(({ response }) => {
      expect(response?.statusCode).to.eq(201);
      cy.url().should(
        'contain',
        `/investor/support/${response?.body?.data?.id}`,
      );
    });

    cy.expectModal(/Ticket created successfully/i);
  });

  it('should send a message to the first open ticket', () => {
    cy.clickButtonInRowWithStatus('Open', 6);

    cy.get('[data-cy-id="support-message-list"] [data-cy-id="support-message"]')
      .should('exist')
      .then($lis => {
        cy.wrap($lis).as('initialListItems');
      });

    cy.get('[data-cy-button="send-message"]').as('submitButton');
    cy.get('@submitButton').should('be.disabled');

    cy.get('[data-cy-input="message"]').type('Message form body');

    cy.get('[data-cy-button="attach-file"]').should('exist').click();
    cy.uploadFile('messageAttachment', 'test.jpeg', 'image/jpeg', true);

    cy.intercept({
      method: 'POST',
      url: '/api/support/*/messages',
    }).as('sendMessageRequest');

    cy.intercept({
      method: 'GET',
      url: '/api/support/*/messages',
    }).as('getMessagesRequest');

    cy.get('@submitButton').click();

    cy.wait('@sendMessageRequest').then(({ response }) => {
      expect(response?.statusCode).to.eq(201);
    });

    cy.expectModal(/Message sent successfully/i);

    cy.wait('@getMessagesRequest');

    cy.get('@initialListItems').then(initialListItems => {
      cy.get(
        '[data-cy-id="support-message-list"] [data-cy-id="support-message"]',
      ).should('have.length', initialListItems.length + 1);
      cy.get(
        '[data-cy-id="support-message-list"] [data-cy-id="support-message"]',
      )
        .first()
        .should('contain.text', 'Message form body');
    });
  });
});
