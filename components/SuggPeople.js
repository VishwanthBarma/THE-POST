import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react';
import {db} from "../firebase";
import { collection, addDoc, serverTimestamp, getDoc, doc, query, getDocs, where, updateDoc, arrayRemove, increment, arrayUnion, onSnapshot, setDoc, deleteDoc, orderBy } from "firebase/firestore";

function SuggPeople({user}) {
  const {data: session} = useSession();
  const [hasFollowing, setHasfollowing] = useState(false);
  const [following, setFollowing] = useState([]);
  
  useEffect(() => 
    onSnapshot(collection(db, "users", session.user?.email, "following"), (snapshot) => {
      setFollowing(snapshot.docs);
    }), [db, user]
  );

  useEffect(() => {
    setHasfollowing(following.findIndex((person) => (person.data().email === user.email)) !== -1);
  }, [following]);

  if(user.username == session.user.username){
    return;
  }


  const followUser = async() => {
    const q = await query(collection(db, "users"), where("email", "==", session.user.email));
    const querySnapshot = await getDocs(q);
    const userId = querySnapshot.docs[0].id;

    if(!hasFollowing){
      await addDoc(collection(db, "users", userId, "following"), {
        email: user.email,
      });
  
      await addDoc(collection(db, "users", user.email, "followers"), {
        email: session.user.email,
      });
    }
  }

  
  return (
    <div>
        <div className="flex space-x-2 items-center">
                <div className="cursor-pointer flex items-center space-x-2">

                <div>
                    <img className="shrink-0 h-10 rounded-full" src={user.dp}></img>
                </div>
                <div className="">
                    <h6 className="text-[13.5px] font-bold">{user.fullname}</h6>
                    <p className="text-gray-500 text-[13.5px]">@{user.username}</p>
                </div>
                </div>

                <div className='flex flex-1 justify-end'>
                    <button onClick={followUser} className='hover:text-blue-500 cursor-pointer ml-4 text-blue-400'>Follow</button>
                </div>
            </div>
    </div>
  )
}

export default SuggPeople