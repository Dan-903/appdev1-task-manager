import React, { useState } from 'react'
import { Link } from 'react-router'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router'
import { googleProvider, auth} from '../firebase'

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSignIn = async () => {
    try {

      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
      
    } catch (error) {
      setError(`Error: ${error}`)

      
    }

  

  }

  const handleSignInWithGmail = async () => {
    try {

      await signInWithPopup(auth, googleProvider)
      navigate('/')
      
    } catch (error) {
      setError(`Error: ${error}`)

      
    }
  }
  return (
    <div>
      <h1>Sign In Page</h1>
      <input type="Email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
      <input type="Password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignIn}>Sign In</button>

      <button onClick={handleSignInWithGmail}>Sign In with Email</button>
      {error && <p>{error}</p>}
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      
    </div>
  )
}


export default SignIn
