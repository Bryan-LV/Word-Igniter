import React from 'react';
import WordItem from './WordItem';
import ErrorBoundary from './ErrorBoundary';

function WordList({ list, handleDelete }) {
  return (
    <div className="px-2 my-6">
      <h2 className="text-sm font-light tracking-wide max-w-md mx-auto pb-2">Your Word List</h2>
      {list.length > 0 && list.map(word => {
        return (
          <ErrorBoundary>
            <WordItem word={word.word} def={word.def} id={word.id} key={word.id} handleDelete={handleDelete} />
          </ErrorBoundary>
        )
      })}
    </div>
  )
}

export default React.memo(WordList)
