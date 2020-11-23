import React, { useRef, useState } from 'react';
import { firestore } from '../../firebase';

function WordItem({ id, word, def, setDeleteWordModal, setDeleteWordID }) {
  const [editWord, setEditWord] = useState(false);
  const [wordForm, setWordForm] = useState({ word: titleCase(word), def });

  function handleFormChange(e) {
    setWordForm(prevState => ({ ...prevState, [e.target.id]: e.target.value }));
  }

  function titleCase(word) {
    let restOfWord = word.slice(1);
    let firstLetter = word.substr(0, 1);
    firstLetter = firstLetter.toUpperCase();
    let merge = firstLetter + restOfWord;
    return merge;
  }

  function deleteWord() {
    // Open confirmation modal
    setDeleteWordModal(true);
    // Send ID to callback
    setDeleteWordID(id)

  }

  function switchToEditMode() {
    setEditWord(prevState => !prevState);
  }

  function saveEditChanges() {
    const updateWordObject = {}
    // Check if word or def is the same
    if (wordForm.word !== titleCase(word) && wordForm.word) {
      updateWordObject.word = wordForm.word;
    }
    if (wordForm.def !== def && wordForm.def) {
      updateWordObject.def = wordForm.def;
    }
    console.log(updateWordObject);
    // Only update what has changed
    firestore.collection('vocabulary').doc(id).update(updateWordObject).then(() => {
      switchToEditMode()
    }).catch(err => {
      // TODO: Handle error of word update
    });

  }

  return (
    <div className="px-2 py-4 max-w-md mx-auto mt-2 bg-white rounded-sm">
      {/* If editing word show input, else show h2 */}
      {editWord ?
        <input type="text"
          id="word"
          value={wordForm.word}
          onChange={handleFormChange}
          className="w-full rounded-md mb-3 p-2 border" />
        :
        <h2 className="text-lg tracking-wide font-semibold">{titleCase(word)}</h2>}

      {/* If editing word show textarea, else show paragraph tag */}
      {editWord ?
        <input type="text"
          id="def"
          value={wordForm.def}
          onChange={handleFormChange}
          className="w-full rounded-md mb-3 p-2 border" />
        :
        <p className="text-gray-600 tracking-wide py-1">{def}</p>}

      {/* If edit word show save update button, else show container div */}
      {editWord ?
        <div className="flex flex-row justify-end items-center">
          <button className="px-8 py-2 bg-green-500 text-white font-semibold tracking-wide cursor-pointer rounded-md mr-3" onClick={saveEditChanges}>Save edit</button>
          <button className="px-8 py-2 bg-gray-700 text-white font-semibold tracking-wide cursor-pointer rounded-md" onClick={switchToEditMode}>Cancel</button>
        </div>
        :
        <div className="flex flex-row justify-end items-center">
          <p className="mr-3 cursor-pointer" onClick={switchToEditMode} >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
          </p>
          <p className="cursor-pointer" onClick={deleteWord}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </p>
        </div>
      }
    </div>
  )
}

export default React.memo(WordItem)
