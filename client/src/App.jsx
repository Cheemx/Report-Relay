import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
        axios.get('/api')
        .then((res) => {
        console.log("Client and Server connected!!!");
        })
        .catch((error) => {
        console.log(error);
        })
        .finally(()=> setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-neutral-800'>
        <header className='w-full rounded-xl'>
            <Header />
        </header>

        <main className='flex-grow p-8'>
            <Outlet />
        </main>

        <footer className='w-full'>
            <Footer />
        </footer>
    </div>
  ) : (
    <div className='flex justify-center items-center min-h-screen bg-black'>
        <div className='w-16 h-16 border-8 border-t-cyan-700 border-gray-300 rounded-full animate-spin'></div>
        <p className='ml-4 text-cyan-500'>Loading...</p>
    </div>
  )
}

export default App
