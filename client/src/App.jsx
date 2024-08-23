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
  })

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
  ) : null
}

export default App
