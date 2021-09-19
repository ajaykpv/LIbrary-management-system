import Head from 'next/head'
import Link from 'next/link'
import { useEffect,useState } from 'react'
import {useRouter} from 'next/router'

const API="http://localhost:8000/api/book/all"
export default function viewBook() {
        const [books,setbooks] = useState([]);
        let count=0;
        useEffect(() => {
          const result = fetch(`${API}`, {
              method: "GET",
          })
              .then((res) => res.json())
              .then((data) => {
                  setbooks(data);
                  // console.log(data);
              })
              .catch((err) => console.log(err));
      }, []);
        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
            <title>Library</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="flex flex-col   w-full flex-1 px-20 text-center">
            <h3 className="text-6xl font-bold pb-20 leading-tight text-gray-800 font-serif" >BOOKS</h3>
            <div className="flex flex-row justify-between pb-10  items-center ">
                  <Link href='/'><button className="inline-flex px-5 py-1 text-md font-semibold uppercase leading-5 text-blue-800 bg-blue-100 rounded-lg hover:bg-blue-400 hover:text-white hover:scale-110 tracking-widest">Home</button></Link>
                  <Link href='/issueBook'><button className="inline-flex px-5 py-1 text-md font-semibold uppercase leading-5 text-blue-800 bg-blue-100 rounded-lg hover:bg-blue-400 hover:text-white hover:scale-110 tracking-widest">issue book</button></Link>

              </div>
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full">
                  <thead>
                      <tr>
                        <th className="px-6 text-base font-medium leading-4 tracking-wider  text-gray-500 uppercase border-b border-gray-200 bg-gray-50">ID</th>
                        <th className="px-6 text-base font-medium leading-4 tracking-wider  text-gray-500 uppercase border-b border-gray-200 bg-gray-50">BOOK</th>
                        <th className="px-6 text-base font-medium leading-4 tracking-wider  text-gray-500 uppercase border-b border-gray-200 bg-gray-50">AUTHOR</th>
                        <th className="px-6 text-base font-medium leading-4 tracking-wider  text-gray-500 uppercase border-b border-gray-200 bg-gray-50">ISSUE STATUS</th>
                      </tr>
                    </thead>
                  <tbody className="bg-white">  
                    {books && books.map((item) =>{
                     
                      return(
                        <tr>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                           <span className="text-lg leading-5 text-gray-500">{++count}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                           <span className="text-lg leading-5 text-gray-500">{item.Name}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <span className="text-lg leading-5 text-gray-500">{item.Author}</span>
                        </td>
                        {item.IssueStatus?(<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <span className="inline-flex px-2 text-xs font-semibold uppercase leading-5 text-red-800 bg-red-100 rounded-full">Issued</span>
                      </td>):(<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <span className="inline-flex px-2 text-xs font-semibold uppercase leading-5 text-green-800 bg-green-100 rounded-full">{item.issueStatus?"Issued":"Not Issued"}</span>
                        </td>)}
                        
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
            </div>
          </main>
          </div> 
        )
}