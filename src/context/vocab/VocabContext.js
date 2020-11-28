import { createContext, useEffect, useContext, useReducer } from 'react'
import VocabReducer from './VocabReducer';
import VocabState from './VocabState';
import VocabTypes from './VocabTypes';
import { firestore } from '../../firebase';
import AuthContext from '../auth/AuthContextProvider';

const VocabContext = createContext();

function VocabContextProvider({ children }) {
  const [state, dispatch] = useReducer(VocabReducer, VocabState);
  const { AuthState } = useContext(AuthContext);

  useEffect(() => {
    if (AuthState.user) {
      const unsubscribe = firestore
        .collection('vocabulary')
        .where('userID', '==', AuthState.user.id)
        .onSnapshot(snapshot => {
          const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          dispatch({ type: VocabTypes.SET_WORDS, payload: documents });
        })

      return unsubscribe
    }

  }, [AuthState.user])

  return (
    <VocabContext.Provider value={{ VocabState: state }}>
      {children}
    </VocabContext.Provider>
  )
}

export { VocabContextProvider }
export default VocabContext
