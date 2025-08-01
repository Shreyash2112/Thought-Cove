import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import authService from "./appwrite/auth"
import { login, logout } from './store/authSlice'

import { Footer, Header, Logo } from './components'

import './App.css'
import { Outlet } from 'react-router-dom'

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
  }, [dispatch])

  return (
    <div>
      {
        loading ?
          (<h1 className='min-h-svh flex items-center justify-center bg-background '><Logo width={300}/></h1>) :
          (
            <div className='min-h-svh flex flex-wrap content-between bg-background'>
              <div className='min-h-svh flex flex-col w-full '>
                <Header />
                <main className='flex-grow mt-16'>
                  <Outlet />
                </main>
                <Footer />
              </div>
            </div>
          )
      }
    </div>
  )
}

export default App
