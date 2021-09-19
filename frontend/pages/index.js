import Head from 'next/head'
import { useState } from 'react'
import Ureg from './userRegistration'
import Breg from './bookRegistration'

export default function Home() {
  const [UmodalOpen,setModalOpen] = useState(false)
  const [bookModalOpen,setBookModal] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {UmodalOpen && <Ureg closeModal={setModalOpen} />}
        {bookModalOpen && <Breg closeModal={setBookModal} />}

      <Head>
        <title>Library</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to Library
        </h1>

        <p className="mt-3 text-2xl">
         
        </p>
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <div className="p-6 mt-6 text-center border-4 border-blue-200 w-96 rounded-xl hover:text-blue-600 cursor-pointer focus:text-blue-600 hover:border-green-400 hover:scale-125 transition duration-500" onClick={()=>setModalOpen(!UmodalOpen)}>
            <h3 className="text-2xl font-bold text-green-500">USER REGISTRATION &rarr;</h3>
            <p className="mt-4 text-xl">
              Register new user.
            </p>
          </div>
          
          <a href="/issueBook" className="p-6 mt-6 text-center border-4 border-blue-200 w-96 rounded-xl hover:text-blue-600 cursor-pointer focus:text-blue-600 hover:border-green-400 hover:scale-125 transition duration-500">
            <h3 className="text-2xl font-bold text-green-500">BOOK ISSUE &rarr;</h3>
            <p className="mt-4 text-xl">
              Issue book for user.
            </p>
          </a>

          <div className="p-6 mt-6 text-center border-4 border-blue-200 w-96 rounded-xl hover:text-blue-600 cursor-pointer  focus:text-blue-600 hover:border-green-400 hover:scale-125 transition duration-500" onClick={()=>setBookModal(true)}> 
            <h3 className="text-2xl font-bold text-green-500">BOOK REGISTRATION &rarr;</h3>
            <p className="mt-4 text-xl">
              Register new books in Library.
            </p>
          </div>

          <a href="/viewBook" className="p-6 mt-6 text-center border-4 border-blue-200 w-96 rounded-xl hover:text-blue-600 cursor-pointer focus:text-blue-600 hover:border-green-400 hover:scale-125 transition duration-500">
            <h3 className="text-2xl font-bold text-green-500">VIEW BOOK &rarr;</h3>
            <p className="mt-4 text-xl">
              View all the book in Library.
            </p>
          </a>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        Created by Ajay Krishnan
      </footer>
    </div>
  )
}
