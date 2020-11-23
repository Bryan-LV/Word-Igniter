import { useState, useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase';
import AddWord from './AddWord'
import WordList from './WordList'
import AuthContext from '../../context/auth/AuthContextProvider';
import WordSearch from './WordSearch';
import Modal from '../../hoc/Modal';
import useAuth from '../../hooks/useAuth'
import DeleteWord from '../units/DeleteWord';

function Dashboard() {
  // Re-routes if user is not logged in.
  useAuth()
  const { AuthState } = useContext(AuthContext);
  const [vocab] = useCollectionData(firestore.collection('vocabulary').where('userID', '==', AuthState.user.id), { idField: 'id' })

  // Modal States
  const [deleteWordModal, setDeleteWordModal] = useState(false);
  const [wordSearchModal, setWordSearchModal] = useState(false);
  const [deleteWordID, setDeleteWordID] = useState(null);

  return (
    <div className="">
      <Modal modalState={wordSearchModal} setModalState={setWordSearchModal} fallback={null} id="WordSearch" >
        <WordSearch words={vocab} setModalState={setWordSearchModal} />
      </Modal>

      <Modal modalState={deleteWordModal} setModalState={setDeleteWordModal} fallback={null} id="DeleteConfirm">
        <DeleteWord id={deleteWordID} setModalState={setDeleteWordModal} />
      </Modal>

      <AddWord />
      <WordList list={vocab} setWordSearchModal={setWordSearchModal} setDeleteWordModal={setDeleteWordModal} setDeleteWordID={setDeleteWordID} />
    </div>
  )
}

export default Dashboard;
