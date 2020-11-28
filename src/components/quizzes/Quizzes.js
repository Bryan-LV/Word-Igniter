import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import QuizContext from '../../context/quizzes/QuizContext'
import VocabContext from '../../context/vocab/VocabContext';

function Quizzes() {
  // Re-routes if user is not logged in.
  useAuth();
  const { QuizState } = useContext(QuizContext);
  const { VocabState } = useContext(VocabContext);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
  }, [QuizState, VocabState])

  return (
    <div>
      <div className="py-4 text-center">
        <h2 className="text-4xl font-semibold tracking-wide text-gray-800">Create your own quizzes</h2>
        <p className="text-gray-700 tracking-wide max-w-sm mx-auto">Select words from your word list that you want to practice. Make a quiz with only those words to solidify your knowledge.</p>
        <Link to="/quizzes/quiz-maker" className="uppercase font-semibold text-white bg-gray-800 py-2 px-8 rounded-md mt-4 inline-block">Make a quiz</Link>
      </div>
    </div >
  )
}

export default Quizzes;
