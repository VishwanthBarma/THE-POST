import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { HiStar } from 'react-icons/hi';
import {db} from "../firebase";
import { collection, addDoc, serverTimestamp, getDoc, doc, query, getDocs, where, updateDoc, arrayRemove, increment, arrayUnion, onSnapshot, setDoc, deleteDoc } from "firebase/firestore";
import { useSession } from 'next-auth/react';
import Moment from 'react-moment';
import { PostAddSharp } from '@material-ui/icons';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";





function Post({post, postId}) {
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    const {data: session} = useSession();

    useEffect(() => 
        onSnapshot(collection(db, "posts", postId, "likes"), (snapshot) => {
            setLikes(snapshot.docs);
        }),
        [db, postId]
    );

    useEffect(() => {
        setHasLiked(likes.findIndex((like) => (like.id === session?.user?.uid)) !== -1);
    }, [likes]);


    const likePost = async () => {
        const q = await query(collection(db, "users"), where("email", "==", session.user.email));
        const querySnapshot = await getDocs(q);
        const userId = querySnapshot.docs[0].id;

        if(hasLiked){
            await deleteDoc(doc(db, "posts", postId, "likes", session.user.uid));

            await deleteDoc(doc(db, "users", userId, "likedposts", postId));

        }else{
            const postRef = doc(db, "posts", postId);
            const docSnap = await getDoc(postRef);

            await setDoc(doc(db, "posts", postId, "likes", session.user.uid), {
                username: session.user.username,      
            });

            await setDoc(doc(db, "users", userId, "likedposts", postId), {
            });
        }
    };

    // const handleLiked = async (e) => {
    //     e.stopPropagation();
    //     const q = await query(collection(db, "users"), where("email", "==", session.user.email));
    //     const querySnapshot = await getDocs(q);
    //     const userdocRef = doc(db, "users", querySnapshot.docs[0].id);
        
    //     const docSnap = querySnapshot.docs[0].data();

    //     console.log(docSnap)

    //     const postdocRef = doc(db, "posts", postId);

    //     if(docSnap.likedPosts.includes(postdocRef.id)){

    //         await updateDoc(userdocRef, {
    //             likedPosts: arrayRemove(postdocRef.id),
    //         })
    //         await updateDoc(postdocRef, {
    //             meta: {
    //                 likes: increment(-1),
    //             }
    //         })
    //     }else{

    //         await updateDoc(userdocRef, {
    //             likedPosts: arrayUnion(postdocRef.id),
    //         })
    
    //         await updateDoc(postdocRef, {
    //             meta: {
    //                 likes: increment(1),
    //             }
    //         })
    //     }
    // }

  return (
    <div className="p-4 md:p-7 border-b-[1px] border-slate-100 shadow-md">
        {/* post header */}
        <div>
            <div className="cursor-pointer flex space-x-2 items-center">
            <div className=''>
                <img className="h-12 w-12 rounded-full object-cover" src={post.dp}></img>
            </div>
            <div className="">
                <h6 className="text-sm font-bold">{post.fullname} <span className="hidden md:inline font-light">@{post.username}</span></h6>
                <div className='text-slate-500 text-sm'>
                    <Moment fromNow>{post.timestamp.toDate()}</Moment>
                </div>
                {/* <p className="text-gray-500 text-sm">05 April 2022</p> */}
            </div>
            </div>
        </div>
        {/* post description */}

        <div className="px-[5px] md:px-[60px] mt-2">
            <p>{post.description}</p>
        </div>

        {/* post photo */}

        <div className='md:max-h-[30rem] max-h-[20rem] max-w-[22rem] md:max-w-[30rem] md:mx-[60px] my-6'>
                <img className='md:max-h-[30rem] max-h-[20rem] max-w-[22rem] object-cover rounded-3xl' src={post.photo}></img>
        </div>

        {/* post likes and comments */}

        <div className='px-[5px] md:px-[60px]'>
            <div className='flex item-center space-x-9 relative'>
            {
                hasLiked?
                <>
                <div onClick={likePost} className='cursor-pointer flex item-center space-x-2  hover:text-red-400 text-red-500'>
                    <AiFillHeart className='h-6 w-6 hover:drop-shadow-lg'/>
                    {
                        likes.length > 0 &&
                        <h2 className='hover:drop-shadow-lg'>{likes.length}</h2>
                    }
                </div>

                </>:
                <>
                <div onClick={likePost} className='cursor-pointer flex item-center space-x-2  hover:text-red-400 '>
                    <AiOutlineHeart className='h-6 w-6 hover:drop-shadow-lg'/>
                    {
                        likes.length > 0 &&
                        <h2 className='hover:drop-shadow-lg'>{likes.length}</h2>
                    }
                </div>

                </>
            }
                <div className='cursor-pointer flex items-center space-x-1 absolute left-16 bottom-[-4px] hover:text-red-500 active:text-red-700'>
                    <HiStar className='h-8 w-8 hover:drop-shadow-lg'/>
                    <p className='hover:drop-shadow-lg'>save</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post