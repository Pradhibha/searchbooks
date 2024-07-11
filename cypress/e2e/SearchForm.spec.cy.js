describe('Search Form', () => {
    it('Performs a book search', () => {
      cy.visit('http://localhost:3000');
  
      // Fill out login form
      cy.get('#Username').type('book');
      cy.get('#Password').type('book');
  
      // Submit login
      cy.get('#submit').click();
  
      // Verify redirection to SearchPage
      cy.url().should('include', '/SearchPage')
  
      // Fill out the search form
      cy.get('input[name="title"]').type('Test Book');
      cy.get('input[name="author"]').type('Test Author');
      cy.get('input[name="startDate"]').type('2022-01-01');
      cy.get('input[name="endDate"]').type('2023-01-01');
      cy.get('input[name="genre"]').type('Test Genre');
      
  
      // Submit the form
      cy.get('button[type="button"]').contains('Search').click();
  
      
    });
  });
  