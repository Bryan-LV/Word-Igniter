import React from 'react';
import WordItem from './WordItem';
import { motion } from 'framer-motion';
import ErrorBoundary from '../layout/ErrorBoundary';

function WordList({ list, setWordSearchModal, setDeleteWordModal, setDeleteWordID }) {

  // Opens modal to search for a word
  const searchWord = () => {
    setWordSearchModal(true);
  }

  return (
    <motion.div
      initial={{ y: '100vh', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      className="px-2 my-6">
      <div className="flex flex-row items-center justify-between  max-w-md mx-auto">
        <h2 className="text-sm font-light tracking-wide pb-2">Your Word List</h2>
        <svg onClick={searchWord} className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"></path></svg>
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-3">
        {list?.length > 0 && list.map(word => {
          return (
            <ErrorBoundary prompt="Uh oh, looks like we couldn't retrieve this word..." key={word.id}>
              <WordItem word={word.word} def={word.def} id={word.id} setDeleteWordModal={setDeleteWordModal} setDeleteWordID={setDeleteWordID} />
            </ErrorBoundary>
          )
        })}
      </div>
    </motion.div>
  )
}

export default React.memo(WordList)
