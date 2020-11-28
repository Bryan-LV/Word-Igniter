import React from 'react'
import titleCase from '../utils/titleCase'


function QuizWord({ word, clickHandler }) {
  return (
    <div key={word.id} className="bg-white p-4 mt-3 rounded-md shadow-md max-w-xs flex flex-row justify-between items-center">
      <h2 className="font-semibold tracking-wide">{titleCase(word.word)}</h2>
      <svg onClick={e => clickHandler(word)} className="w-8 h-8 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    </div>
  )
}

export default React.memo(QuizWord)
