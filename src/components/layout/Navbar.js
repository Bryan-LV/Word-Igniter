import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar({ isAuth, logout }) {
  const [mobileNav, showMobileNav] = useState(false);

  return (
    <header className="flex flex-row items-center justify-between py-6 mx-2 relative z-10 bg-gray-100">
      <div className="flex flex-row items-center justify-center">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path></svg>
        <h1 className="text-4xl text-gray-800 tracking-wide font-semibold text-center md:text-left ">Word Igniter</h1>
      </div>
      {/* Show routes only if user is authenticated */}
      {isAuth ?
        <>
          {/* Mobile Nav */}
          <nav className="md:hidden" onClick={() => showMobileNav(ps => !ps)}>
            <svg className="w-8 h-8 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </nav>
          {mobileNav ?
            <div className="md:hidden fixed top-0 left-0 right-0 bottom-0 bg-gray-800 py-8" onClick={() => showMobileNav(false)}>
              <div className="flex justify-end px-8" onClick={() => showMobileNav(false)}>
                <svg className="w-10 h-10" fill="none" stroke="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
              <div className="flex flex-col justify-center items-center text-white">
                <Link to="/" className="px-2 cursor-pointer block text-3xl font-semibold">Home</Link>
                <Link to="/quizzes" className="px-2 cursor-pointer block text-3xl font-semibold my-4">Quizzes</Link>
                <div onClick={() => logout()} className="cursor-pointer pl-4 fixed bottom-0 mb-10 flex flex-row items-center justify-center">
                  <p className="text-2xl pr-2">Signout</p>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                </div>
              </div>
            </div>
            :
            null}
          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-row items-center justify-around pr-2">
            <Link to="/" className="px-2 cursor-pointer block">Home</Link>
            <Link to="/quizzes" className="px-2 cursor-pointer block">Quizzes</Link>
            <div onClick={() => logout()} className="cursor-pointer pl-4"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg></div>
          </nav>
        </>
        :
        <div className=""></div>
      }
    </header >
  )
}

export default Navbar