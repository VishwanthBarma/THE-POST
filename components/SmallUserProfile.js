import { collection, onSnapshot, doc, getDoc, deleteDoc, query, where, getDocs, addDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { AiOutlineDelete, AiFillDelete } from "react-icons/ai";
import Link from 'next/link';

function SmallUserProfile({id, infollowing, infollowers, user}) {
    const {data: session} = useSession();
    const [loading, setLoading] = useState(false);
    const [following, setFollowing] = useState([]);
    const [hasNotfollowing, sethasnotfollowing] = useState(false);
    const [userData, setUserdata] = useState();
    const [start, setStart] = useState(true);


    useEffect(() => {
        const getdata = async () => {
            const snap = await getDoc(doc(db, "users", user));
            setUserdata(snap.data());
        }
        getdata()
    });

    useEffect(() =>  
        onSnapshot(collection(db, "users", session.user.email, "following"), (snapshot) => {
            setFollowing(snapshot.docs);
        }),
    [user, db]);

    useEffect(() => {
        sethasnotfollowing(following.findIndex((person) => (person.data().email === user)) === -1);
    },
        [following, user, db]
    );


    const deleteFollower = async() => {
        setLoading(true);
        const q = query(collection(db, "users", userData.email, "following"), where("email", "==", session.user.email));
        const querySnapshot = await getDocs(q);

        console.log(ruerySnapshot.docs[0].id);
        
        if(!hasNotfollowing){

            const p = query(collection(db, "users", session.user.email, "following"), where("email", "==", userData.email));
            const puerySnapshot = await getDocs(p);

            const r = query(collection(db, "users", userData.email, "followers"), where("email", "==", session.user.email));
            const ruerySnapshot = await getDocs(r);

            setStart(false);
            await deleteDoc(doc(db, "users", session.user.email, "following", puerySnapshot.docs[0].id));
            await deleteDoc(doc(db, "users", userData.email, "followers", ruerySnapshot.docs[0].id));
        }
        await deleteDoc(doc(db, "users", userData.email, "following", querySnapshot.docs[0].id))
        await deleteDoc(doc(db, "users", session.user.email, "followers", id));
        setLoading(false);
    }

    const followFollowers = async() => {
        setLoading(true);
        await addDoc(collection(db, "users", session.user.email, "following"), {
            email: user,
        })

        await addDoc(collection(db, "users", user, "followers"), {
            email: session.user.email,
        })

        setLoading(false);
    }
    
    const unfollowFollowing = async () => {
        setLoading(true);
        const q = query(collection(db, "users", userData.email, "followers"), where("email", "==", session.user.email));
        const querySnapshot = await getDocs(q);

        await deleteDoc(doc(db, "users", session.user.email, "following", id));
        await deleteDoc(doc(db, "users", userData.email, "followers", querySnapshot.docs[0].id));        

        setLoading(false);
    }


  return (
    <div className='md:px-5 px-2 lg:px-7 py-2'>
    {
        session && userData?
    <>
        <div className='flex space-x-4 py-3 px-4 md:px-9 justify-between bg-gray-900 bg-opacity-90 rounded-3xl text-white shadow-2xl hover:translate-y-[-3px] hover:shadow-inner'>
            <Link href={{
                pathname: '/profile/[email]',
                query: {email: user},
            }} passHref>
                <a className='flex flex-1'>
                    <img className='rounded-full w-8 h-8 md:h-12 md:w-12 border-2 border-white' src={userData.dp}></img>
                    <div className='cursor-pointer flex flex-col flex-1 ml-2'>
                        <h1 className='font-bold text-[12px] md:text-lg'>{userData.fullname}</h1>
                        <h1 className='text-slate-400 text-[12px] md:text-md'>@{userData.username}</h1>
                    </div>
                </a>
            </Link>

            {
                infollowers && 
                <div className='flex items-center'>
                    {
                        loading &&
                        <div className="spinner-border animate-spin inline-block w-[26px] h-[26px] border-4 rounded-full mr-2" role="status">
                            <span className="font-bold text-3xl">.</span>
                        </div>
                    }
                    <AiFillDelete onClick={deleteFollower} className='cursor-pointer w-5 h-5 mr-2 md:w-6 md:h-6 md:mr-3 text-red-400 hover:text-red-600'/>
                </div>

            }
            {
                infollowing &&
                <h1 onClick={unfollowFollowing} className='flex cursor-pointer text-[12px] md:text-[16px] items-center font-semibold text-sky-500 md:hover:scale-125 hover:scale-110'>Unfollow</h1>
            }

            {
                infollowers && hasNotfollowing && start?
                <>
                <h1 onClick={followFollowers} className='flex cursor-pointer text-[12px] md:text-[16px] items-center font-semibold text-sky-500 md:hover:scale-125 hover:scale-110'>Follow</h1>

                </>
                
                :
                <></>
            }
        </div>
    </>:
    <>
        Loading...
    </>

    }
    </div>
  )
}

export default SmallUserProfile;