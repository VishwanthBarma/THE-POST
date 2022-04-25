import FeedHead from './FeedHead';
import Post from "../components/Post";
import { db } from "../firebase";
import { getSession, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, query, where, getDocs, limit, orderBy, onSnapshot } from "firebase/firestore";


function Feed() {

  const {data: session} = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => 
    onSnapshot(query(collection(db, "posts"), orderBy("timestamp")),
      (snapshot) => {
        setPosts((snapshot.docs).reverse());
      }
    )
  ,[db]);

  return (
    <div>
        <>
        <div className="border-b-2 border-slate-500">
            <FeedHead name="HOME"/>
        </div>

        {/* Posts */}
        <div className='mb-8'>
          {
            session &&
            posts.map((post) => (
                <Post
                  key={post.id}
                  postId={post.id}
                  userid={session.user.email}
                  post={post.data()}
                />
              )
            )
          }
        </div>
        </>
    </div>
  )
}

export default Feed