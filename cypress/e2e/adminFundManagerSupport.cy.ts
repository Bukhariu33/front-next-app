describe(`should test admin's fund managers support flow`, () => {
  beforeEach(() => {
    cy.visit('admin/auth/sign-in');
    cy.visitAdmin('/admin/fund-managers');
    cy.get('[data-cy-id="table-body"] [data-cy-id="table-row"]')
      .find('a')
      .first()
      .click();
    cy.get('[data-cy-id="Help & Support"]').click();
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
      url: '/api/admin/support/*/messages',
    }).as('sendMessageRequest');

    cy.intercept({
      method: 'GET',
      url: '/api/admin/support/*/messages',
    }).as('getMessagesRequest');

    cy.get('@submitButton').click();

    cy.wait('@sendMessageRequest').then(({ response }) => {
      expect(response?.statusCode).to.eq(201);
    });

    cy.expectModal(/Message sent successfully/i);

    cy.wait('@getMessagesRequest').then(({ response }) => {
      expect(response?.statusCode).to.eq(200);

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

  it('should change the status of the first open ticket to resolved', () => {
    cy.clickButtonInRowWithStatus('Open', 6);

    cy.intercept({
      method: 'PATCH',
      url: '/api/admin/support/*',
    }).as('updateStatusRequest');

    cy.selectDropdownOption('selectStatus', 'Resolved');

    cy.wait('@updateStatusRequest').then(({ response }) => {
      expect(response?.statusCode).to.eq(200);
    });

    cy.expectModal(/Ticket status updated successfully/i);
  });
});
