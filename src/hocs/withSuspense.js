import React, { Suspense } from 'react'

function withSuspense(OriginalComponent) {
  function AddSuspense(props) {
    return (
      <Suspense fallback={<h2>Loading...</h2>}>
        <OriginalComponent  {...props} />
      </Suspense>
    )
  }

  return AddSuspense
}

export default withSuspense
