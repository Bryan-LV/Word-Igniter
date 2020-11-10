import React from 'react'

function WordItem({ id, word, def, handleDelete }) {
  const titleCase = (word) => {
    let restOfWord = word.slice(1);
    let firstLetter = word.substr(0, 1);
    firstLetter = firstLetter.toUpperCase();
    let merge = firstLetter + restOfWord;
    return merge;
  }

  return (
    <div className="px-2 py-4 max-w-md mx-auto bg-white rounded-sm">
      <h2 className="text-lg tracking-wide font-semibold">{titleCase(word)}</h2>
      <p className="text-gray-600 tracking-wide py-1">{def}</p>
      <div className="flex flex-row justify-end items-center">
        <p className="mr-3 cursor-pointer"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></p>
        <p className="cursor-pointer" onClick={() => handleDelete(id)}> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></p>
      </div>
    </div>
  )
}

export default WordItem
