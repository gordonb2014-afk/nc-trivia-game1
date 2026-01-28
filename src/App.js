import React, { useState } from 'react';

const NCTriviaGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const questions = [
    {
      question: "What is the state capital of North Carolina?",
      options: ["Charlotte", "Raleigh", "Durham", "Greensboro"],
      correct: 1,
      explanation: "Raleigh has been the capital of North Carolina since 1792."
    },
    {
      question: "Which famous aviation milestone occurred in North Carolina?",
      options: [
        "First commercial airline flight",
        "First powered airplane flight",
        "First helicopter flight",
        "First jet engine flight"
      ],
      correct: 1,
      explanation: "The Wright Brothers made the first powered airplane flight at Kitty Hawk in 1903."
    },
    {
      question: "What is North Carolina's state nickname?",
      options: ["The Sunshine State", "The Tar Heel State", "The Old North State", "Both B and C"],
      correct: 3,
      explanation: "North Carolina is known as both 'The Tar Heel State' and 'The Old North State'."
    },
    {
      question: "Which major technology hub is located in North Carolina?",
      options: ["Silicon Valley", "Research Triangle Park", "Tech Square", "Innovation Corridor"],
      correct: 1,
      explanation: "Research Triangle Park, formed by Duke, UNC, and NC State, is one of the largest research parks in the world."
    },
    {
      question: "What is North Carolina's highest peak?",
      options: ["Mount Mitchell", "Grandfather Mountain", "Clingmans Dome", "Roan Mountain"],
      correct: 0,
      explanation: "Mount Mitchell stands at 6,684 feet, making it the highest peak east of the Mississippi River."
    },
    {
      question: "Which famous soft drink was invented in North Carolina?",
      options: ["Coca-Cola", "Pepsi-Cola", "Dr. Pepper", "Mountain Dew"],
      correct: 1,
      explanation: "Pepsi-Cola was invented by Caleb Bradham in New Bern, NC in 1893."
    },
    {
      question: "How many colleges and universities are in the Research Triangle area?",
      options: ["3", "5", "Over 10", "Over 20"],
      correct: 2,
      explanation: "The Research Triangle region has over 10 major universities and colleges."
    },
    {
      question: "What major banking city is located in North Carolina?",
      options: ["Raleigh", "Durham", "Charlotte", "Winston-Salem"],
      correct: 2,
      explanation: "Charlotte is the second-largest banking center in the United States, after New York City."
    },
    {
      question: "Which North Carolina beach is known as the 'Graveyard of the Atlantic'?",
      options: ["Wrightsville Beach", "Outer Banks", "Emerald Isle", "Oak Island"],
      correct: 1,
      explanation: "The Outer Banks is called the 'Graveyard of the Atlantic' due to hundreds of shipwrecks off its coast."
    },
    {
      question: "What year did North Carolina ratify the U.S. Constitution?",
      options: ["1776", "1787", "1789", "1791"],
      correct: 2,
      explanation: "North Carolina was the 12th state to ratify the Constitution on November 21, 1789."
    }
  ];

  const handleAnswerClick = (selectedIndex) => {
    setSelectedAnswer(selectedIndex);
    setShowExplanation(true);

    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowScore(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Perfect! You're a true Tar Heel expert! 🏆";
    if (percentage >= 80) return "Excellent! You know your NC trivia! 🌟";
    if (percentage >= 60) return "Good job! You're learning about the Tar Heel State! 👍";
    if (percentage >= 40) return "Not bad! Keep exploring North Carolina! 📚";
    return "Time to brush up on your NC knowledge! 💪";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-2xl p-8 border border-slate-600">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400 mb-2">
            North Carolina Trivia
          </h1>
          <p className="text-slate-300">Test your knowledge of the Tar Heel State!</p>
        </div>

        {showScore ? (
          /* Score Screen */
          <div className="text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-3xl font-bold text-slate-100 mb-4">Game Complete!</h2>
              <div className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl p-6 mb-4 border border-slate-500">
                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400 mb-2">
                  {score} / {questions.length}
                </p>
                <p className="text-slate-300 text-xl">{getScoreMessage()}</p>
              </div>
            </div>
            <button
              onClick={restartGame}
              className="bg-gradient-to-r from-slate-600 to-slate-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-slate-500 hover:to-slate-400 transition-all transform hover:scale-105 shadow-lg"
            >
              Play Again
            </button>
          </div>
        ) : (
          /* Question Screen */
          <div>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-slate-300 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>Score: {score}</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-slate-400 to-slate-300 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="bg-slate-700 rounded-xl p-6 mb-6 border border-slate-600">
              <h2 className="text-2xl font-semibold text-slate-100 leading-relaxed">
                {questions[currentQuestion].question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {questions[currentQuestion].options.map((option, index) => {
                let buttonClass = "w-full text-left p-4 rounded-lg text-lg transition-all transform ";
                
                if (selectedAnswer === null) {
                  buttonClass += "bg-slate-700 hover:bg-slate-600 text-slate-100 hover:scale-102 border border-slate-600 hover:border-slate-500";
                } else if (index === questions[currentQuestion].correct) {
                  buttonClass += "bg-green-600 text-white border-2 border-green-400 scale-102";
                } else if (index === selectedAnswer) {
                  buttonClass += "bg-red-600 text-white border-2 border-red-400";
                } else {
                  buttonClass += "bg-slate-700 text-slate-400 border border-slate-600 opacity-50";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={selectedAnswer !== null}
                    className={buttonClass}
                  >
                    <span className="font-semibold mr-3 text-slate-400">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="bg-gradient-to-br from-slate-700 to-slate-600 border border-slate-500 rounded-xl p-5 mb-6">
                <div className="flex items-start">
                  <div className="text-2xl mr-3">
                    {selectedAnswer === questions[currentQuestion].correct ? "✅" : "❌"}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 mb-2">
                      {selectedAnswer === questions[currentQuestion].correct ? "Correct!" : "Incorrect"}
                    </h3>
                    <p className="text-slate-200">{questions[currentQuestion].explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Next Button */}
            {showExplanation && (
              <button
                onClick={handleNextQuestion}
                className="w-full bg-gradient-to-r from-slate-600 to-slate-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:from-slate-500 hover:to-slate-400 transition-all transform hover:scale-105 shadow-lg"
              >
                {currentQuestion + 1 === questions.length ? "See Results" : "Next Question →"}
              </button>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-600 text-center text-slate-400 text-sm">
          <p>🌲 Celebrating the Tar Heel State 🌲</p>
        </div>
      </div>
    </div>
  );
};

export default NCTriviaGame;