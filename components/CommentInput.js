import React, { useState } from 'react'
import {db} from "../firebase";
import { collection, addDoc, serverTimestamp, getDoc, doc, query, getDocs, where, updateDoc, arrayRemove, increment, arrayUnion, onSnapshot, setDoc, deleteDoc, orderBy } from "firebase/firestore";
import { useSession } from 'next-auth/react';

function CommentInput({postId, userId}) {
    const [comment, setComment] = useState();
    const {data: session} = useSession();

    const sendComment = async() => {
        await setDoc(doc(db, "posts", postId, "comments", session.user.uid),{
            username: session.user.username,
            img: session.user.image,
            description: comment,
            timestamp: serverTimestamp(),
        });
        setComment("");
    }

  return (
    <div className=''>
        <div className=''>
            <input onChange={(e) => setComment(e.target.value)} value={comment} type='text' placeholder='comment...' className='h-[40px] w-[350px] p-4 bg-gray-200 shadow-xl rounded-3xl'></input>
            <button onClick={sendComment} type='button' className='text-sky-500 p-3 drop-shadow-xl hover:text-sky-400'>SEND</button>
        </div>

    </div>
  )
}

export default CommentInput