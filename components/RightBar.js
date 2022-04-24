import React, { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import SuggPeople from './SuggPeople';
import { getSession, useSession } from 'next-auth/react';
import { db } from "../firebase";
import { collection, query, where, getDocs, limit, orderBy, onSnapshot } from "firebase/firestore";
import { PermPhoneMsg } from '@material-ui/icons';



function RightBar() {
  const {data: session} = useSession();
  const [people, setPeople] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => 
    onSnapshot(collection(db, "users", session?.user?.email, "following"), (snapshot) => {
      setFollowing(snapshot.docs);
    }), [db]
  );


  useEffect(() => 
      onSnapshot(query(collection(db, "users")),
        (snapshot) => {
          console.log(snapshot.docs);
          setPeople(snapshot.docs);
        }
      )
  ,[db]);


  return (
    <div className="p-4 flex flex-col space-y-7">

    {
      session ? 
      <>
      <div className="p-4 bg-slate-100 rounded-xl px-4 shadow-sm">
        <h1>
          No login password credentials are stored in our database, they are completely authorized
          and authenticated by Google Services.
        </h1>
            {/* <div className="cursor-pointer flex items-center space-x-2 relative mr-36">
                <IoSearch className="shrink-0 h-6 w-6"/>
                <input className="cursor-pointer absolute bg-transparent text-black placeholder-gray-700 pl-6 outline-none" type="text" placeholder="search for people"></input>
            </div> */}
        </div>

        <div>
            <p className="text-slate-400 font-semibold mt-6">SUGGESTED PEOPLE</p>
        </div>

        <div className="flex flex-col space-y-6">
        {session?
          people.slice(0,5).map((user) => {
            if(following.findIndex((person) => (person.data().email === user.data().email)) === -1){
              return(
              <SuggPeople
                user={user.data()}
              />
              )
            }
          })
          :
          <>
            
          </>
        }

        </div>
      </>
      :

      <>
        <div className='p-4 flex flex-col space-y-4 items-center'>
          <h1 className='font-semibold text-lg'>Sign In For Free</h1>
          <p className='p-1 italic'>This web app is built only based on educational purposes, but not for commercial purpose.</p>
        </div>
      </>
    }

    </div>
  )
}

export default RightBar;