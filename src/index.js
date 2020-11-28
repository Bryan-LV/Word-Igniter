import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/auth/AuthContextProvider';
import { QuizContextProvider } from './context/quizzes/QuizContext';
import { VocabContextProvider } from './context/vocab/VocabContext';
import reportWebVitals from './reportWebVitals';
import './styles/tailwind-output.css'

ReactDOM.render(
  <AuthProvider>
    <VocabContextProvider>
      <QuizContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </QuizContextProvider>
    </VocabContextProvider>
  </AuthProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
