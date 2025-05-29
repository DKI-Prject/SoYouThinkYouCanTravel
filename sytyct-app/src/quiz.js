import React, { useState, useEffect } from 'react';

function Quiz({ category, onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    if (!category) return;

    setLoading(true);
    fetch(`http://localhost:3000/questions?category=${category}`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load questions.');
        setLoading(false);
      });
  }, [category]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    const currentQ = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQ.answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Finish quiz
      onComplete(score + (isCorrect ? 1 : 0), questions.length);
    }
    setSelectedOption('');
  };

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;
  if (questions.length === 0) return <p>No questions available for this category.</p>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
      <p>{currentQuestion.question}</p>
      <div className="options">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            className={option === selectedOption ? 'selected' : ''}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={!selectedOption}
      >
        {currentQuestionIndex + 1 === questions.length ? 'Finish' : 'Next'}
      </button>
    </div>
  );
}

export default Quiz;