import FeedHead from './FeedHead';
import Post from "../components/Post";
import {data} from '../utils/data';
import { db } from "../firebase";
import { getSession, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { deepPurple } from '@material-ui/core/colors';
import { collection, doc, getDoc, query, where, getDocs, limit, orderBy, onSnapshot } from "firebase/firestore";



function Feed() {

  const {data: session} = useSession();
  const [posts, setPosts] = useState([]);
  // const [user, setUser] = useState([]);

  useEffect(() => {
    onSnapshot(query(collection(db, "posts")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    )
  },[]);

  return (
    <div>

      {
        session?
        <>

        <div className="border-b-2 border-slate-500">
            <FeedHead name="HOME"/>
        </div>

        {/* Posts */}
        <div>

          {
            posts.map((post) => (
                <Post
                  key={post.id}
                  postId={post.id}
                  post={post.data()}
                />
              )
            )
          }
          

        </div>
        </>
        :
        <>
            <div className='flex text-slate-800 flex-col items-center p-5 space-y-5'>
              <h1 className='font-bold text-4xl'>Welcome to the-post</h1>
              <p className='font-semibold text-lg p-3'>Make some fun with this web app, we think you literally enjoy it.
              To continue,
              <span className='italic'> Sign in for free.</span></p>
            </div>
        </>

      }
    </div>
  )
}

export default Feed