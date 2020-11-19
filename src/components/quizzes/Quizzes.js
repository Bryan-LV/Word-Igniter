import { useState } from 'react'
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';

function Quizzes() {
  // Re-routes if user is not logged in.
  useAuth();
  return (
    <div>

      <div className="py-4 text-center">
        <motion.h2 animate={{ x: 100 }}
          transition={{ ease: "easeOut", duration: 2 }} className="text-4xl font-semibold tracking-wide text-gray-800">Create your own quizzes</motion.h2>
        <p className="text-gray-700 tracking-wide max-w-sm mx-auto">Select words from your word list that you want to practice. Make a quiz with only those words to solidify your knowledge.</p>
      </div>

    </div>
  )
}

export default Quizzes;
