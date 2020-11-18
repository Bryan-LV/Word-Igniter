import { useState } from 'react';

function useFormValidation() {
  const [errors, setErrors] = useState([]);

  const setError = (message) => setErrors(prevState => [...prevState, message]);
  const clearError = () => setErrors(prevState => {
    const copy = [...prevState];
    copy.shift()
    return copy;
  })
  return [errors, setError, clearError]
}

export default useFormValidation;