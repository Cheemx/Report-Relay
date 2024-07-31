import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  useEffect(() => {
    axios.get('/api')
    .then((res) => {
      console.log("Client and Server connected!!!");
    })
    .catch((error) => {
      console.log(error);
    })
  })

  return (
    <>

    </>
  )
}

export default App
