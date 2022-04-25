import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, query, where, getDocs, limit, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import FeedHead from './FeedHead'
import { useSession } from 'next-auth/react';
import Post from "../components/Post";
import Link from 'next/link';


function Profile() {
    const {data : session} = useSession();
    const [savedposts, setSavedposts] = useState([]);
    const [likedposts, setLikedposts] = useState([]);
    const [userPosts, setUserposts] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    const [userid, setuserid] = useState();
    const [posts, setPosts] = useState([]);

    function numFormatter(num) {
        if(num > 999 && num < 1000000){
            return (num/1000).toFixed(0) + 'K';
        }else if(num > 1000000){
            return (num/1000000).toFixed(0) + 'M'; 
        }else if(num < 900){
            return num; 
        }
    }

  useEffect(() => {
    onSnapshot(query(collection(db, "posts")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    )
  },[db]);

    useEffect(() => {
        onSnapshot(query(collection(db, "users", session.user.email, "posts")),
          (snapshot) => {
            setUserposts(snapshot.docs);
          }
        )
      },[db, posts]);


    useEffect(() => {
        onSnapshot(query(collection(db, "users", session.user.email, "likedposts")),
            (snapshot) => {
                setLikedposts(snapshot.docs);
            }
        )
    }, [db]);

    useEffect(() => {
        onSnapshot(query(collection(db, "users", session.user.email, "savedposts")),
            (snapshot) => {
                setSavedposts(snapshot.docs);
            }
        )
    }, [db]);

    useEffect(() => {
        onSnapshot(query(collection(db, "users", session.user.email, "followers")),
            (snapshot) => {
                setFollowers(snapshot.docs);
            }
        )
    }, [db]);

    useEffect(() => {
        onSnapshot(query(collection(db, "users", session.user.email, "following")),
            (snapshot) => {
                setFollowing(snapshot.docs);
            }
        )
    }, [db]);




  return (
    <div className='flex flex-col space-y-8'>
    {
        session ?

        <>
        <div className="border-b-2 border-slate-500">
            <FeedHead name="PROFILE"/>
        </div>
        <div className='flex flex-col space-y-3 items-center justify-center'>

            <img className='h-[140px] w-[140px] rounded-full border-[3px] border-sky-500 p-1 shadow-xl shadow-sky-200' src={session.user.image}></img>
            <h1 className='font-bold text-3xl drop-shadow-lg'>{session.user.name}</h1>
            <h1 className='font-semibold text-lg text-slate-600'>@{session.user.username}</h1>

        </div>
        
        <div className='flex justify-center space-x-5'>
        <Link href="/profile/followers">
            <a>

            <div className='cursor-pointer flex space-x-2 bg-gray-800 rounded-3xl p-2 px-3 text-md shadow-md hover:shadow-xl hover:translate-y-[-3px] hover:bg-slate-700 active:bg-black'>
                <h1 className='font-semibold text-white'>Followers</h1>
                <h1 className='text-green-500 font-semibold'>{numFormatter(followers.length)}</h1>
            </div>
            </a>
        </Link>

        <Link href="/profile/following">
            <a>
            <div className='cursor-pointer flex space-x-2 bg-gray-800 rounded-3xl p-2 px-3 text-md shadow-md hover:shadow-xl hover:translate-y-[-3px] hover:bg-slate-700 active:bg-black'>
                <h1 className='font-semibold text-white'>Following</h1>
                <h1 className='text-green-500 font-semibold'>{numFormatter(following.length)}</h1>
            </div>
            </a>
        </Link>
        </div>
        <hr></hr>
        <div className='flex space-x-8 items-center justify-center'>
        <Link href="/profile/savedposts" passHref>
            <a>
                <button className='bg-slate-200 rounded-3xl px-3 py-1.5 font-semibold hover:shadow-lg hover:bg-slate-700 hover:text-white active:text-slate-400'>Saved Posts<span className='text-green-500 font-semibold ml-2'>{numFormatter(savedposts.length)}</span></button>
            </a>
        </Link>
        <Link href="/profile/likedposts" passHref>
            <a>
                <button className='bg-slate-200 rounded-3xl px-3 py-1.5 font-semibold hover:shadow-lg hover:bg-slate-700 hover:text-white active:text-slate-400'>Liked Posts<span className='text-green-500 font-semibold ml-2'>{numFormatter(likedposts.length)}</span></button>
            </a>
        </Link>
        </div>
        <hr></hr>
        <div>
        <div className='flex space-x-3 px-7'>
                <h1 className='text-lg font-bold mb-2'>POSTS</h1>
                <h1 className='text-green-500 font-bold text-lg'>{numFormatter(userPosts.length)}</h1>
            </div>
            <div className='mb-8'>

            {
                session &&
                posts.map((post) => {

                    if(post.data().email == session.user.email){
                        return (
                        <Post
                        key={post.id}
                        postId={post.id}
                        userid={session.user.email}
                        post={post.data()}
                        />
                        )
                    }
                    
                }
                )
            }
            </div>


        </div>
        </>:
        <>
            Log In 
        </>
    }

    </div>
  )
}

export default Profile;