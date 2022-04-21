import FeedHead from './FeedHead';
import Post from "../components/Post";
import {data} from '../utils/data';
import { db } from "../firebase";
import { getSession, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { deepPurple } from '@material-ui/core/colors';
import { collection, doc, getDoc, query, where, getDocs, limit, orderBy, onSnapshot } from "firebase/firestore";
// import Cookies from "js-cookie";


function Feed() {

  const {data: session} = useSession();
  const [posts, setPosts] = useState([]);
  // const [userid, setuserid] = useState(null);
  // const [user, setUser] = useState([]);

  useEffect(() => {
    onSnapshot(query(collection(db, "posts")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    )
  },[]);

  // useEffect(() => {
  //   onSnapshot(query(collection(db, "users"), where("email", "==", session.user?.email)),
  //     (snapshot) => {
  //       setuserid(snapshot.docs);
  //     }
  //   )
  // }, [posts])

  // console.log(Cookies.get("userId"));
  // const a = userid[0].id;
  // console.log(userid[0].id);

  return (
    <div>
        <>

        <div className="border-b-2 border-slate-500">
            <FeedHead name="HOME"/>
        </div>

        {/* Posts */}
        <div>

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