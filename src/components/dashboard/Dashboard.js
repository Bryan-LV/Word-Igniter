import { useState, useCallback } from 'react'
import WithAuth from '../../hoc/WithAuth';

import AddWord from './AddWord'
import WordList from './WordList'

// database
const initList = [
  {
    word: 'congenial',
    def: 'To like someone because their vibe is similar',
    id: 1
  },
  {
    word: 'ambivalent',
    def: 'having mixed feelings or contradictory ideas about something or someone.',
    id: 2
  }
]

function Dashboard() {
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

  return (<>
    <AddWord addWord={setWordList} />
    <WordList list={wordList} handleDelete={handleDelete} />
  </>
  )
}

export default WithAuth(Dashboard);
