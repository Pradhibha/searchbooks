describe('Add Book Form', () => {
    it('Successfully adds a book', () => {
      cy.visit('http://localhost:3000');
  
      // Fill out login form
      cy.get('#Username').type('book');
      cy.get('#Password').type('book');
  
      // Submit login
      cy.get('#submit').click();
  
      // Verify redirection to SearchPage
      cy.url().should('include', '/SearchPage')
      cy.visit('http://localhost:3000/add-book');
  
     // Fill out form fields
    cy.get('input[name="title"]').type('Sample Book Title');
    cy.get('input[name="authors"]').type('John Doe');
    cy.get('input[name="description"]', { timeout: 10000 }).should('be.visible').type('This is a sample description.');
    cy.get('input[name="published_date"]').type('2023-01-01');
    cy.get('input[name="genre"]').type('Fiction');
    cy.get('input[name="isbn"]').type('1234567890123');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Assert success message or navigate to another page
    cy.url().should('include', '/SearchPage');
    });
  });
  