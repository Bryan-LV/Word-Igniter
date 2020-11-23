import React from 'react';
function Modal({ children, fallback, modalState, setModalState }) {

  if (!modalState) {
    // if modal is hidden, show fallback
    return fallback
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Adds a background to emphasize the modal */}
        <div className="fixed inset-0 transition-opacity" onClick={() => setModalState(false)}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        {/* This is a trick to center the modal on browsers */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
          {/* The actual modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div className="bg-white px-4 py-5 sm:p-6 sm:pb-4">
            {/* Close modal */}
            <div className="cursor-pointer" onClick={() => setModalState(false)}>
              <div className="flex flex-row justify-end">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </div>
            </div>
            {/* Wrapped component */}
            {children}
          </div>
        </div>
      </div>
    </div>
  )


}

export default React.memo(Modal)