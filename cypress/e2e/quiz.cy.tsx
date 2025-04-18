describe("Quiz Application", () => {
    beforeEach(() => {
      cy.fixture("mockQuestions.json").as("mockQuestions");
      cy.intercept("GET", "/api/questions/random", {
        fixture: "mockQuestions.json",
      }).as("getQuestions");
      cy.visit("http://127.0.0.1:3001");
    });
  
    it("should render the start button initially", () => {
      cy.get("button").contains("Start Quiz").should("be.visible");
    });
  
    it("should start the quiz and display questions", () => {
      cy.get("button").contains("Start Quiz").click();
      cy.wait("@getQuestions");
      cy.get("h2").should("be.visible");
      cy.get("button").contains("1").should("be.visible");
    });
  
    it("should display the score after completing the quiz", () => {
      cy.get("button").contains("Start Quiz").click();
      cy.wait("@getQuestions");
  
      // Loop through all 10 questions
      for (let i = 0; i < 10; i++) {
        cy.get("button").contains("1").click();
      }
  
      cy.get("h2").contains("Quiz Completed").should("be.visible");
      cy.get(".alert-success").should("be.visible");
    });
  
    it("should allow taking a new quiz after completion", () => {
      cy.get("button").contains("Start Quiz").click();
      cy.wait("@getQuestions");
  
      // Loop through all 10 questions
      for (let i = 0; i < 10; i++) {
        cy.get("button").contains("1").click();
      }
  
      cy.get("button").contains("Take New Quiz").click();
      //cy.get("button").contains("Start Quiz").should("be.visible");
    });
  });