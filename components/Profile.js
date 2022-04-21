import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, query, where, getDocs, limit, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import FeedHead from './FeedHead'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import component from '../asset/Component.png'
import Image from 'next/image';
import Post from "../components/Post";


function Profile() {
    const {data : session} = useSession();
    const [savedposts, setSavedposts] = useState([]);
    const [likedposts, setLikedposts] = useState([]);
    const [userPosts, setUserposts] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    const [userid, setuserid] = useState();
    const [posts, setPosts] = useState([]);

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



    // if(!session){
    //     return;
    // }else{
    //     useEffect(() => {
    //         onSnapshot(query(collection(db, "users"), where("email", "==", session.user?.email)),
    //           (snapshot) => {
    //             setuserid(snapshot.docs);
    //             // setuserid(userid[0].id)
    //           }
    //         )
    //     }, []);
    //     console.log(userid[0].id);
    // }




    // useEffect(() => 
    //     onSnapshot(collection(db, "users", userid, "posts"), (snapshot) => {
    //         setPosts(snapshot.docs);
    //     }),

    //     [db, postId]
    // );




    // useEffect(() => {

    // })

  return (
    <div className='flex flex-col space-y-8'>
    {
        session ?

        <>
        <div className="border-b-2 border-slate-500">
            <FeedHead name="PROFILE"/>
        </div>
        <div className='flex flex-col space-y-3 items-center justify-center'>

            <img className='h-[140px] w-[140px] rounded-full' src={session.user.image}></img>
            <h1 className='font-bold text-3xl'>{session.user.name}</h1>
            <h1 className='font-semibold text-lg text-slate-600'>@{session.user.username}</h1>

        </div>
        
        <div className='flex justify-center space-x-5'>
            <div className='flex space-x-2'>
                <h1>Followers</h1>
                <h1 className='text-green-500 font-semibold'>{followers.length}</h1>
            </div>
            <div className='flex space-x-2'>
                <h1>Following</h1>
                <h1 className='text-green-500 font-semibold'>{following.length}</h1>
            </div>
            <div className='flex space-x-2'>
                <h1>Posts</h1>
                <h1 className='text-green-500 font-semibold'>{userPosts.length}</h1>
            </div>
        </div>
        <hr></hr>
        <div className='flex space-x-8 items-center justify-center'>
            <button className='bg-slate-200 rounded-3xl px-3 py-1 font-semibold hover:shadow-lg hover:bg-slate-900 hover:text-white active:text-slate-400'>Saved Posts<span className='text-green-500 font-semibold ml-2'>{savedposts.length}</span></button>
            <button className='bg-slate-200 rounded-3xl px-3 py-1 font-semibold hover:shadow-lg hover:bg-slate-900 hover:text-white active:text-slate-400'>Liked Posts<span className='text-green-500 font-semibold ml-2'>{likedposts.length}</span></button>
        </div>
        <hr></hr>
        <div>
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
        </>:
        <>
            Log In 
        </>
    }

    </div>
  )
}

export default Profile

// 'bg-slate-200 rounded-3xl p-3 w-[130px] font-semibold hover:shadow-lg hover:bg-slate-900 hover:text-white active:text-slate-400'