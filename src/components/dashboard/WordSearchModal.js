import { useState, useEffect } from 'react';
import WordItem from './WordItem';
import ErrorBoundary from '../layout/ErrorBoundary';
import { motion } from 'framer-motion';

function WordSearchModal({ words, setToggle, handleDelete, handleEdit }) {
  const [searchList, setSearchList] = useState([]);
  const [searchWord, setSearchWord] = useState('');


  useEffect(() => {
    if (searchWord) {
      const updateSearchList = words.filter(word => word.word.toLowerCase().trim().startsWith(searchWord.toLowerCase().trim()));
      setSearchList(updateSearchList);
      return
    }
    setSearchList([]);
  }, [searchWord, words])

  const handleSearch = (e) => {
    setSearchWord(e.target.value)
  }

  const handleToggle = () => {
    setToggle(false);
  }

  if (!words) {
    return null;
  }

  return (

    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Adds a background to emphasize the modal */}
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        {/* This is a trick to center the modal on browsers */}
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
          {/* The actual modal */}
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div class="bg-white px-4 py-5 sm:p-6 sm:pb-4">
            <div class="cursor-pointer">
              <div className="flex flex-row justify-end" onClick={handleToggle}>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-800" id="modal-headline">Find a word from your list</h3>
                <div class="mt-2">
                  <input
                    type="text"
                    id="searchword"
                    placeholder="Search word"
                    aria-placeholder="search word"
                    value={searchWord}
                    onChange={handleSearch}
                    className=" border rounded-sm px-3 py-2 text-gray-800 w-full max-w-md" />
                </div>
                <div className="">
                  {searchList.length > 0 && searchList.map(word => (
                    <ErrorBoundary prompt="Uh oh, looks like we couldn't retrieve this word...">
                      <WordItem word={word.word} def={word.def} id={word.id} key={word.id} handleDelete={handleDelete} handleEdit={handleEdit} />
                    </ErrorBoundary>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default WordSearchModal