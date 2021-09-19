
import Link from 'next/link'
import { useEffect,useState } from 'react'
import {useRouter} from 'next/router'

const API="http://localhost:8000/api/book/register"
export default function bookRegistration({closeModal}) {

    const onSubmit = (event)=>{
        event.preventDefault();
        const name=document.getElementById("inline-book-name").value;
        const author = document.getElementById("inline-author").value;
        console.log(name,author)
        if(name && author){
            const data=JSON.stringify({
                name:name,
                author:author
            })
            console.log(data)
            fetch(API,{
                method:'POST',
                headers:{
                    'Content-type':'application/json;charset=utf-8'
                },
                body:data

            }).then(response=>{
                        if(response.status === 200){
                            document.getElementById("inline-book-name").value='';
                            document.getElementById("inline-author").value='';
                            console.log("registered successfully");
                        }
                        else{
                            
                            console.log("verification mail not sent");
                        }
                    })
            
                    .catch(err=>console.log(err));
        }
    }

        return (
            <div className="fixed  min-h-screen min-w-full  bg-gray-100 overflow-auto  bg-opacity-75 z-50 ">
            <div className="relative flex flex-col bg-white transition ease-in-out duration-500 scale-150 border-2 border-green-200   items-center w-full justify-center rounded-lg  mt-96 h-full max-w-lg m-auto  py-2  ">
                 <button type="button" className="bg-white rounded-full h-12 w-12 items-center r p-2 inline-flex  justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" onClick={()=>closeModal(false)}>
                    <span className="sr-only">Close menu</span>
                    
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </button>
              <div className="flex justify-center items-center pt-12">
                         
                    <form className="w-full max-w-lg">
                        <div className="md:flex md:items-center mb-6 ">
                            <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-book-name">
                                Book Name
                            </label>
                            </div>
                            <div className="md:w-2/3">
                            <input className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-book-name" type="text" placeholder="bookname" required/>
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 text-left" for="inline-author" >
                               Author
                            </label>
                            </div>
                            <div className="md:w-2/3">
                            <input className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-author" type="text" placeholder="author" required/>
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-2/3">
                            <button className="shadow bg-purple-400 hover:bg-purple-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit" onClick={onSubmit}>
                                REGISTER
                            </button>
                            
                            </div>
                        </div>
                    </form>
                </div>
          </div> 
          </div>
        )
}