import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import authService from "./appwrite/auth"
import { login, logout } from './store/authSlice'

import { Footer, Header } from './components'

import './App.css'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    authService.userAuthenticated()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      })
      .catch((e) => console.error(e), dispatch(logout()))
      .finally(() => setLoading(false))
  }, [])

  return loading ?
    (<h3>Loading...</h3>) :
    (
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400 '>
        <div className='w-full block'>
          <Header />
          <main>
            {/* <Outlet /> */}
          </main>
          <Footer />
        </div>
      </div>
    )
}

export default App
