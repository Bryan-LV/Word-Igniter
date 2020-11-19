import React, { useState, useContext } from 'react'
import { motion } from 'framer-motion';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContextProvider';
import { auth } from '../../firebase'
import useFormValidation from '../../hooks/useFormValidation'

function Login() {
  const [userCred, setUserCred] = useState({ email: '', password: '' });
  // show or mask password input text
  const [passwordType, setPasswordType] = useState('password');
  const [errors, setError, clearError] = useFormValidation();
  const { AuthActions } = useContext(AuthContext);
  const history = useHistory();

  const handleTextChange = (e) => setUserCred(prevState => ({ ...prevState, [e.target.id]: e.target.value }))

  // show or mask password input
  const handlePasswordType = () => passwordType === 'password' ? setPasswordType('text') : setPasswordType('password');

  // toggle password icons
  const switchEyeIcon = () => {
    if (passwordType === 'password') {
      return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
    } else {
      return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if user already has error don't show another
    if (errors.length > 0) {
      return;
    }
    // User must fill in both inputs
    if (userCred.email === '' || userCred.password === '') {
      setError('Both fields must be filled out to sign in.')
      setTimeout(clearError, 2000);
      return;
    }

    try {
      // Sign in user
      const login = await auth.signInWithEmailAndPassword(userCred.email, userCred.password);
      // Add user to context
      AuthActions.login({ email: login.user.email, displayName: login.user.displayName, id: login.user.uid });
      // Send user to Dashboard
      history.push('/');
    } catch (error) {
      setError('Uh oh, looks like your credentials were wrong, please try again');
      setTimeout(clearError, 3000);
    }
  }


  return (
    <div className="px-4">
      <motion.div
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ delay: 0.5, type: "spring", bounce: 0.15 }}
        className="py-4 text-center">
        <h2 className="text-4xl font-semibold tracking-wide text-gray-800">Expand your vocabulary</h2>
        <p className="text-sm text-gray-700 tracking-wide max-w-sm mx-auto">Create your own word list to study. Make your own quizzes, and get notifications of new words frequently so you never forget again.</p>
      </motion.div>

      <motion.div
        initial={{ x: '100vw' }}
        animate={{ x: 0 }}
        transition={{ delay: 0.5, type: "spring", bounce: 0.15 }}
        className="">
        <form onSubmit={handleSubmit} className="bg-white py-5 rounded-md max-w-sm mx-auto shadow-md">
          {errors?.length > 0 && errors.map((err, i) => <p key={i} className="text-sm text-red-500 px-3 my-2">{err}</p>)}
          <div className="mx-4">

            <input
              type="text"
              id="email"
              placeholder="Email"
              aria-placeholder="email"
              value={userCred.email}
              onChange={handleTextChange}
              className=" border rounded-sm px-3 py-2 text-gray-800 w-full" />
            <div className="flex flex-row justify-center items-center">
              <input
                type={passwordType}
                id="password"
                placeholder="Password"
                aria-placeholder="password"
                value={userCred.password}
                onChange={handleTextChange}
                className=" border rounded-sm px-3 py-2 my-4 text-gray-800 w-full" />
              <div className="pl-3" onClick={handlePasswordType}>{switchEyeIcon()}</div>
            </div>
            <button className="bg-gray-800 text-white tracking-wide py-2 max-w-sm w-full mx-auto rounded-md cursor-pointer font-semibold">Login</button>
            <p className="py-3 text-center text-sm tracking-wide text-gray-700 font-semibold">Forgotten password?</p>
            <div className="w-full border border-gray-300"></div>
            <div className="text-center">
              <Link to="/register" className=" bg-green-500 block mx-auto text-white tracking-wide py-2 max-w-sm w-1/2 mt-6 rounded-md cursor-pointer font-semibold">Create New Account</Link>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Login
