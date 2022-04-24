import React, { useEffect, useState } from 'react'
import {db} from "../firebase";
import SearchProfile from "../components/SearchProfile";
import { collection, addDoc, serverTimestamp, getDoc, doc, query, getDocs, where, updateDoc, arrayRemove, increment, arrayUnion, onSnapshot, setDoc, deleteDoc, orderBy } from "firebase/firestore";
import { set } from 'react-hook-form';
import { useSession } from 'next-auth/react';



function Search() {
  const [input, setInput] = useState();
  const [users, setUsers] = useState([]);
  const {data: session} = useSession();

  useEffect(() => 
      onSnapshot(query(collection(db, "users")),
        (snapshot) => {
          setUsers(snapshot.docs);
        }
      )
  ,[db]);

  return (
    <div className='p-8'>
    <div>
      <div className='flex justify-center flex-col relative'>
        <input className='h-[40px] w-[270px] md:w-[350px] p-4 bg-gray-200 shadow-xl rounded-3xl' onChange={(e) => setInput(e.target.value)} value={input} type='text' placeholder='search username...'></input>

        <div className='py-8'>

        {input && session && 
          users.filter((user) => user.data().username.includes(input.toLowerCase()))
            .map((user) => ((user.data().email !== session.user.email) && <SearchProfile userData={user.data()} />))
        }
        
        </div>

      </div>
    </div>
    </div>
  )
}

export default Search