import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
        axios.get('https://report-relay.onrender.com/')
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
    <div className='flex justify-center items-center min-h-screen bg-neutral-800'>
        <div className='animate-spin w-16 h-16 border-t-4 rounded-full border-cyan-400 border-t-transparent'></div>
        <p className='ml-4 text-cyan-300'>Loading...</p>
    </div>
  )
}

export default App
