import React, { useEffect, useRef, useState } from 'react'
import FeedHead from './FeedHead';
import { BiImageAdd } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import { collection, doc, query, where, getDocs, limit, orderBy, onSnapshot, addDoc, serverTimestamp, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { useSession } from 'next-auth/react';
import { db, storage } from "../firebase";
import path from 'path';
import { getDownloadURL, uploadString, ref } from 'firebase/storage';
import { userInfo } from 'os';
import { useRouter } from 'next/router';



function Postinput() {
    const router = useRouter();
    const filePickerRef = useRef();
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const {data: session} = useSession();

    const addImage = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    };

    
    const sendPost = async() => {
        if(loading) return;
        setLoading(true);

        const docRef = await addDoc(collection(db, "posts"), {
            email: session.user.email,
            fullname: session.user.name,
            username: session.user.username,
            dp: session.user.image,
            description: input,
            meta: {
                likes:0,
                star: false,
            },
            timestamp: serverTimestamp(),
        })

        const imgRef = ref(storage, `posts/${docRef.id}/image`);

        if(selectedFile){
            await uploadString(imgRef, selectedFile, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imgRef);
                const postRef = doc(db, "posts", docRef.id);
                await updateDoc(postRef, {
                    photo: downloadURL,
                });
            });
        }

        //store post in session.user
        const q = await query(collection(db, "users"), where("email", "==", session.user.email));
        const querySnapshot = await getDocs(q);
        const userId = querySnapshot.docs[0].id;

        // const userdocRef = doc(db, "users", querySnapshot.docs[0].id);
        // await updateDoc(userdocRef, {
        //     posts: arrayUnion(docRef.id),
        // })

        await setDoc(doc(db, "users", userId, "posts", docRef.id), {
            username: session.user.username,
        });


        setLoading(false);
        setSelectedFile(null);
        setInput("");
        router.push("/");

    };

  return (
    <div className='flex flex-col items-center p-5 space-y-5'>

        <div className="border-b-2 border-slate-500">
            <FeedHead name="ADD POST"/>
        </div>
        <div className='shadow-lg rounded-xl'>
            <textarea onChange={(e) => setInput(e.target.value)} maxLength="280" value={input} name='description' className='rounded-xl resize-none h-[13rem] w-[23rem] md:w-[30rem] p-2 text-lg' rows="5" placeholder='What you want to share?'></textarea>
        </div>

        {selectedFile && 
            <>
                <div className='flex flex-col space-y-2'>
                    <MdOutlineCancel onClick={() => setSelectedFile(null)} className='cursor-pointer h-6 w-6 hover:opacity-50'/>
                    <img className='md:max-h-[18rem] max-h-[14rem] max-w-[23rem] md:max-w-[27rem] object-contain rounded-xl' src={selectedFile}></img>
                </div>
            </>
        }

        <div className='flex relative'>
        {
            !selectedFile &&
            <>
            <BiImageAdd onClick={() => {    
                filePickerRef.current.click()
            }} className='h-8 w-8 absolute md:right-[13rem] right-[8rem] top-[0.5rem] text-slate-700 cursor-pointer hover:text-red-500 drop-shadow-lg'/>
            <input type='file' onChange={addImage} hidden ref={filePickerRef}></input>
            </>
        }
            <div className='flex space-x-2'>
                <button onClick={sendPost} disabled={!input.trim() && !selectedFile} className="shadow-lg disabled:cursor-default disabled:opacity-50 disabled:pointer-events-none text-white bg-gradient-to-r from-cyan-600 to-blue-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-500 font-medium rounded-3xl text-md px-5 py-2.5 text-center mr-2 mb-2 cursor-pointer">Publish</button>
            {
                loading&& 
                <>
                <div class="">
                <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span class="visually-hidden text-3xl">.</span>
                </div>
                </div>
                </>
            }
            </div>

        </div>
        
    </div>
  )
}

export default Postinput;