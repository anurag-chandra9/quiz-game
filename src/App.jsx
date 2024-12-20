import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import './index.css';

const Dashboard = ({ score, totalQuestions, onStartQuiz }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Quiz Game!</h1>
        <p className="text-lg mb-4">Your Previous Score: {score} / {totalQuestions}</p>
        <button
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={onStartQuiz}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

const Quiz = ({ questions, onFinishQuiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      onFinishQuiz(score + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md w-11/12 md:w-2/3 lg:w-1/2">
        <div className="mb-4 text-lg font-semibold text-gray-700">
          <span>Question {currentQuestion + 1}</span>/{questions.length}
        </div>
        <div className="text-xl font-bold mb-6 text-gray-900">
          {questions[currentQuestion].question}
        </div>
        <div className="grid grid-cols-1 gap-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-left bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: [
        "William Shakespeare",
        "Charles Dickens",
        "Mark Twain",
        "Leo Tolstoy",
      ],
      answer: "William Shakespeare",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      answer: "Pacific Ocean",
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["O2", "H2O", "CO2", "HO2"],
      answer: "H2O",
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "Japan", "Thailand", "South Korea"],
      answer: "Japan",
    },
    {
      question: "What is the tallest mountain in the world?",
      options: ["K2", "Kangchenjunga", "Mount Everest", "Makalu"],
      answer: "Mount Everest",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
      answer: "Leonardo da Vinci",
    },
    {
      question: "What is the smallest unit of life?",
      options: ["Atom", "Molecule", "Cell", "Organ"],
      answer: "Cell",
    },
    {
      question: "Which is the longest river in the world?",
      options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
      answer: "Nile",
    },
  ];

  const [showDashboard, setShowDashboard] = useState(true);
  const [finalScore, setFinalScore] = useState(0);

  const startQuiz = () => {
    setShowDashboard(false);
  };

  const finishQuiz = (score) => {
    setFinalScore(score);
    setShowDashboard(true);
  };

  return (
    <div>
      {showDashboard ? (
        <Dashboard
          score={finalScore}
          totalQuestions={questions.length}
          onStartQuiz={startQuiz}
        />
      ) : (
        <Quiz questions={questions} onFinishQuiz={finishQuiz} />
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
