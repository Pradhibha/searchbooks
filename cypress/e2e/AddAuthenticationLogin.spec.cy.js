describe('Login Page', () => {

    it('Shows error for invalid credentials', () => {
        cy.visit('http://localhost:3000');
    
        // Fill out login form with incorrect credentials
        cy.get('#Username').type('invaliduser');
        cy.get('#Password').type('invalidpassword');
    
        // Submit login
        cy.get('#submit').click();
    
        // Verify error message
        cy.contains('Internal Server Error').should('be.visible');
      });
      
    it('Logs in with valid credentials', () => {
      cy.visit('http://localhost:3000');
  
      // Fill out login form
      cy.get('#Username').type('book');
      cy.get('#Password').type('book');
  
      // Submit login
      cy.get('#submit').click();
  
      // Verify redirection to SearchPage
      cy.url().should('include', '/SearchPage');
    });
  
    
  });
  