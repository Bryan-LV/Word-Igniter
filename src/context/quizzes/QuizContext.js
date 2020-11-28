import { createContext, useEffect, useContext, useState } from 'react'
import { firestore } from '../../firebase';
import AuthContext from '../auth/AuthContextProvider';

const QuizContext = createContext();

function QuizContextProvider({ children }) {
  // Quiz State Model: [ { QuizID: String, QuizWordIDs: String[],  UserID: String} ]
  const [QuizState, setQuizState] = useState([]);
  const { AuthState } = useContext(AuthContext);

  useEffect(() => {
    if (AuthState.user) {
      const subscribe = firestore
        .collection('quizzes')
        .where('UserID', '==', AuthState.user.id)
        .onSnapshot(snapshot => {
          const documents = snapshot.docs.map(doc => ({ QuizID: doc.id, ...doc.data() }));
          setQuizState(documents);
        })

      return subscribe
    }
  }, [AuthState.user])

  return (
    <QuizContext.Provider value={{ QuizState }}>
      {children}
    </QuizContext.Provider>
  )
}

export { QuizContextProvider };
export default QuizContext;
