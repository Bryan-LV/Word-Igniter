import { Suspense, lazy, useState, useCallback } from 'react';
const AddWord = lazy(() => import('./components/AddWord'));
const WordList = lazy(() => import('./components/WordList'));

// database
const initList = [
  {
    word: 'congenial',
    def: 'To like someone because their vibe is similar',
    id: 1
  },
  {
    def: 'asdf',
    id: 2
  }
]

function App() {
  const [wordList, setWordList] = useState(initList);

  const deleteWord = (id) => {
    setWordList(prevState => {
      const updatedList = prevState.filter(word => word.id !== id);
      return updatedList;
    })
  }

  const handleDelete = useCallback((id) => {
    deleteWord(id)
  }, [])

  return (
    <div className="">
      <h1 className="text-2xl tracking-wide font-semibold py-2 px-6 text-center md:text-left ">Vocab Reminder</h1>
      <Suspense fallback={<h1>Loading</h1>}>
        <AddWord addWord={setWordList} />
      </Suspense>
      <Suspense fallback={<h1>Loading</h1>}>
        <WordList list={wordList} handleDelete={handleDelete} />
      </Suspense>
    </div>
  );
}

export default App;
