import React, { useContext, useState } from 'react';
import AuthContext from '../../context/auth/AuthContextProvider';
import { firestore } from '../../firebase';

function AddWord({ addWord }) {
  const { AuthState } = useContext(AuthContext);
  const [word, setWord] = useState({ word: '', def: '', userID: AuthState.user.id });

  const handleTextInput = (evt) => {
    setWord(prevState => ({ ...prevState, [evt.target.id]: evt.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (word.word !== '' && word.def !== '') {
      // push word to app
      addWord(prevState => [...prevState, word])
      // add word to firestore
      try {
        await firestore.collection('vocabulary').add(word);
      } catch (error) {
        console.log(error);
      }
      setWord(ps => ({ ...ps, word: '', def: '' }));
    }
  }

  return (
    <form className="max-w-md mx-auto py-4 px-2 bg-white rounded-md shadow-md" onSubmit={handleSubmit}>
      <h3 className="text-sm text-gray-700 pb-4 font-semibold tracking-wide text-center">Add a new word to your vocabulary list</h3>
      <div className="">
        <input type="text"
          placeholder="Enter a word"
          value={word.word}
          id="word"
          onChange={handleTextInput}
          className="w-full rounded-md mb-3 p-2 border" />
      </div>
      <div className="">
        <textarea type="text"
          placeholder="Put your definition"
          value={word.def}
          id="def"
          onChange={handleTextInput}
          className="w-full rounded-md p-2 border" ></textarea>
      </div>
      <button className="bg-gray-800 text-white tracking-wide font-semibold px-8 py-2 mt-2 rounded-md">Add Word</button>
    </form>
  )
}

export default React.memo(AddWord)
