import { useEffect } from "react"
import { useHistory } from "react-router-dom";

function Redirector({ path, isAuth }) {
  const history = useHistory()
  useEffect(() => {
    // If user is not authenticated wait 2 seconds
    // Then push user to login page
    // Incase of slow connection, so there is no quick render of login then back to private route
    if (!isAuth) {
      setTimeout(() => {
        history.push(path)
      }, 2000);
    }
  }, [isAuth, history, path])
  return null
}

export default Redirector
