import React, { cloneElement, useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { HiStar } from 'react-icons/hi';
import {db} from "../firebase";
import { collection, addDoc, serverTimestamp, getDoc, doc, query, getDocs, where, updateDoc, arrayRemove, increment, arrayUnion, onSnapshot, setDoc, deleteDoc, orderBy } from "firebase/firestore";
import { useSession } from 'next-auth/react';
import Moment from 'react-moment';
import { ContactlessOutlined, PostAddSharp } from '@material-ui/icons';
import { AiOutlineHeart, AiFillHeart, AiOutlineDelete } from "react-icons/ai";
import { BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";
import { MdDeleteOutline, MdDelete } from "react-icons/md";
import { GoCommentDiscussion } from "react-icons/go";
import Comment from "../components/Comment";
import CommentInput from "../components/CommentInput";
import { FaRegCommentAlt, FaCommentAlt } from "react-icons/fa";


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

    // const q = await query(collection(db, "users"), where("email", "==", session.user.email));
    // const querySnapshot = await getDocs(q);
    // const userId = querySnapshot.docs[0].id;

    // console.log(userId);
    // console.log(posts);

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

    // useEffect(
    //     () =>
    //       onSnapshot(
    //         query(
    //           collection(db, "posts", postId, "comments"),
    //           orderBy("timestamp", "description")
    //         ),
    //         (snapshot) => setComments(snapshot.docs)
    //       ),
    //     [db, postId]
    //   );

    // useEffect(() => 
    //     onSnapshot(query(collection(db, "posts", postId, "comments"),orderBy("timestamp")), (snapshot) => {
    //         setComments(snapshot.docs);
    //         console.log("we are here legggth", comments.length)
    //     }),

    // [db, postId]);

    // useEffect(() => {
    //     () => {

    //         onSnapshot(collection(db, "users", userId, "posts"), (snapshot) => {
    //             setPosts(snapshot.docs);
    //         }),
    //     }},
    //     [db, postId]
    // );


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
        // await deleteDoc(doc(db, "posts", postId, "saves", session.user.uid));
        // await deleteDoc(doc(db, "users", userid, "savedposts", postId));

        // // unliking
        // await deleteDoc(doc(db, "posts", postId, "likes", session.user.uid));
        // await deleteDoc(doc(db, "users", userid, "likedposts", postId));

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

    // console.log(comments)
    // console.log(comments.length);

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
                    <BsBookmarkCheckFill className='h-5 w-5 hover:drop-shadow-lg'/>
                    {
                        saves.length > 0 &&
                        <h2 className='hover:drop-shadow-lg'>{saves.length}</h2>
                    }
                </div>
                </>:
                <>
                <div onClick={savePost} className='cursor-pointer flex items-center space-x-1 left-16 bottom-[-4px] hover:text-blue-400'>
                    <BsBookmarkCheck className='h-5 w-5 hover:drop-shadow-lg'/>
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