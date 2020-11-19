import { useState, useEffect } from 'react'
import ErrorBoundary from '../layout/ErrorBoundary';
import WordItem from './WordItem';

function WordSearch({ words }) {
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

  const handleSearch = (e) => setSearchWord(e.target.value);

  if (!words) {
    return null;
  }

  return (
    <div>
      <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
        <h3 className="text-lg leading-6 font-medium text-gray-800" id="modal-headline">Find a word from your list</h3>
        <div className="mt-2">
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
              <WordItem word={word.word} def={word.def} id={word.id} key={word.id} />
            </ErrorBoundary>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WordSearch
