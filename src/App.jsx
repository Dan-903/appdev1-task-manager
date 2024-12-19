import { useEffect, useState } from 'react'
import './App.css'
import ListTodos from './components/listTodos'
import { BrowserRouter, Route, Routes } from 'react-router'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'


function App() {
  const [user, setUser] = useState('A')
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return unsubscribe
    
  }, []) 
  

  return (
    <>

    <BrowserRouter>
    <Routes>
      <Route path='/' element={user ? <ListTodos user={user }/> : <SignIn/>}/>
      <Route path='signin' element={<SignIn/>}/>
      <Route path='signup' element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
    
    

    </>
  )
}

export default App
