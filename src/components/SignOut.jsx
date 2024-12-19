import { signOut } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../firebase'

function SignOut() {

    const navigate = useNavigate

    const handleSignOut = async () => {
        await signOut(auth)
        navigate('/')
    }
  return (
    <div>
        <button onClick={handleSignOut}>Sign Out</button>      
    </div>
  )
}

export default SignOut
