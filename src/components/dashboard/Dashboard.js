import { useState, useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase';
import AddWord from './AddWord'
import WordList from './WordList'
import AuthContext from '../../context/auth/AuthContextProvider';
import WordSearch from './WordSearch';
import Modal from '../../hoc/Modal';
import useAuth from '../../hooks/useAuth'

function Dashboard() {
  // Re-routes if user is not logged in.
  useAuth()
  const { AuthState } = useContext(AuthContext);
  const [vocab] = useCollectionData(firestore.collection('vocabulary').where('userID', '==', AuthState.user.id), { idField: 'id' })
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Modal States
  const [deleteWordModal, setDeleteWordModal] = useState(false);
  const [wordSearchModal, setWordSearchModal] = useState(false);


  return (
    <div className="">
      <Modal modalState={wordSearchModal} setModalState={setWordSearchModal} fallback={null} id="WordSearch" >
        <WordSearch words={vocab} />
      </Modal>

      <Modal modalState={deleteWordModal} setModalState={setDeleteWordModal} fallback={null} id="DeleteConfirm">
        <div className="">
          <h3 className="">Are you sure you want to delete word?</h3>
          <div className="">
            <p className="px-8 py-2 bg-red-700 text-white font-semibold tracking-wide">No</p>
            <p className="px-8 py-2 bg-green-700 text-white font-semibold tracking-wide">Yes</p>
          </div>
        </div>
      </Modal>

      <AddWord />
      <WordList list={vocab} setWordSearchModal={setWordSearchModal} />
    </div>
  )
}

export default Dashboard;
