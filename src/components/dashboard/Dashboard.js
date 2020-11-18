import { useState, useCallback } from 'react';
import WordSearchModal from './WordSearchModal';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase';
import { auth } from '../../firebase';

import AddWord from './AddWord'
import WordList from './WordList'

// database
const initList = [
  {
    word: 'congenial',
    def: 'To like someone because their vibe is similar',
    id: 1,
    editWord: false
  },
  {
    word: 'ambivalent',
    def: 'having mixed feelings or contradictory ideas about something or someone.',
    id: 2,
    editWord: false
  },
  {
    word: 'disparate',
    def: 'things being to different to compare',
    id: 3,
    editWord: false
  },
  {
    word: 'salient',
    def: 'most noticeable or important',
    id: 4,
    editWord: false
  }
]

function Dashboard() {
  const [wordList, setWordList] = useState(initList);
  const [toggle, setToggle] = useState(false);
  const [vocab, loading, error] = useCollectionData(firestore.collection('vocabulary'), { idField: 'id' })
  console.log(vocab);

  const handleEdit = (id) => {
    const updatedList = wordList.map(word => {
      if (word.id === id) {
        word.editWord = word.editWord === true ? false : true;
      }
      return word
    })
    setWordList(updatedList)
  }

  const handleDelete = useCallback((id) => {
    function deleteWord(id) {
      setWordList(prevState => {
        const updatedList = prevState.filter(word => word.id !== id);
        return updatedList;
      })
    }
    deleteWord(id)
  }, [])

  return (
    <div className="">
      {toggle && <WordSearchModal words={wordList} setToggle={setToggle} handleDelete={handleDelete} handleEdit={handleEdit} />}
      <AddWord addWord={setWordList} />
      <WordList list={wordList} handleDelete={handleDelete} setToggle={setToggle} handleEdit={handleEdit} />
      <button onClick={() => auth.signOut()}>Logout</button>
    </div>
  )
}

export default Dashboard;
