import { useSession } from 'next-auth/react';
import React from 'react';
import Moment from 'react-moment';
import {db} from "../firebase";
import { collection, addDoc, serverTimestamp, getDoc, doc, query, getDocs, where, updateDoc, arrayRemove, increment, arrayUnion, onSnapshot, setDoc, deleteDoc, orderBy } from "firebase/firestore";


function Comment({id, data: comment, postId}) {
  const {data: session} = useSession();

  const deleteComment = async() => {
    // console.log("I am entering...")
    // console.log(postId);
    await deleteDoc(doc(db, "posts", postId, "comments", session.user.uid));
  }

  return (
    <div className='p-1.5'>

      <div>
            <div className="p-1.5 flex space-x-2 items-center border-t-2 border-neutral-200">
            <div className=''>
                <img className="h-9 w-9 rounded-full object-cover" src={comment.img}></img>
            </div>
            <div className="">
                <h6 className="text-sm text-slate-600 font-semibold">{comment.username}</h6>
                <div className='text-slate-500 text-[14px]'>
                    <Moment fromNow>{comment.timestamp?.toDate()}</Moment>
                </div>
            </div>

            {
              id === session.user.uid &&
              <>
              <button onClick={deleteComment} className='flex-1 text-sm text-red-500' type='button'>delete</button>
              </>
            }
            </div>
          <div className="ml-[50px]">
              <p className='text-sm'>{comment.description}</p>
          </div>
        </div>
    </div>
  )
}

export default Comment;