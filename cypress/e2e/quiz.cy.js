describe('Quiz Test', () => {
  const num_questions = 20
  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', {
      fixture: 'questions.json'
    }).as('getQuestions')
})
  it('should render a quiz start-up page with a start button', () => {
    // see: https://on.cypress.io/mounting-react
    
    

    cy.contains("Start Quiz").should('be.visible')
  })
  it('should render a quiz question when the quiz starts', () => {
    

    cy.contains("Start Quiz").should('be.visible').click()

    cy.get("h2").should('exist')
  })
  it('should show all questions completed by quiz completed page', () => {
    

    cy.contains("Start Quiz").should('be.visible').click()
    for (let i = 0; i < num_questions; i++) {
      cy.get("h2").should('exist')
      cy.get("button").first().click()
    }
    cy.contains("Your score").should('be.visible')
    cy.get('button').contains('Take New Quiz').should('be.visible')
  })
  it('should start a new quiz', () => {
    

    cy.contains("Start Quiz").should('be.visible').click()
    for (let i = 0; i < num_questions; i++) {
      cy.get("h2").should('exist')
      cy.get("button").first().click()
    }
    cy.get('button').contains('Take New Quiz').should('be.visible').click()
  })
})
