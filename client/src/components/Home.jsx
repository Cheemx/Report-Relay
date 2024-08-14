import React from 'react'
import Container from './Container'

function Home (){
  return (
    <>
    <div className='w-full py-8 mt-4 text-center'>
        <Container>
            <div className='flex flex-wrap p-2 w-full'>
                <h1 className='text-2xl font-bold hover:text-[#D3D3D3]'>
                    Jay Shree Ram
                </h1>
            </div>
        </Container>
    </div>
    </>
  )
}

export default Home