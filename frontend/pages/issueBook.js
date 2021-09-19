import Head from 'next/head'
import Link from 'next/link'
import {useEffect,useState} from 'react'
const API="http://localhost:8000/api/"

export default function issueBook() {
        const [user,setUser] = useState([]);
        const [books,setBooks] = useState([]);
        const [rkey,setkey]=useState(0)
        let count=0;

        useEffect(() => {
            const result = fetch(`${API}user/all`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    setUser(data);
                    console.log(data);
                })
                .catch((err) => console.log(err));
            
            const result1 = fetch(`${API}book/available`, {
                    method: "GET",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setBooks(data);
                       console.log(data);
                    })
                    .catch((err) => console.log(err));
        }, [rkey]);
        const onIssue = (event)=>{
            event.preventDefault();
            const e=document.getElementById("user");
            const user =e.options[e.selectedIndex].value;
            const book = event.target.id;
            console.log(user," issue ",book)
            if(user && book){
                const data=JSON.stringify({
                    user:user,
                    bookId:book
                })
                console.log(`${API}/${user}/issue/${book}`)
                console.log(data)
                fetch(`${API}${user}/issue/${book}`,{
                    method:'PATCH',
                    headers:{
                        'Content-type':'application/json;charset=utf-8'
                    },
                    
    
                }).then(response=>{
                            if(response.status === 200){
                                // document.getElementById("inline-full-name").value='';
                                // document.getElementById("inline-phone").value='';
                                console.log("registered successfully");
                                setkey(oldkey =>oldkey+1)
                            }
                            else{
                                
                                console.log("verification mail not sent");
                            }
                        })
                        .catch(err=>console.log(err));
            }
        }

        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
            <title>Library</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="flex flex-col   w-full flex-1 px-20 text-center">
            <h3 className="text-6xl font-bold   pb-20 leading-tight text-gray-800 font-serif uppercase" >issue book</h3>

              <div className="flex flex-row justify-between pb-10  items-center ">
                  <Link href='/'><button className="inline-flex px-5 py-1 text-md font-semibold uppercase leading-5 text-blue-800 bg-blue-100 rounded-lg hover:bg-blue-400 hover:text-white hover:scale-110 tracking-widest">Home</button></Link>
                  <Link href='/viewBook'><button className="inline-flex px-5 py-1 text-md font-semibold uppercase leading-5 text-blue-800 bg-blue-100 rounded-lg hover:bg-blue-400 hover:text-white hover:scale-110 tracking-widest">view all book</button></Link>

              </div>
            <div className="inline-block  overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <div className=" flex flex-row float-left my-9 w-3/4">
                   <label className="px-6 text-base font-medium leading-4 tracking-wider  text-gray-500 uppercase ">user: </label>
                    <select className="mx-12 inline-flex justify-center w-1/2 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white  text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="user">
                        <option value=""  selected className="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white  text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" >Select User</option>
                       {user && user.map((items)=>{
                           return(
                        <option value={items._id}>{items.Name}</option>

                           );
                       })}
                    </select>
                </div>
                <table className="min-w-full">
                  <thead>
                      <tr>
                        <th className="px-6 text-base font-medium leading-4 tracking-wider  text-gray-500 uppercase border-b border-gray-200 bg-gray-50">ID</th>
                        <th className="px-6 text-base font-medium leading-4 tracking-wider  text-gray-500 uppercase border-b border-gray-200 bg-gray-50">BOOK</th>
                        <th className="px-6 text-base font-medium leading-4 tracking-wider  text-gray-500 uppercase border-b border-gray-200 bg-gray-50">AUTHOR</th>
                        <th className="px-6 text-base font-medium leading-4 tracking-wider  text-gray-500 uppercase border-b border-gray-200 bg-gray-50">action</th>
                      </tr>
                    </thead>
                  <tbody className="bg-white">  
                        {books && books.map((item)=>{
                            return(
                            <tr >
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <span className="text-lg leading-5 text-gray-500">{++count}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <span className="text-lg leading-5 text-gray-500">{item.Name}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <span className="text-lg leading-5 text-gray-500">{item.Author}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <button className="inline-flex px-5 py-1 text-xs font-semibold uppercase leading-5 text-green-800 bg-green-100 rounded-lg hover:bg-green-400 hover:text-white hover:scale-125" id={item._id} onClick={onIssue}>Issue</button>
                            </td>
                            </tr> );  
                        })}   
                    </tbody>
                </table>
            </div>
          </main>
          </div> 
        )
}