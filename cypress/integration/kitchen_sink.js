describe('rumbldt website', function() {
  it('visits the correct website', function() {
    cy.visit('http://localhost:3000/#/')
  });
  it('finds the Log In link and clicks on it', function() {
    cy.contains('Log In').click();
    cy.url().should('include', '#/');
  })
  it('should type in the email address and password', function() {
    cy.get('#emailaddress').type('ben_test@gmail3.com');
    cy.get('#password').type('123456');
  })
  it('should click the Sign In button', function() {
    cy.contains('Sign In').click();
  })
  it('should find the explore icon and click it', function() {
    cy.get('.explore_nav').click();
  })
})