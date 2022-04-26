import React, { cloneElement, useEffect, useState } from 'react';
import {db} from "../firebase";
import { collection, addDoc, serverTimestamp, getDoc, doc, query, getDocs, where, updateDoc, arrayRemove, increment, arrayUnion, onSnapshot, setDoc, deleteDoc, orderBy } from "firebase/firestore";
import { useSession } from 'next-auth/react';
import Moment from 'react-moment';
import { AiOutlineHeart, AiFillHeart, AiOutlineDelete } from "react-icons/ai";

import Comment from "../components/Comment";
import CommentInput from "../components/CommentInput";
import { FaRegCommentAlt, FaCommentAlt } from "react-icons/fa";

import { RiBookmarkLine, RiBookmarkFill } from "react-icons/ri";
import Link from 'next/link';
import { getStorage, ref, deleteObject } from "firebase/storage";


function Post({post, postId, userid}) {
    const [likes, setLikes] = useState([]);
    const [saves, setSaves] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasSaved, setHasSaved] = useState(false);
    const [isUserPost, setIsUserPost] = useState(false);
    const [commentClicked, setcommentClicked] = useState(false);


    const {data: session} = useSession();

    function numFormatter(num) {
        if(num > 999 && num < 1000000){
            return (num/1000).toFixed(0) + 'K';
        }else if(num > 1000000){
            return (num/1000000).toFixed(0) + 'M'; 
        }else if(num < 900){
            return num; 
        }
    }


    useEffect(() => 
        onSnapshot(collection(db, "posts", postId, "likes"), (snapshot) => {
            setLikes(snapshot.docs);
        }),

        [db, postId]
    );

    useEffect(() => 
        onSnapshot(collection(db, "posts", postId, "saves"), (snapshot) => {
            setSaves(snapshot.docs);
        }),

        [db, postId]
    );

    useEffect(() => 
        onSnapshot(collection(db, "users", userid, "posts"), (snapshot) => {
            setPosts(snapshot.docs);
        }),     
    [db, postId]);

    useEffect(() => 
        onSnapshot(collection(db, "posts", postId, "comments"), (snapshot) => {
            setComments(snapshot.docs);
        }),
    [db, postId]);



    useEffect(() => {
        setHasLiked(likes.findIndex((like) => (like.id === session?.user?.uid)) !== -1);
    }, [likes]);

    useEffect(() => {
        setHasSaved(saves.findIndex((save) => (save.id === session?.user?.uid)) !== -1);
    }, [saves]);

    useEffect(() => {
        setIsUserPost(post.email === session.user.email);
    }, [posts]);


    const postComment = async () => {
        if(commentClicked){
            setcommentClicked(false);
        }else{
            setcommentClicked(true);
        }
    }

    const deletePost = async() => {
        // // unsaving
        if(hasSaved){

            await deleteDoc(doc(db, "posts", postId, "saves", session.user.uid));
            await deleteDoc(doc(db, "users", userid, "savedposts", postId));
        }

        // // unliking

        if(hasLiked){

            await deleteDoc(doc(db, "posts", postId, "likes", session.user.uid));
            await deleteDoc(doc(db, "users", userid, "likedposts", postId));
        }

        // deleting doc
        await deleteDoc(doc(db, "users", userid, "posts", postId));
        await deleteDoc(doc(db, "posts", postId));

        const storage = getStorage();

        const desertRef = ref(storage, post.photoUrl);

        // Delete the file
        deleteObject(desertRef).then(() => {
            console.log("File Deleted Successfully");
        }).catch((error) => {
            console.log("File Deletion Unsuccessfull.");
        });

    }

    const savePost = async () => {
        const q = await query(collection(db, "users"), where("email", "==", session.user.email));
        const querySnapshot = await getDocs(q);
        const userId = querySnapshot.docs[0].id;

        if(hasSaved){
            await deleteDoc(doc(db, "posts", postId, "saves", session.user.uid));
            await deleteDoc(doc(db, "users", userId, "savedposts", postId));
        }else{
            await setDoc(doc(db, "posts", postId, "saves", session.user.uid), {
                username: session.user.name,
            });

            await setDoc(doc(db, "users", userId, "savedposts", postId), {
            });
        }
    }


    const likePost = async () => {
        const q = await query(collection(db, "users"), where("email", "==", session.user.email));
        const querySnapshot = await getDocs(q);
        const userId = querySnapshot.docs[0].id;

        if(hasLiked){
            await deleteDoc(doc(db, "posts", postId, "likes", session.user.uid));

            await deleteDoc(doc(db, "users", userId, "likedposts", postId));

        }else{

            await setDoc(doc(db, "posts", postId, "likes", session.user.uid), {
                username: session.user.username,      
            });

            await setDoc(doc(db, "users", userId, "likedposts", postId), {
            });
        }
    };


  return (
    <div className="p-4 md:p-7 border-b-[1px] border-slate-100 shadow-md">
        {/* post header */}
        {
            session && 
            <>

            
        <Link href={{
            pathname: (post.email === session.user.email)? '/profile' : '/profile/[email]',
            query: {email: post.email},
        }}>
            <a>
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
                    </div>
                    </div>
                </div>
            </a>
        </Link>
        {/* post description */}

        <div className="px-[5px] md:px-[60px] mt-2">
            <p>{post.description}</p>
        </div>

        {/* post photo */}

        <div className='md:max-h-[30rem] max-h-[20rem] max-w-[22rem] md:max-w-[30rem] md:mx-[60px] my-6'>
                <img className='md:max-h-[30rem] max-h-[16rem] max-w-[18rem] object-cover rounded-3xl' src={post.photo}></img>
        </div>

        {/* post likes and comments */}

        <div className='px-[5px] md:px-[60px]'>
            <div className='flex item-center justify-start sm:space-x-14 space-x-10 mb-4'>
            {
                hasLiked?
                <>
                <div onClick={likePost} className='cursor-pointer flex item-center space-x-2  hover:text-red-400 text-red-500'>
                    <AiFillHeart className='sm:h-6 sm:w-6 h-5 w-5  hover:drop-shadow-lg'/>
                    {
                        likes.length > 0 &&
                        <h2 className='hover:drop-shadow-lg sm:text-md text-[14px]'>{numFormatter(likes.length)}</h2>
                    }
                </div>

                </>:
                <>
                <div onClick={likePost} className='cursor-pointer flex item-center space-x-2  hover:text-red-400 '>
                    <AiOutlineHeart className='sm:h-6 sm:w-6 w-5 h-5 hover:drop-shadow-lg'/>
                    {
                        likes.length > 0 &&
                        <h2 className='hover:drop-shadow-lg sm:text-md text-[14px]'>{numFormatter(likes.length)}</h2>
                    }
                </div>

                </>
            }

            {
                hasSaved?
                <>

                <div onClick={savePost} className='cursor-pointer flex items-center space-x-1 left-16 bottom-[-4px] hover:text-blue-400 text-blue-500'>
                    <RiBookmarkFill className='sm:h-6 sm:w-6 h-5 w-5 hover:drop-shadow-lg'/>
                    {
                        saves.length > 0 &&
                        <h2 className='hover:drop-shadow-lg sm:text-md text-[14px]'>{numFormatter(saves.length)}</h2>
                    }
                </div>
                </>:
                <>
                <div onClick={savePost} className='cursor-pointer flex items-center space-x-1 left-16 bottom-[-4px] hover:text-blue-400'>
                    <RiBookmarkLine className='opacity-75 sm:h-6 sm:w-6 w-5 h-5 hover:drop-shadow-lg'/>
                    {
                        saves.length > 0 &&
                        <h2 className='hover:drop-shadow-lg sm:text-md text-[14px]'>{numFormatter(saves.length)}</h2>
                    }
                </div>

                </>

            }

            {
                isUserPost?
                <>
                <div onClick={deletePost} className='cursor-pointer flex items-center space-x-1 left-16 bottom-[-4px] hover:text-orange-400 active:text-red-600 '>
                    <AiOutlineDelete className='sm:h-6 sm:w-6 w-5 h-5 hover:drop-shadow-lg'/>
                </div>

                </>:
                <></>
            }

            <div className='cursor-pointer'>
            {   
                !commentClicked?

                <>
                <div className='flex items-center justify-center space-x-2'>

                <FaRegCommentAlt  onClick={postComment} className='sm:h-5 sm:w-5 w-4 h-4 font-thin hover:drop-shadow-lg hover:text-green-400'/>
                {
                    comments.length > 0 &&
                    <h2 className='hover:drop-shadow-lg sm:text-md text-[14px]'>{numFormatter(comments.length)}</h2>
                }
                </div>
                </>

                
                :
                <>

                <div className='flex items-center justify-center space-x-2'>

                <FaCommentAlt  onClick={postComment} className='flex sm:h-5 sm:w-5 w-4 h-4 font-thin hover:drop-shadow-lg hover:text-green-400 text-green-500'/>
                {
                    comments.length > 0 &&
                    <h2 className='hover:drop-shadow-lg sm:text-md text-[14px]'>{numFormatter(comments.length)}</h2>
                }
                </div>
                </>
            }  
            </div>

            </div>
            

            {
                comments.length > 0 && 
                <>
                    <p className='text-neutral-400 ml-2 font-semibold text-sm italic'>Comments</p>
                    <div className='max-h-[150px] overflow-y-scroll'>
                        {
                            comments.map((comment) => (
                                <Comment key={comment.id} id={comment.id} postId={postId} data={comment.data()}/>
                            ))
                        }
                    </div>
                </>
            }
                
        
            {
                commentClicked ?
                <>
                    <div className='py-5'>
                        <CommentInput userId={userid} postId={postId}/>
                    </div>


                </>:
                <></>
            }

        </div>
        </>
        }
    </div>
  )
}

export default Post;
