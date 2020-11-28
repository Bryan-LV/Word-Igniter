import { useState, useContext } from 'react';
import AddWord from './AddWord'
import WordList from './WordList'
import WordSearch from './WordSearch';
import Modal from '../../hoc/Modal';
import useAuth from '../../hooks/useAuth'
import DeleteWord from '../units/DeleteWord';
import VocabContext from '../../context/vocab/VocabContext';
import WordItem from './WordItem';

function Dashboard() {
  // Re-routes if user is not logged in.
  useAuth()
  const { VocabState } = useContext(VocabContext);
  const vocab = VocabState.words;

  // Modal States
  const [deleteWordModal, setDeleteWordModal] = useState(false);
  const [wordSearchModal, setWordSearchModal] = useState(false);
  const [deleteWordID, setDeleteWordID] = useState(null);

  return (
    <div className="">
      <Modal modalState={wordSearchModal} setModalState={setWordSearchModal} fallback={null} id="WordSearch" >
        <WordSearch words={vocab} setModalState={setWordSearchModal} render={word => (
          <WordItem word={word.word} def={word.def} id={word.id} key={word.id} />
        )} />
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
