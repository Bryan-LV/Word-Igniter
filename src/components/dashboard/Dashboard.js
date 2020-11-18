import { useState, useCallback, useContext } from 'react';
import WordSearchModal from './WordSearchModal';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '../../firebase';

import AddWord from './AddWord'
import WordList from './WordList'
import AuthContext from '../../context/auth/AuthContextProvider';

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
  const { AuthState, AuthActions } = useContext(AuthContext);
  const [vocab, loading, error] = useCollectionData(firestore.collection('vocabulary').where('userID', '==', AuthState.user.id), { idField: 'id' })

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
      <AddWord />
      <WordList list={vocab} setToggle={setToggle} />
    </div>
  )
}

export default Dashboard;
