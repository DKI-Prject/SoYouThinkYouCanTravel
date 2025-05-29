import React, { useState } from 'react';
import Quiz from './quiz';
import Result from './results';
import CategorySelector from './categorySelector';

function App() {
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [category, setCategory] = useState(null);
  const categories = ['beaches', 'mountains', 'nature', 'parks'];

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleQuizComplete = (finalScore, questionsCount) => {
    setScore(finalScore);
    setTotalQuestions(questionsCount);
    setShowResult(true);
  };

  const handleRestart = () => {
    setShowResult(false);
    setScore(0);
    setCategory(null);
  };

  return (
    <div className="app-container">
      <header>
        <h1>So You Think You Can Travel?</h1>
      </header>

      {!category ? (
        <CategorySelector categories={categories} onSelectCategory={handleCategorySelect} />
      ) : !showResult ? (
        <Quiz
          category={category}
          onComplete={(score, questionsCount) => handleQuizComplete(score, questionsCount)}
        />
      ) : (
        <Result score={score} totalQuestions={totalQuestions} onRestart={handleRestart} />
      )}

      {category && !showResult && (
        <button onClick={() => setCategory(null)}>Change Category</button>
      )}
    </div>
  );
}

export default App;