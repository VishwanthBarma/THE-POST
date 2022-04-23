import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import FeedHead from './FeedHead';
import SmallUserProfile from "../components/SmallUserProfile";
import { db } from "../firebase";
import { collection, doc, getDoc, query, where, getDocs, limit, orderBy, onSnapshot } from "firebase/firestore";


function Following() {
    const {data: session} = useSession();
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        onSnapshot(query(collection(db, "users", session.user.email, "following")),
          (snapshot) => {
            setFollowing(snapshot.docs);
          }
        )
    },[db]);





  return (
    <div>
        {
            session?
            <>
            <div>
                <div className="border-b-2 border-slate-500">
                <FeedHead name="FOLLOWING"/>
                </div>

                <div>
                    { session && following.length?
                        
                        following.map((person) => {
                            return (
                                <SmallUserProfile infollowers={false} infollowing={true} id={person.id} user={person.data().email}/>
                            );
                        })
                        :
                        <>
                            <div className='flex items-center justify-center p-12'>
                            <div className='bg-neutral-700 p-3 rounded-3xl px-5 '>
                                <h1 className='font-semibold text-lg text-white'>You are not following anyone.</h1>
                            </div>
                            </div>

                        </>
                    }
                </div>


            </div>

            </>:
            <>

            </>
        }
    </div>
  )
}

export default Following