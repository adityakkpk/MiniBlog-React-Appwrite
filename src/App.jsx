import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import {Outlet} from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}));
      } else {
        dispatch(logout());
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between absolute top-0 z-[-2] h-fit w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
      <div className='w-full block'>
        <Header />
        <main className='min-h-[50vh]'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
