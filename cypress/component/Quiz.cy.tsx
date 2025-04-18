import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
  beforeEach(() => {
    cy.fixture('mockQuestions.json').as('mockQuestions');
    cy.intercept('GET', '/api/questions/random', { fixture: 'mockQuestions.json' }).as('getQuestions');
  });

  it('should render the start button initially', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('should start the quiz and display questions', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('h2').should('be.visible');
    cy.get('button').contains('1').should('be.visible');
  });

});
