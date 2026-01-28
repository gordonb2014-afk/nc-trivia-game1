import React, { useState } from 'react';

const NorthCarolinaTrivia = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const questions = [
    {
      category: "COLONIAL HISTORY",
      value: "$800",
      clue: "In 1587, this colony on Roanoke Island mysteriously vanished, leaving only the word 'CROATOAN' carved into a post",
      answer: "What is the Lost Colony?",
      options: [
        "What is Jamestown?",
        "What is the Lost Colony?",
        "What is Plymouth?",
        "What is New Bern?"
      ],
      correct: 1
    },
    {
      category: "CIVIL WAR",
      value: "$1000",
      clue: "This March 1865 battle was the largest fought in North Carolina and the last major Confederate offensive of the war",
      answer: "What is the Battle of Bentonville?",
      options: [
        "What is the Battle of Fort Fisher?",
        "What is the Battle of Averasboro?",
        "What is the Battle of Bentonville?",
        "What is the Battle of Wyse Fork?"
      ],
      correct: 2
    },
    {
      category: "NATIVE AMERICANS",
      value: "$800",
      clue: "This Native American of the Croatan tribe helped maintain peace between colonists and indigenous peoples in the 1580s",
      answer: "Who is Manteo?",
      options: [
        "Who is Pocahontas?",
        "Who is Manteo?",
        "Who is Squanto?",
        "Who is Sacagawea?"
      ],
      correct: 1
    },
    {
      category: "LITERATURE",
      value: "$1200",
      clue: "This Asheville native won the Pulitzer Prize for Fiction in 1929 for his novel 'Look Homeward, Angel'",
      answer: "Who is Thomas Wolfe?",
      options: [
        "Who is O. Henry?",
        "Who is Thomas Wolfe?",
        "Who is Reynolds Price?",
        "Who is William Styron?"
      ],
      correct: 1
    },
    {
      category: "GEOGRAPHY",
      value: "$1000",
      clue: "At 5,946 feet, this mountain in the Great Smokies marks the highest point on the entire Appalachian Trail",
      answer: "What is Clingmans Dome?",
      options: [
        "What is Mount Mitchell?",
        "What is Grandfather Mountain?",
        "What is Clingmans Dome?",
        "What is Mount LeConte?"
      ],
      correct: 2
    },
    {
      category: "CIVIL RIGHTS",
      value: "$1000",
      clue: "On February 1, 1960, four African American college students staged a sit-in at a Woolworth's lunch counter in this Piedmont city",
      answer: "What is Greensboro?",
      options: [
        "What is Charlotte?",
        "What is Durham?",
        "What is Greensboro?",
        "What is Winston-Salem?"
      ],
      correct: 2
    },
    {
      category: "ARCHITECTURE",
      value: "$1200",
      clue: "George Vanderbilt's 250-room French Renaissance chateau near Asheville, completed in 1895, is America's largest privately-owned home",
      answer: "What is Biltmore Estate?",
      options: [
        "What is Reynolda House?",
        "What is Duke Mansion?",
        "What is Biltmore Estate?",
        "What is Tryon Palace?"
      ],
      correct: 2
    },
    {
      category: "TECHNOLOGY",
      value: "$800",
      clue: "This Research Triangle Park company, founded in 1980, became one of the world's largest biotechnology firms and developed drugs like Enbrel",
      answer: "What is Biogen (or Glaxo)?",
      options: [
        "What is IBM?",
        "What is Biogen (or Glaxo)?",
        "What is Cisco?",
        "What is Nortel?"
      ],
      correct: 1
    },
    {
      category: "MUSIC",
      value: "$1000",
      clue: "Born in Wadesboro in 1933, this 'High Priestess of Soul' sang 'Mississippi Goddam' and 'Feeling Good'",
      answer: "Who is Nina Simone?",
      options: [
        "Who is Roberta Flack?",
        "Who is Aretha Franklin?",
        "Who is Nina Simone?",
        "Who is Dionne Warwick?"
      ],
      correct: 2
    },
    {
      category: "REVOLUTIONARY WAR",
      value: "$1200",
      clue: "This October 1780 battle at a mountain straddling the NC-SC border was a turning point where Patriot militiamen defeated Loyalist forces",
      answer: "What is the Battle of Kings Mountain?",
      options: [
        "What is the Battle of Cowpens?",
        "What is the Battle of Guilford Courthouse?",
        "What is the Battle of Kings Mountain?",
        "What is the Battle of Moore's Creek Bridge?"
      ],
      correct: 2
    }
  ];

  const handleAnswerClick = (index) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3730a3 100%)',
      padding: '24px',
      fontFamily: 'Georgia, serif'
    },
    maxWidth: {
      maxWidth: '900px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    title: {
      fontSize: '64px',
      fontWeight: 'bold',
      color: '#fbbf24',
      marginBottom: '8px',
      letterSpacing: '4px',
      textShadow: '3px 3px 6px rgba(0,0,0,0.5)'
    },
    subtitle: {
      fontSize: '24px',
      color: '#bfdbfe',
      fontWeight: '600'
    },
    progressBar: {
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    progressText: {
      color: 'white',
      fontSize: '18px',
      fontWeight: '600'
    },
    questionCard: {
      background: '#1e40af',
      border: '4px solid #fbbf24',
      borderRadius: '12px',
      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)',
      overflow: 'hidden',
      marginBottom: '24px'
    },
    categoryBar: {
      background: '#1e3a8a',
      padding: '16px',
      borderBottom: '4px solid #fbbf24',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    categoryText: {
      color: '#fbbf24',
      fontWeight: 'bold',
      fontSize: '20px',
      letterSpacing: '1px'
    },
    valueText: {
      color: '#fbbf24',
      fontWeight: 'bold',
      fontSize: '24px'
    },
    clueBox: {
      padding: '32px',
      background: '#1e40af'
    },
    clueText: {
      color: 'white',
      fontSize: '24px',
      textAlign: 'center',
      lineHeight: '1.6',
      fontWeight: '300'
    },
    optionsContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '16px',
      marginBottom: '24px'
    },
    optionButton: {
      background: 'white',
      color: '#1f2937',
      border: '2px solid #d1d5db',
      borderRadius: '12px',
      padding: '20px',
      textAlign: 'left',
      fontSize: '18px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    correctOption: {
      background: '#d1fae5',
      borderColor: '#10b981'
    },
    incorrectOption: {
      background: '#fee2e2',
      borderColor: '#ef4444'
    },
    resultBox: {
      marginBottom: '16px',
      padding: '16px',
      borderRadius: '12px',
      textAlign: 'center'
    },
    correctResult: {
      background: '#d1fae5'
    },
    incorrectResult: {
      background: '#fee2e2'
    },
    resultText: {
      fontSize: '20px',
      fontWeight: '600'
    },
    correctText: {
      color: '#065f46'
    },
    incorrectText: {
      color: '#991b1b'
    },
    correctAnswerText: {
      color: '#374151',
      marginTop: '8px'
    },
    nextButton: {
      background: '#fbbf24',
      color: '#1e3a8a',
      padding: '16px 32px',
      borderRadius: '12px',
      fontSize: '20px',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 10px 15px rgba(0,0,0,0.3)',
      transition: 'all 0.3s',
      display: 'block',
      margin: '0 auto'
    },
    completionCard: {
      maxWidth: '600px',
      width: '100%',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)',
      padding: '48px',
      textAlign: 'center'
    },
    completionContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3730a3 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    },
    completionTitle: {
      fontSize: '48px',
      fontWeight: 'bold',
      marginBottom: '16px',
      color: '#1e3a8a'
    },
    scoreDisplay: {
      fontSize: '64px',
      fontWeight: 'bold',
      color: '#2563eb',
      marginBottom: '8px'
    },
    scoreSubtext: {
      fontSize: '24px',
      color: '#6b7280'
    },
    percentageText: {
      fontSize: '36px',
      fontWeight: '600',
      color: '#1e40af',
      marginTop: '16px'
    },
    messageText: {
      fontSize: '20px',
      color: '#374151',
      marginBottom: '32px',
      marginTop: '32px'
    },
    playAgainButton: {
      background: '#2563eb',
      color: 'white',
      padding: '16px 32px',
      borderRadius: '12px',
      fontSize: '20px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 10px 15px rgba(0,0,0,0.3)',
      transition: 'all 0.3s',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px'
    }
  };

  if (gameComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div style={styles.completionContainer}>
        <div style={styles.completionCard}>
          <div style={{ fontSize: '96px', marginBottom: '24px' }}>🏆</div>
          <h1 style={styles.completionTitle}>Game Complete!</h1>
          <div style={{ marginBottom: '32px' }}>
            <p style={styles.scoreDisplay}>{score}</p>
            <p style={styles.scoreSubtext}>out of {questions.length}</p>
            <p style={styles.percentageText}>{percentage}%</p>
          </div>
          <p style={styles.messageText}>
            {percentage === 100 && "Perfect score! You're a North Carolina history expert!"}
            {percentage >= 80 && percentage < 100 && "Excellent work! You really know your NC history!"}
            {percentage >= 60 && percentage < 80 && "Great job! You have solid knowledge of North Carolina!"}
            {percentage >= 40 && percentage < 60 && "Good effort! These were challenging questions!"}
            {percentage < 40 && "Nice try! North Carolina history is fascinating - keep learning!"}
          </p>
          <button
            onClick={resetGame}
            style={styles.playAgainButton}
            onMouseEnter={(e) => e.target.style.background = '#1e40af'}
            onMouseLeave={(e) => e.target.style.background = '#2563eb'}
          >
            ↻ Play Again
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.header}>
          <h1 style={styles.title}>NORTH CAROLINA</h1>
          <p style={styles.subtitle}>Jeopardy! Style Trivia</p>
        </div>

        <div style={styles.progressBar}>
          <div style={styles.progressText}>
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <div style={styles.progressText}>
            Score: {score}/{questions.length}
          </div>
        </div>

        <div style={styles.questionCard}>
          <div style={styles.categoryBar}>
            <span style={styles.categoryText}>{question.category}</span>
            <span style={styles.valueText}>{question.value}</span>
          </div>
          <div style={styles.clueBox}>
            <p style={styles.clueText}>{question.clue}</p>
          </div>
        </div>

        <div style={styles.optionsContainer}>
          {question.options.map((option, index) => {
            const isCorrect = index === question.correct;
            const isSelected = selectedAnswer === index;
            
            let buttonStyle = { ...styles.optionButton };
            
            if (showResult) {
              if (isCorrect) {
                buttonStyle = { ...buttonStyle, ...styles.correctOption };
              } else if (isSelected) {
                buttonStyle = { ...buttonStyle, ...styles.incorrectOption };
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={showResult}
                style={buttonStyle}
                onMouseEnter={(e) => {
                  if (!showResult) {
                    e.target.style.background = '#eff6ff';
                    e.target.style.boxShadow = '0 10px 15px rgba(0,0,0,0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showResult) {
                    e.target.style.background = 'white';
                    e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                  }
                }}
              >
                <span>{option}</span>
                {showResult && isCorrect && <span style={{ color: '#10b981', fontSize: '24px' }}>✓</span>}
                {showResult && isSelected && !isCorrect && <span style={{ color: '#ef4444', fontSize: '24px' }}>✗</span>}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              ...styles.resultBox,
              ...(selectedAnswer === question.correct ? styles.correctResult : styles.incorrectResult)
            }}>
              <p style={{
                ...styles.resultText,
                ...(selectedAnswer === question.correct ? styles.correctText : styles.incorrectText)
              }}>
                {selectedAnswer === question.correct ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              {selectedAnswer !== question.correct && (
                <p style={styles.correctAnswerText}>
                  The correct answer was: <strong>{question.answer}</strong>
                </p>
              )}
            </div>
            <button
              onClick={handleNext}
              style={styles.nextButton}
              onMouseEnter={(e) => e.target.style.background = '#f59e0b'}
              onMouseLeave={(e) => e.target.style.background = '#fbbf24'}
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NorthCarolinaTrivia;