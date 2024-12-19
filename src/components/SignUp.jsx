import React, { useState } from 'react'
import { Link } from 'react-router'
import { auth } from '../firebase'
import { useNavigate } from 'react-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSignIn = async () => {
    try {

      await createUserWithEmailAndPassword(auth, email, password)
      navigate('/')
      
    } catch (error) {
      setError(`Error: ${error}`)
      
    }
  }

  return (
      <div>
      <h1>Sign Up Page</h1>
      <input type="Email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
      <input type="Password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignIn}>Sign Up</button>
      {error && <p>{error}</p>}

      <p>Already have an account? <Link to="/signin">Sign In</Link></p>
      
    </div>
    
  )
}

export default SignUp
