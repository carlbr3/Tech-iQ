import { useState } from "react";
import type { Question } from "../models/Question.js";
import { getQuestions } from "../services/questionApi.js";

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getRandomQuestions = async () => {
    setLoading(true);
    try {
      const questions = await getQuestions();
      console.log("Received questions:", questions); // Debug log

      if (!questions || !Array.isArray(questions) || questions.length === 0) {
        throw new Error("Failed to fetch questions");
      }

      setQuestions(questions);
      setError(null);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to load questions. Please try again.");
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerClick = (selectedIndex: number) => {
    const isCorrect =
      selectedIndex === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleStartQuiz = async () => {
    setQuizStarted(true);
    setQuizCompleted(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    await getRandomQuestions();
  };

  if (!quizStarted) {
    return (
      <div className="p-4 text-center">
        <button
          data-testid="start-button"
          className="btn btn-primary d-inline-block mx-auto"
          onClick={handleStartQuiz}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" data-testid="error-message">
        {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="card p-4 text-center">
        <h2>Quiz Completed</h2>
        <div className="alert alert-success" data-testid="score">
          Your score: {score}/{questions.length}
        </div>
        <button
          data-testid="new-quiz-button"
          className="btn btn-primary d-inline-block mx-auto"
          onClick={handleStartQuiz}
        >
          Take New Quiz
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="alert alert-warning">
        No questions available. Please try again.
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  console.log("Current question:", currentQuestion); // Debug log

  return (
    <div className="card p-4">
      <h2 data-testid="question">{currentQuestion.question}</h2>
      <div className="mt-3" data-testid="answers">
        {currentQuestion.answers.map((answer, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <button
              data-testid="answer"
              className="btn btn-primary"
              onClick={() => handleAnswerClick(index)}
            >
              {index + 1}
            </button>
            <div className="alert alert-secondary mb-0 ms-2 flex-grow-1">
              {answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;