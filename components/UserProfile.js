import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, query, where, getDocs, limit, orderBy, onSnapshot, deleteDoc, addDoc} from "firebase/firestore";
import { db } from "../firebase";
import FeedHead from './FeedHead'
import { useSession } from 'next-auth/react';
import Post from "../components/Post";


function UserProfile({user}) {
    const {data : session} = useSession();
    const [savedposts, setSavedposts] = useState([]);
    const [likedposts, setLikedposts] = useState([]);
    const [userPosts, setUserposts] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [userFollowing, setUserFollowing] = useState([])
    const [hasFollowing, setHasFollowing] = useState(false);

    
    const [posts, setPosts] = useState([]);
    const [userData, setUserdata] = useState();


    useEffect(() => {
        const getdata = async () => {
            const snap = await getDoc(doc(db, "users", user));
            setUserdata(snap.data());
        }
        getdata()
    });
    
  useEffect(() => {
    onSnapshot(query(collection(db, "posts")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    )
  },[db]);

    useEffect(() => {
        onSnapshot(query(collection(db, "users", user, "posts")),
          (snapshot) => {
            setUserposts(snapshot.docs);
          }
        )
      },[db, posts]);


    useEffect(() => {
        onSnapshot(query(collection(db, "users", user, "likedposts")),
            (snapshot) => {
                setLikedposts(snapshot.docs);
            }
        )
    }, [db]);

    useEffect(() => {
        onSnapshot(query(collection(db, "users", user, "savedposts")),
            (snapshot) => {
                setSavedposts(snapshot.docs);
            }
        )
    }, [db]);

    useEffect(() => {
        onSnapshot(query(collection(db, "users", user, "followers")),
            (snapshot) => {
                setFollowers(snapshot.docs);
            }
        )
    }, [db]);

    useEffect(() => {
        onSnapshot(query(collection(db, "users", user, "following")),
            (snapshot) => {
                setFollowing(snapshot.docs);
            }
        )
    }, [db]);


    useEffect(() => {
        onSnapshot(query(collection(db, "users", session.user.email, "following")),
            (snapshot) => {
                setUserFollowing(snapshot.docs);
            }
        )
    }, [db, user])

    useEffect(() => 
        setHasFollowing(userFollowing.findIndex((person) => (person.data().email === user)) !== -1),
        [userFollowing, user, db]
    );

    

    const followUnfollowing = async () => {
        

        await addDoc(collection(db, "users", session.user.email, "following"), {
            email: user,
        })

        await addDoc(collection(db, "users", user, "followers"), {
            email: session.user.email,
        })

        
    }

    const unfollowFollowing = async () => {
       
        const q = query(collection(db, "users", user, "followers"), where("email", "==", session.user.email));
        const querySnapshot = await getDocs(q);

        const p = query(collection(db, "users", session.user.email, "following"), where("email", "==", user));
        const puerySnapshot = await getDocs(p);


        await deleteDoc(doc(db, "users", session.user.email, "following", puerySnapshot.docs[0].id));
        await deleteDoc(doc(db, "users", user, "followers", querySnapshot.docs[0].id));        

        
    }


  return (
    <div className='flex flex-col space-y-8'>
    {
        session && userData?

        <>
        <div className="border-b-2 border-slate-500">
            <FeedHead name="PROFILE"/>
        </div>
        <div className='flex flex-col space-y-3 items-center justify-center'>

            <img className='h-[140px] w-[140px] rounded-full border-[3px] border-sky-500 p-1 shadow-xl shadow-sky-200' src={userData.dp}></img>
            <h1 className='font-bold text-3xl drop-shadow-lg'>{userData.fullname}</h1>
            <div className='flex space-x-6 items-center'>
                <h1 className='font-semibold text-lg text-slate-600'>@{userData.username}</h1>
                {
                    hasFollowing?
                    <>
                        <h1 onClick={unfollowFollowing} className='text-sky-500 font-bold text-lg cursor-pointer hover:scale-110'>Unfollow</h1>
                    </>:
                    <>
                        <h1 onClick={followUnfollowing} className='text-sky-500 font-bold text-lg cursor-pointer hover:scale-110'>Follow</h1>
                    </>
                }
            </div>

        </div>
        
        <div className='flex justify-center space-x-5'>

            <div className='cursor-default flex space-x-2 bg-gray-800 rounded-3xl p-2 px-3 text-md shadow-md'>
                <h1 className='font-semibold text-white'>Followers</h1>
                <h1 className='text-green-500 font-semibold'>{followers.length}</h1>
            </div>
        
            <div className='cursor-default flex space-x-2 bg-gray-800 rounded-3xl p-2 px-3 text-md shadow-md'>
                <h1 className='font-semibold text-white'>Following</h1>
                <h1 className='text-green-500 font-semibold'>{following.length}</h1>
            </div>
        </div>
        <hr></hr>
        <div className='flex space-x-8 items-center justify-center'>
                <button className='bg-slate-200 cursor-default rounded-3xl px-3 py-1.5 font-semibold'>Saved Posts<span className='text-green-500 font-semibold ml-2'>{savedposts.length}</span></button>
                <button className='bg-slate-200 cursor-default rounded-3xl px-3 py-1.5 font-semibold'>Liked Posts<span className='text-green-500 font-semibold ml-2'>{likedposts.length}</span></button>
            
        </div>
        <hr></hr>
        <div>
        <div className='flex space-x-3 px-7'>
                <h1 className='text-lg font-bold mb-2'>POSTS</h1>
                <h1 className='text-green-500 font-bold text-lg'>{userPosts.length}</h1>
            </div>
            <div className='mb-8'>

            {
                session &&
                posts.map((post) => {

                    if(post.data().email == user){
                        return (
                        <Post
                        key={post.id}
                        postId={post.id}
                        userid={user}
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
            Loading... 
        </>
    }

    </div>
  )
}

export default UserProfile;
