import { useState } from 'react'
import './App.css'
import ListTodos from './components/listTodos'



function App() {
  const [user, setUser] = useState('Daniel L')
  

  return (
    <>
    
    {user ? (
      <ListTodos user={user}/>
    
    ) : (
      <h1>You must Log in</h1>
    )

    }

    </>
  )
}

export default App
