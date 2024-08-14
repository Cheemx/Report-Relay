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
    <>
    <div className='min-h-screen w-full flex flex-wrap content-between bg-[#2E2E2E]'>
      <div className='w-full block'>
        <Header />
        <main className='h-lvh'>
          TODO: <Outlet />
        </main>
        <Footer />
      </div>
    </div>
    </>
  ) : null
}

export default App
