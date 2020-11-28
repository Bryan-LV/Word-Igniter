import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/auth/AuthContextProvider';
import VocabContext from '../../context/vocab/VocabContext'
import { firestore } from '../../firebase';
import WordSearch from '../dashboard/WordSearch';
import QuizWord from './QuizWord';

function QuizMaker() {
  const { VocabState } = useContext(VocabContext);
  const { AuthState } = useContext(AuthContext);
  const [words, setWords] = useState([]);
  const [quizWords, setQuizWords] = useState([]);

  useEffect(() => {
    setWords(VocabState.words)
  }, [VocabState.words])

  function addWordToQuizList(word) {
    // Add word to quiz words state
    setQuizWords(ps => [...ps, word]);
    // Hide word from selection
    const filterWordsArr = words.filter(Word => Word.id !== word.id);
    setWords(filterWordsArr);
  }

  function removeFromQuizList(word) {
    // Remove from quiz words state
    const filterWordsArr = quizWords.filter(Word => Word.id !== word.id);
    setQuizWords(filterWordsArr);
    // Add back to words state
    setWords([...words, word]);
  }

  function createQuizHandler() {
    // Quiz should contain at least 3 words
    if (quizWords.length < 3) {
      // TODO: Show user a message
      console.log('Quiz should contain at least 3 words');
      return;
    }

    // Transform quiz words array to pass to firestore
    const accumulator = {
      QuizWordIDs: [],
      UserID: AuthState.user.id
    }

    const fireStorePayload = quizWords.reduce((acc, currentWord) => {
      acc.QuizWordIDs.push(currentWord.id);
      return acc
    }, accumulator)

    // Add quiz to firestore
    firestore.collection('quizzes').add(fireStorePayload).then(() => {
      console.log('Quiz was successfully saved');
    }).catch(err => {
      console.error(err);
      console.log('Quiz could not be saved');
    })

  }

  return (
    <div>
      <div className="py-4 text-center">
        <h2 className="text-4xl font-semibold tracking-wide text-gray-800">Select your study words</h2>
        <p className="text-gray-700 tracking-wide max-w-sm mx-auto pb-4">It's best to keep your quiz list to a minimum of around 6 - 12 words for best retention. You don't want to overwhelm yourself!</p>
      </div>
      <div className="md:grid md:gap-2 md:grid-cols-3">

        {/* Select Words */}
        <div className="text-center rounded-md md:col-span-2 bg-white p-4 shadow-md">
          <div className="mb-4 max-w-sm mx-auto">
            <WordSearch words={words} render={word => (
              <QuizWord clickHandler={addWordToQuizList} word={word} key={word.id} />
            )} />
          </div>

          {words.map(word => (
            <div key={word.id} className="max-w-sm mx-auto pl-3">
              <QuizWord clickHandler={addWordToQuizList} word={word} />
            </div>
          ))}
        </div>

        {/* Selected Quiz Words */}
        <div className="bg-white p-4 fixed bottom-0 w-full md:relative shadow-md">
          <h2 className="font-semibold tracking-wide text-2xl">Quiz List: {quizWords.length}</h2>
          <div className="hidden md:block">
            {quizWords.map(word =>
              <QuizWord clickHandler={removeFromQuizList} word={word} key={word.id} />
            )}
          </div>

        </div>
        <button onClick={createQuizHandler} className=" fixed bottom-0 right-0 m-4 font-semibold tracking-wide py-3 px-4 text-white bg-gray-800 rounded-md shadow-md">Create Quiz</button>
      </div>
    </div>
  )
}

export default QuizMaker
