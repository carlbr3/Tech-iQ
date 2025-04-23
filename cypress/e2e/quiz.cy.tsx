describe('Quiz Test Suite', () => {
  const NUM_QUESTIONS = 20;

  beforeEach(() => {
      cy.visit('/');
      cy.intercept('GET', '/api/questions/random', {
          fixture: 'questions.json',
      }).as('getQuestions');
  });

  it('should render a quiz page with a start button', () => {
      // see: https://on.cypress.io/mounting-react
      cy.contains('Start Quiz').should('be.visible');
  });


  it('should render a question when the quiz starts', () => {
      cy.contains('Start Quiz').should('be.visible').click();
      cy.get('h2').should('exist');
  })

  it('should show all questions followed by quiz completed page', () => {
      cy.contains('Start Quiz').should('be.visible').click();
      for (let i = 0; i < NUM_QUESTIONS; i++) {
          cy.get('h2').should('exist');
          cy.get('button').first().click();
      }
      cy.contains('Your score:').should('exist');
      cy.get('button').contains('Take New Quiz').should('be.visible');
  });

  it('should start a new quiz', () => {
      cy.contains('Start Quiz').should('be.visible').click();
      for (let i = 0; i < NUM_QUESTIONS; i++) {
          cy.get('h2').should('exist');
          cy.get('button').first().click();
      };
      cy.get('button').contains('Take New Quiz').should('be.visible').click();
  })
})