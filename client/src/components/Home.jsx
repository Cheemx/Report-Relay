import React from 'react'
import Container from './Container'

function Home (){
  return (
    <div className='min-h-screen bg-neutral-800 max-w-full py-8 mt-4 text-center flex flex-col items-center justify-center p-4'>
            <h1 className='text-4xl font-bold text-white mb-6'>
                Welcome to Report-Relay!
            </h1>
            <p className='text-gray-300 font-normal text-xl text-left justify-start'>
                Report-Relay is a platform designed to streamline the generation and distribution of student performance reports. Below is a brief description of how the project was built and how it works.
            </p>

            <div className='text-left max-w-2xl mb-8'>
                <h2 className='text-2xl font-bold text-cyan-300 mb-4'>Project Overview</h2>
                <ul className='list-disc text-gray-300 pl-5'>
                    <li>
                        <span className='font-semibold'>Backend:</span> express.js is used to build a robust and flexible HTTP server with JavaScript powering both backend and frontend code.
                    </li>
                    <li>
                        <span className='font-semibold'>Frontend:</span> Built using ReactJS with Tailwind CSS for responsive and classy design.
                    </li>
                    <li>
                        <span className='font-semibold'>Database:</span> MongoDB is utilized to securely store user data and student performance records.
                    </li>
                </ul>

                <h2 className='text-2xl font-bold text-cyan-300 mb-4'>How it Works</h2>
                <ul className='list-disc text-gray-300 pl-5'>
                    <li>
                        <span className='font-semibold'>Performance Route:</span> Allows creation of student performance reports for a particular semester.
                    </li>
                    <li>
                        <span className='font-semibold'>Send Route:</span> Sends the created report to the student's parent via email. Ensure the email entered during performance creation matches the one used to send the report.
                    </li>
                    <h2 className='text-xl font-bold text-white mb-2'>
                    Get in Touch:
                    </h2>
                    <li>
                        <span className='font-semibold'>GitHub Repository:</span>
                        <br />
                        <a 
                            href="https://github.com/Cheemx/Report-Relay" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className='text-cyan-400 hover:underline'>
                            View the project on GitHub
                        </a>
                        <br />
                        <p>Give it a star ⭐ if you like it!</p>
                    </li>
                    <li className='mt-4'>
                        <span className='font-semibold'>Feedback:</span> If you have suggestions or issues, feel free to send feedback to:
                        <br />
                        <a 
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=chinmaymahajan999@gmail.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className='text-cyan-400 hover:underline'>
                            chinmaymahajan999@gmail.com
                        </a>
                    </li>
                </ul>

                <div className='bg-neutral-600 p-4 rounded-lg shadow-lg max-w-md'>
                <h2 className='text-xl font-bold text-white mb-2'>
                    <span className='font-semibold'>Test Account:</span>
                </h2>
                <ul className='text-gray-300'>
                <li>
                        <span className='font-semibold'> You can explore the project using the following test account:</span>
                        <br />
                        <span className='font-semibold'>Email:</span> one@gmail.com 
                        <br />
                        <span className='font-semibold'>Password:</span> one@123
                    </li>
                </ul>
            </div>
            </div>

                  
        </div>
  )
}

export default Home