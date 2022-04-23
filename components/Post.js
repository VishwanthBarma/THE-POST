import React, { cloneElement, useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { HiStar } from 'react-icons/hi';
import {db} from "../firebase";
import { collection, addDoc, serverTimestamp, getDoc, doc, query, getDocs, where, updateDoc, arrayRemove, increment, arrayUnion, onSnapshot, setDoc, deleteDoc, orderBy } from "firebase/firestore";
import { useSession } from 'next-auth/react';
import Moment from 'react-moment';
import { ContactlessOutlined, PostAddSharp } from '@material-ui/icons';
import { AiOutlineHeart, AiFillHeart, AiOutlineDelete } from "react-icons/ai";

import Comment from "../components/Comment";
import CommentInput from "../components/CommentInput";
import { FaRegCommentAlt, FaCommentAlt } from "react-icons/fa";

import { RiBookmarkLine, RiBookmarkFill } from "react-icons/ri";


function Post({post, postId, userid}) {
    const [likes, setLikes] = useState([]);
    const [saves, setSaves] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasSaved, setHasSaved] = useState(false);
    const [isUserPost, setIsUserPost] = useState(false);
    const [user_id, setuser_id] = useState(null);
    const [openComment, setopenComment] = useState(false);
    const [commentClicked, setcommentClicked] = useState(false);


    const {data: session} = useSession();


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
        setIsUserPost(posts.findIndex((post) => (post.id === postId)) !== -1);
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
            // const postRef = doc(db, "posts", postId);
            // const docSnap = await getDoc(postRef);

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
            <div className='flex item-center justify-start space-x-14 mb-4'>
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

            {
                hasSaved?
                <>

                <div onClick={savePost} className='cursor-pointer flex items-center space-x-1 left-16 bottom-[-4px] hover:text-blue-400 text-blue-500'>
                    <RiBookmarkFill className='h-6 w-6 hover:drop-shadow-lg'/>
                    {
                        saves.length > 0 &&
                        <h2 className='hover:drop-shadow-lg'>{saves.length}</h2>
                    }
                </div>
                </>:
                <>
                <div onClick={savePost} className='cursor-pointer flex items-center space-x-1 left-16 bottom-[-4px] hover:text-blue-400'>
                    <RiBookmarkLine className='opacity-75 h-6 w-6 hover:drop-shadow-lg'/>
                    {
                        saves.length > 0 &&
                        <h2 className='hover:drop-shadow-lg'>{saves.length}</h2>
                    }
                </div>

                </>

            }

            {
                isUserPost?
                <>
                <div onClick={deletePost} className='cursor-pointer flex items-center space-x-1 left-16 bottom-[-4px] hover:text-orange-400 active:text-red-600 '>
                    <AiOutlineDelete className='h-6 w-6 hover:drop-shadow-lg'/>
                </div>

                </>:
                <>

                </>
            }

            <div className='cursor-pointer'>
            {   
                !commentClicked?

                <>
                <div className='flex items-center justify-center space-x-2'>

                <FaRegCommentAlt  onClick={postComment} className='h-5 w-5 font-thin hover:drop-shadow-lg hover:text-green-400'/>
                {
                    comments.length > 0 &&
                    <h2 className='hover:drop-shadow-lg'>{comments.length}</h2>
                }
                </div>
                </>

                
                :
                <>

                <div className='flex items-center justify-center space-x-2'>

                <FaCommentAlt  onClick={postComment} className='flex h-5 font-thin w-5 hover:drop-shadow-lg hover:text-green-400 text-green-500'/>
                {
                    comments.length > 0 &&
                    <h2 className='hover:drop-shadow-lg'>{comments.length}</h2>
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
                    {
                        comments.slice(0,2).map((comment) => (
                            <Comment id={comment.id} postId={postId} data={comment.data()}/>
                        ))
                    }
                </>
            }
                
        
            {
                commentClicked ?
                <>
                    <div className='py-5'>
                        <CommentInput userId={userid} postId={postId}/>
                    </div>


                </>:
                <>

                </>
            }

        </div>
    </div>
  )
}

export default Post