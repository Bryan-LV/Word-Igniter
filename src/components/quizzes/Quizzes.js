import { useState } from 'react'
import WithAuth from '../../hoc/WithAuth'

function Quizzes() {
  return (
    <div>
      <div className="py-4 text-center">
        <h2 className="text-4xl font-semibold tracking-wide text-gray-800">Create your own quizzes</h2>
        <p className="text-gray-700 tracking-wide max-w-sm mx-auto">Select words from your word list that you want to practice. Make a quiz with only those words to solidify your knowledge.</p>
      </div>

    </div>
  )
}

export default WithAuth(Quizzes);
