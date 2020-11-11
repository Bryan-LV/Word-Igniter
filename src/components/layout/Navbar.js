import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="flex flex-row items-center justify-between py-6 mx-2">
      <div className="flex flex-row items-center justify-center">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path></svg>
        <h1 className="text-4xl text-gray-800 tracking-wide font-semibold text-center md:text-left ">Word Igniter</h1>
      </div>
      <nav className="md:hidden">
        <svg className="w-8 h-8 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
      </nav>
      <nav className="hidden md:flex flex-row items-center justify-around pr-2">
        <Link to="/" className="px-2 cursor-pointer block">Home</Link>
        <Link to="/quizzes" className="px-2 cursor-pointer block">Quizzes</Link>
        <div className="cursor-pointer pl-4"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg></div>
      </nav>
    </header>
  )
}

export default Navbar
