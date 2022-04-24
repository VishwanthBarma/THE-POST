import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import FeedHead from './FeedHead';
import SmallUserProfile from "../components/SmallUserProfile";
import { db } from "../firebase";
import { collection, doc, getDoc, query, where, getDocs, limit, orderBy, onSnapshot } from "firebase/firestore";


function Followers() {
    const {data: session} = useSession();
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        onSnapshot(query(collection(db, "users", session.user.email, "followers")),
          (snapshot) => {
            setFollowers(snapshot.docs);
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
                <FeedHead name="FOLLOWERS"/>
                </div>

                <div className='py-2'>
                    { session &&
                        followers.map((person) => {
                            return (
                                <SmallUserProfile infollowers={true} infollowing={false} id={person.id} user={person.data().email}/>
                            );
                        })
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

export default Followers