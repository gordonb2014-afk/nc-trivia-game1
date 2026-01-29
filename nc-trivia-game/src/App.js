import React, { useState, useEffect } from 'react';

const NorthCarolinaTrivia = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0); // Now tracks dollar amounts
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [questionRevealed, setQuestionRevealed] = useState(false);
  const [finalJeopardy, setFinalJeopardy] = useState(false);
  const [wager, setWager] = useState(0);
  const [wagerSet, setWagerSet] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState(null);

  // Helper function to convert value string to number (e.g., "$800" -> 800)
  const getValueAmount = (valueString) => {
    return parseInt(valueString.replace('$', '').replace(',', ''));

  const questions = [
    {
      category: "COLONIAL GOVERNORS",
      value: "$800",
      clue: "This colonial governor, who served from 1765-1771, built an elaborate palace in New Bern that became the colonial capital",
      answer: "Who is William Tryon?",
      options: [
        "Who is Arthur Dobbs?",
        "Who is William Tryon?",
        "Who is Gabriel Johnston?",
        "Who is Josiah Martin?"
      ],
      correct: 1
    },
    {
      category: "ANTEBELLUM NORTH CAROLINA",
      value: "$1000",
      clue: "This 1771 uprising by backcountry farmers against colonial officials ended with a decisive defeat at the Battle of Alamance",
      answer: "What is the Regulator Movement?",
      options: [
        "What is Bacon's Rebellion?",
        "What is Shays' Rebellion?",
        "What is the Regulator Movement?",
        "What is the Whiskey Rebellion?"
      ],
      correct: 2
    },
    {
      category: "CHEROKEE NATION",
      value: "$800",
      clue: "This Cherokee leader created a syllabary for the Cherokee language in the early 19th century, making written communication possible for his people",
      answer: "Who is Sequoyah?",
      options: [
        "Who is John Ross?",
        "Who is Sequoyah?",
        "Who is Attakullakulla?",
        "Who is Junaluska?"
      ],
      correct: 1
    },
    {
      category: "NC UNIVERSITY SYSTEM",
      value: "$1200",
      clue: "Founded in 1789 and chartered in 1795, this institution claims to be the first public university in the United States to admit students",
      answer: "What is the University of North Carolina at Chapel Hill?",
      options: [
        "What is Duke University?",
        "What is the University of North Carolina at Chapel Hill?",
        "What is Wake Forest University?",
        "What is Davidson College?"
      ],
      correct: 1
    },
    {
      category: "NC WATERWAYS",
      value: "$1000",
      clue: "This narrow waterway along the coast, part of the Intracoastal Waterway, separates the Outer Banks from the mainland",
      answer: "What is the Albemarle and Pamlico Sound?",
      options: [
        "What is the Cape Fear River?",
        "What is Currituck Sound?",
        "What is the Albemarle and Pamlico Sound?",
        "What is the Neuse River?"
      ],
      correct: 2
    },
    {
      category: "RECONSTRUCTION ERA",
      value: "$1000",
      clue: "In 1898, this port city experienced a violent coup d'état that overthrew its biracial Fusionist government",
      answer: "What is Wilmington?",
      options: [
        "What is Raleigh?",
        "What is Charlotte?",
        "What is Wilmington?",
        "What is Greensboro?"
      ],
      correct: 2
    },
    {
      category: "HISTORIC PRESERVATION",
      value: "$1200",
      clue: "This 1770 Georgian-style residence in New Bern served as the colonial and early state capitol and has been meticulously restored",
      answer: "What is Tryon Palace?",
      options: [
        "What is Biltmore Estate?",
        "What is the Governor's Mansion?",
        "What is Tryon Palace?",
        "What is Old Salem?"
      ],
      correct: 2
    },
    {
      category: "NC AGRICULTURE",
      value: "$800",
      clue: "North Carolina leads the nation in production of this crop, which has been central to the state's economy since colonial times",
      answer: "What is tobacco?",
      options: [
        "What is cotton?",
        "What is tobacco?",
        "What is corn?",
        "What is soybeans?"
      ],
      correct: 1
    },
    {
      category: "SPORTS LEGENDS",
      value: "$1000",
      clue: "This basketball legend from Wilmington won six NBA championships with the Chicago Bulls and is considered the greatest player of all time",
      answer: "Who is Michael Jordan?",
      options: [
        "Who is Magic Johnson?",
        "Who is Larry Bird?",
        "Who is Michael Jordan?",
        "Who is Kobe Bryant?"
      ],
      correct: 2
    },
    {
      category: "REVOLUTIONARY CONFLICT",
      value: "$1200",
      clue: "This February 1776 battle near Wilmington was the first major battle of the Revolutionary War in North Carolina, won by Patriot forces",
      answer: "What is the Battle of Moore's Creek Bridge?",
      options: [
        "What is the Battle of Guilford Courthouse?",
        "What is the Battle of Kings Mountain?",
        "What is the Battle of Moore's Creek Bridge?",
        "What is the Battle of Ramseur's Mill?"
      ],
      correct: 2
    }
  ];

  const finalJeopardyQuestion = {
    category: "NORTH CAROLINA STATE SYMBOLS",
    clue: "Adopted in 1893, North Carolina's state motto in Latin translates to 'To be, rather than to seem'",
    answer: "What is Esse Quam Videri?",
    options: [
      "What is Esse Quam Videri?",
      "What is E Pluribus Unum?",
      "What is Excelsior?",
      "What is Deo Vindice?"
    ],
    correct: 0
  };

  useEffect(() => {
    setQuestionRevealed(false);
    const timer = setTimeout(() => setQuestionRevealed(true), 100);
    return () => clearTimeout(timer);
  }, [currentQuestion, finalJeopardy]);

  const playSound = (type) => {
    if (isMuted) return;
    // Placeholder for sound effects
    // const audio = new Audio(type === 'correct' ? '/sounds/correct.mp3' : '/sounds/incorrect.mp3');
    // audio.play();
  };

  const handleAnswerClick = (index) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === questions[currentQuestion].correct) {
      const questionValue = getValueAmount(questions[currentQuestion].value);
      setScore(score + questionValue);
      setShowConfetti(true);
      playSound('correct');
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      playSound('incorrect');
    }
  };

  const handleFinalAnswer = (index) => {
    if (finalAnswer !== null) return;
    
    setFinalAnswer(index);
    
    if (index === finalJeopardyQuestion.correct) {
      setScore(score + wager);
      setShowConfetti(true);
      playSound('correct');
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setScore(score - wager);
      playSound('incorrect');
    }
    
    setTimeout(() => setGameComplete(true), 3000);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Move to Final Jeopardy
      setFinalJeopardy(true);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleWagerSubmit = () => {
    if (wager >= 0 && wager <= score) {
      setWagerSet(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
    setShowConfetti(false);
    setFinalJeopardy(false);
    setWager(0);
    setWagerSet(false);
    setFinalAnswer(null);
  };

  const Confetti = () => {
    if (!showConfetti) return null;
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1000
      }}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: '-10px',
              width: '10px',
              height: '10px',
              background: ['#fbbf24', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)],
              animation: `fall ${2 + Math.random() * 2}s linear`,
              opacity: 0.8,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
      </div>
    );
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 30%, #1e40af 60%, #3730a3 100%)',
      padding: '24px',
      fontFamily: 'Georgia, serif',
      position: 'relative',
      overflow: 'hidden'
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
      `,
      pointerEvents: 'none'
    },
    maxWidth: {
      maxWidth: '900px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 1
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
      animation: 'fadeInDown 1s ease-out'
    },
    title: {
      fontSize: '72px',
      fontWeight: 'bold',
      color: '#fbbf24',
      marginBottom: '12px',
      letterSpacing: '6px',
      textShadow: `
        0 0 20px rgba(251, 191, 36, 0.5),
        0 0 40px rgba(251, 191, 36, 0.3),
        3px 3px 10px rgba(0,0,0,0.8)
      `,
      animation: 'glow 2s ease-in-out infinite alternate'
    },
    subtitle: {
      fontSize: '28px',
      color: '#bfdbfe',
      fontWeight: '600',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
    },
    muteButton: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '24px',
      color: 'white',
      transition: 'all 0.3s',
      zIndex: 100
    },
    progressBar: {
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid rgba(255,255,255,0.2)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      animation: questionRevealed ? 'slideInRight 0.6s ease-out' : 'none'
    },
    progressText: {
      color: 'white',
      fontSize: '20px',
      fontWeight: '600',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
    },
    questionCard: {
      background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
      border: '5px solid #fbbf24',
      borderRadius: '16px',
      boxShadow: `
        0 20px 60px rgba(0,0,0,0.6),
        0 0 0 1px rgba(251, 191, 36, 0.5),
        inset 0 1px 0 rgba(255,255,255,0.1)
      `,
      overflow: 'hidden',
      marginBottom: '32px',
      animation: questionRevealed ? 'scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'none',
      transform: questionRevealed ? 'scale(1)' : 'scale(0.8)',
      opacity: questionRevealed ? 1 : 0
    },
    categoryBar: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
      padding: '20px',
      borderBottom: '5px solid #fbbf24',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    categoryBarGlow: {
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.3), transparent)',
      animation: 'shimmer 3s infinite'
    },
    categoryText: {
      color: '#fbbf24',
      fontWeight: 'bold',
      fontSize: '22px',
      letterSpacing: '2px',
      textShadow: '0 0 10px rgba(251, 191, 36, 0.5)',
      position: 'relative',
      zIndex: 1
    },
    valueText: {
      color: '#fbbf24',
      fontWeight: 'bold',
      fontSize: '28px',
      textShadow: '0 0 15px rgba(251, 191, 36, 0.7)',
      position: 'relative',
      zIndex: 1
    },
    clueBox: {
      padding: '40px',
      background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
      position: 'relative'
    },
    clueText: {
      color: 'white',
      fontSize: '26px',
      textAlign: 'center',
      lineHeight: '1.7',
      fontWeight: '300',
      textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
      animation: questionRevealed ? 'fadeIn 1s ease-out 0.3s both' : 'none'
    },
    optionsContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '20px',
      marginBottom: '32px'
    },
    optionButton: {
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      color: '#1f2937',
      border: '3px solid #cbd5e1',
      borderRadius: '16px',
      padding: '24px',
      textAlign: 'left',
      fontSize: '20px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      position: 'relative',
      overflow: 'hidden',
      animation: questionRevealed ? 'slideInLeft 0.5s ease-out both' : 'none'
    },
    correctOption: {
      background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
      borderColor: '#10b981',
      boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)',
      transform: 'scale(1.02)'
    },
    incorrectOption: {
      background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
      borderColor: '#ef4444',
      boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)'
    },
    resultBox: {
      marginBottom: '20px',
      padding: '24px',
      borderRadius: '16px',
      textAlign: 'center',
      animation: 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      border: '3px solid'
    },
    correctResult: {
      background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
      borderColor: '#10b981',
      boxShadow: '0 0 40px rgba(16, 185, 129, 0.4)'
    },
    incorrectResult: {
      background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
      borderColor: '#ef4444',
      boxShadow: '0 0 40px rgba(239, 68, 68, 0.4)'
    },
    resultText: {
      fontSize: '24px',
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
      marginTop: '12px',
      fontSize: '18px'
    },
    nextButton: {
      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      color: '#1e3a8a',
      padding: '20px 40px',
      borderRadius: '16px',
      fontSize: '22px',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 10px 30px rgba(251, 191, 36, 0.4)',
      transition: 'all 0.3s',
      display: 'block',
      margin: '0 auto',
      textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
    },
    wagerContainer: {
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '20px',
      padding: '40px',
      maxWidth: '600px',
      margin: '40px auto',
      textAlign: 'center',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      animation: 'scaleIn 0.6s ease-out'
    },
    wagerTitle: {
      fontSize: '36px',
      color: '#1e3a8a',
      marginBottom: '20px',
      fontWeight: 'bold'
    },
    wagerText: {
      fontSize: '20px',
      color: '#374151',
      marginBottom: '30px'
    },
    wagerInput: {
      fontSize: '28px',
      padding: '15px',
      borderRadius: '12px',
      border: '3px solid #3b82f6',
      width: '200px',
      textAlign: 'center',
      marginBottom: '20px',
      fontFamily: 'Georgia, serif'
    },
    wagerButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: 'white',
      padding: '15px 40px',
      borderRadius: '12px',
      fontSize: '20px',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)',
      transition: 'all 0.3s'
    },
    completionCard: {
      maxWidth: '700px',
      width: '100%',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '24px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
      padding: '60px',
      textAlign: 'center',
      border: '5px solid #fbbf24',
      animation: 'scaleIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    },
    completionContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 30%, #1e40af 60%, #3730a3 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    },
    completionTitle: {
      fontSize: '56px',
      fontWeight: 'bold',
      marginBottom: '24px',
      color: '#1e3a8a',
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
    },
    scoreDisplay: {
      fontSize: '72px',
      fontWeight: 'bold',
      color: '#2563eb',
      marginBottom: '8px',
      textShadow: '0 0 20px rgba(37, 99, 235, 0.3)'
    },
    scoreSubtext: {
      fontSize: '26px',
      color: '#6b7280'
    },
    percentageText: {
      fontSize: '40px',
      fontWeight: '600',
      color: '#1e40af',
      marginTop: '20px'
    },
    messageText: {
      fontSize: '22px',
      color: '#374151',
      marginBottom: '40px',
      marginTop: '40px',
      lineHeight: '1.6'
    },
    playAgainButton: {
      background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
      color: 'white',
      padding: '20px 40px',
      borderRadius: '16px',
      fontSize: '22px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 10px 30px rgba(37, 99, 235, 0.4)',
      transition: 'all 0.3s',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px'
    }
  };

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes fadeInDown {
        from { opacity: 0; transform: translateY(-30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideInRight {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes bounceIn {
        0% { opacity: 0; transform: scale(0.3); }
        50% { transform: scale(1.05); }
        100% { opacity: 1; transform: scale(1); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes glow {
        from {
          text-shadow: 0 0 20px rgba(251, 191, 36, 0.5),
                       0 0 40px rgba(251, 191, 36, 0.3),
                       3px 3px 10px rgba(0,0,0,0.8);
        }
        to {
          text-shadow: 0 0 30px rgba(251, 191, 36, 0.8),
                       0 0 60px rgba(251, 191, 36, 0.5),
                       3px 3px 10px rgba(0,0,0,0.8);
        }
      }
      @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
      }
      @keyframes fall {
        to {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  if (gameComplete) {
    const totalQuestions = questions.length + 1; // Include Final Jeopardy
    return (
      <div style={styles.completionContainer}>
        <Confetti />
        <div style={styles.completionCard}>
          <div style={{ fontSize: '100px', marginBottom: '32px' }}>🏆</div>
          <h1 style={styles.completionTitle}>Game Complete!</h1>
          <div style={{ marginBottom: '40px' }}>
            <p style={styles.scoreDisplay}>${score.toLocaleString()}</p>
            <p style={styles.scoreSubtext}>Final Score</p>
            <p style={styles.messageText}>
              You earned ${score.toLocaleString()} playing North Carolina Jeopardy!
            </p>
          </div>
          <p style={styles.messageText}>
            {score >= 9000 && "Incredible! You're a true North Carolina expert!"}
            {score >= 7000 && score < 9000 && "Excellent work! You really know your NC history!"}
            {score >= 5000 && score < 7000 && "Great job! You have solid knowledge of North Carolina!"}
            {score >= 3000 && score < 5000 && "Good effort! These were challenging questions!"}
            {score < 3000 && "Nice try! North Carolina history is fascinating - keep learning!"}
          </p>
          <button
            onClick={resetGame}
            style={styles.playAgainButton}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 15px 40px rgba(37, 99, 235, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 10px 30px rgba(37, 99, 235, 0.4)';
            }}
          >
            ↻ Play Again
          </button>
        </div>
      </div>
    );
  }

  // Final Jeopardy Round
  if (finalJeopardy) {
    if (!wagerSet) {
      return (
        <div style={styles.container}>
          <div style={styles.backgroundPattern}></div>
          <div style={styles.maxWidth}>
            <div style={styles.header}>
              <h1 style={styles.title}>FINAL JEOPARDY!</h1>
              <p style={styles.subtitle}>Place Your Wager</p>
            </div>
            <div style={styles.wagerContainer}>
              <h2 style={styles.wagerTitle}>Current Score: ${score.toLocaleString()}</h2>
              <p style={styles.wagerText}>
                How much would you like to wager on the final question?
                <br />
                (You can wager between $0 and ${score.toLocaleString()})
              </p>
              <input
                type="number"
                min="0"
                max={score}
                value={wager}
                onChange={(e) => setWager(Math.min(Math.max(0, parseInt(e.target.value) || 0), score))}
                style={styles.wagerInput}
                placeholder="Enter amount"
              />
              <br />
              <button
                onClick={handleWagerSubmit}
                style={styles.wagerButton}
                disabled={wager < 0 || wager > score}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 15px 35px rgba(59, 130, 246, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.4)';
                }}
              >
                Lock In Wager
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Final Jeopardy Question
    return (
      <div style={styles.container}>
        <div style={styles.backgroundPattern}></div>
        <Confetti />
        <div style={styles.maxWidth}>
          <div style={styles.header}>
            <h1 style={styles.title}>FINAL JEOPARDY!</h1>
            <p style={styles.subtitle}>Category: {finalJeopardyQuestion.category}</p>
          </div>

          <div style={styles.progressBar}>
            <div style={styles.progressText}>Wager: ${wager.toLocaleString()}</div>
            <div style={styles.progressText}>Current Score: ${score.toLocaleString()}</div>
          </div>

          <div style={styles.questionCard}>
            <div style={styles.categoryBar}>
              <div style={styles.categoryBarGlow}></div>
              <span style={styles.categoryText}>{finalJeopardyQuestion.category}</span>
              <span style={styles.valueText}>FINAL</span>
            </div>
            <div style={styles.clueBox}>
              <p style={styles.clueText}>{finalJeopardyQuestion.clue}</p>
            </div>
          </div>

          <div style={styles.optionsContainer}>
            {finalJeopardyQuestion.options.map((option, index) => {
              const isCorrect = index === finalJeopardyQuestion.correct;
              const isSelected = finalAnswer === index;
              
              let buttonStyle = { 
                ...styles.optionButton,
                animationDelay: `${index * 0.1}s`
              };
              
              if (finalAnswer !== null) {
                if (isCorrect) {
                  buttonStyle = { ...buttonStyle, ...styles.correctOption };
                } else if (isSelected) {
                  buttonStyle = { ...buttonStyle, ...styles.incorrectOption };
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleFinalAnswer(index)}
                  disabled={finalAnswer !== null}
                  style={buttonStyle}
                  onMouseEnter={(e) => {
                    if (finalAnswer === null) {
                      e.target.style.transform = 'translateX(10px) scale(1.02)';
                      e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)';
                      e.target.style.borderColor = '#3b82f6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (finalAnswer === null) {
                      e.target.style.transform = 'translateX(0) scale(1)';
                      e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                      e.target.style.borderColor = '#cbd5e1';
                    }
                  }}
                >
                  <span>{option}</span>
                  {finalAnswer !== null && isCorrect && <span style={{ color: '#10b981', fontSize: '28px' }}>✓</span>}
                  {finalAnswer !== null && isSelected && !isCorrect && <span style={{ color: '#ef4444', fontSize: '28px' }}>✗</span>}
                </button>
              );
            })}
          </div>

          {finalAnswer !== null && (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                ...styles.resultBox,
                ...(finalAnswer === finalJeopardyQuestion.correct ? styles.correctResult : styles.incorrectResult)
              }}>
                <p style={{
                  ...styles.resultText,
                  ...(finalAnswer === finalJeopardyQuestion.correct ? styles.correctText : styles.incorrectText)
                }}>
                  {finalAnswer === finalJeopardyQuestion.correct ? `✓ Correct! You won $${wager.toLocaleString()}!` : `✗ Incorrect! You lost $${wager.toLocaleString()}.`}
                </p>
                {finalAnswer !== finalJeopardyQuestion.correct && (
                  <p style={styles.correctAnswerText}>
                    The correct answer was: <strong>{finalJeopardyQuestion.answer}</strong>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Regular Questions
  const question = questions[currentQuestion];

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>
      <Confetti />
      
      <button
        onClick={() => setIsMuted(!isMuted)}
        style={styles.muteButton}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.background = 'rgba(255, 255, 255, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
        }}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

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
            Score: ${score.toLocaleString()}
          </div>
        </div>

        <div style={styles.questionCard}>
          <div style={styles.categoryBar}>
            <div style={styles.categoryBarGlow}></div>
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
            
            let buttonStyle = { 
              ...styles.optionButton,
              animationDelay: `${index * 0.1}s`
            };
            
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
                    e.target.style.transform = 'translateX(10px) scale(1.02)';
                    e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)';
                    e.target.style.borderColor = '#3b82f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showResult) {
                    e.target.style.transform = 'translateX(0) scale(1)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                    e.target.style.borderColor = '#cbd5e1';
                  }
                }}
              >
                <span>{option}</span>
                {showResult && isCorrect && <span style={{ color: '#10b981', fontSize: '28px', textShadow: '0 0 10px rgba(16, 185, 129, 0.5)' }}>✓</span>}
                {showResult && isSelected && !isCorrect && <span style={{ color: '#ef4444', fontSize: '28px', textShadow: '0 0 10px rgba(239, 68, 68, 0.5)' }}>✗</span>}
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
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 15px 40px rgba(251, 191, 36, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 10px 30px rgba(251, 191, 36, 0.4)';
              }}
            >
              {currentQuestion < questions.length - 1 ? 'Next Question →' : 'Final Jeopardy! 🎯'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NorthCarolinaTrivia;