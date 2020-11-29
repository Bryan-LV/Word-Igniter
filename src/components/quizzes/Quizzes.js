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

    /*FIXME: This works, but takes 4 iterations in total to get useable data
      Find a more efficient way to do this.
    */

    // Iterate through Quizzes, which is an array of objects
    const quizList = QuizState.reduce((acc, quizObj) => {
      // Each quiz has a property with an array of the quiz word IDs 
      const curWord = quizObj.QuizWordIDs.map(wordID => {
        // Return matching word from vocabulary list
        return VocabState.words.filter(word => word.id === wordID);
      })
      acc.push(curWord);
      return acc;
    }, []);

    const flattenArr = quizList.map(arr => arr.flat());
    setQuizzes(flattenArr);

  }, [QuizState, VocabState])

  return (
    <div className="mx-2">
      <div className="py-4 text-center">
        <h2 className="text-4xl font-semibold tracking-wide text-gray-800">Create your own quizzes</h2>
        <p className="text-gray-700 tracking-wide max-w-sm mx-auto">Select words from your word list that you want to practice. Make a quiz with only those words to solidify your knowledge.</p>
        <Link to="/quizzes/quiz-maker" className="uppercase font-semibold text-white bg-gray-800 py-2 px-8 rounded-md mt-4 inline-block">Make a quiz</Link>
      </div>


      {/* Quizzes */}
      <div className="grid gap-2 lg:grid-cols-3 md:grid-cols-2 mx-2">
        {quizzes && quizzes.map((quiz, index) => (
          <div className=" p-8 rounded-md shadow-md inline-block">
            <h2 className="text-2xl font-semibold tracking-wide pb-3">Quiz {++index}</h2>
            <div className="flex flex-row  flex-wrap justify-start items-between content-between">
              {quiz.map(word => <p className="bg-gray-800 text-white tracking-wide text-sm rounded-md inline-block py-1 px-3 m-1" key={word.id}>{word.word.toLowerCase()}</p>)}
            </div>
          </div>
        ))}
      </div>
    </div >
  )
}

export default Quizzes;
