import React, { useEffect, useState } from 'react';
import {db} from "../firebase";
import Post from "../components/Post";
import { collection, addDoc, serverTimestamp, getDoc, doc, query, getDocs, where, updateDoc, arrayRemove, increment, arrayUnion, onSnapshot, setDoc, deleteDoc, orderBy } from "firebase/firestore";
import { useSession } from 'next-auth/react';
import FeedHead from './FeedHead';



function Savedposts() {
    const [posts, setPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const {data: session} = useSession();


    useEffect(() => {
        onSnapshot(query(collection(db, "posts")),
          (snapshot) => {
            setPosts(snapshot.docs);
          }
        )
    },[db]);

    useEffect(() => 
        onSnapshot(collection(db, "users", session.user.email, "savedposts"), (snapshot) => {
            setSavedPosts(snapshot.docs);
        }),     
    [db, posts]);

  return (
    <div>
        <div>
        <div className="border-b-2 border-slate-500">
            <FeedHead name="SAVED POSTS"/>
        </div>
        {
            session?
            <>
                {
                    posts.map((post) => {
                        if(savedPosts.findIndex((savedPost) => (savedPost.id === post.id)) !== -1){
                            return (
                                <Post
                                key={post.id}
                                postId={post.id}
                                userid={session.user.email}
                                post={post.data()}
                                />
                            )
                        }
                    })
                }
            </>:
            <>
                <div>Loading...</div>
            </>
        }

        </div>
    </div>
  )
}

export default Savedposts;