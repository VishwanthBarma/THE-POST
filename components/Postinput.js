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
import ImageResize from './ImageResize';
import Resizer from "react-image-file-resizer";
// import Compress from 'compress.js';




function Postinput() {
    // const compress = new Compress();
    const router = useRouter();
    const filePickerRef = useRef();
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const {data: session} = useSession();
    const [maxLength, setMaxLength] = useState(null);

    // async function resizeImageFn(file) {

    //     const resizedImage = await compress.compress([file], {
    //       size: 2, // the max size in MB, defaults to 2MB
    //       quality: 1, // the quality of the image, max is 1,
    //       maxWidth: 300, // the max width of the output image, defaults to 1920px
    //       maxHeight: 300, // the max height of the output image, defaults to 1920px
    //       resize: true // defaults to true, set false if you do not want to resize the image width and height
    //     })
    //     const img = resizedImage[0];
    //     const base64str = img.data
    //     const imgExt = img.ext
    //     const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt)
    //     return resizedFiile;
    //   }


    // const [resizedImage, setResizedImage] = useState(undefined);


    // const addImage = (event) => {
    //     if (event.target.files && event.target.files.length > 0) {
    //       setSelectedFile(event.target.files[0]);
    //     }
    //   };

    // const resizeFile = (file) => new Promise(resolve => {
    //     Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
    //     uri => {
    //       resolve(uri);
    //     }, 'base64' );
    // });


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
            // const image = await resizeImageFn(selectedFile);
            await uploadString(imgRef, selectedFile, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imgRef);
                const postRef = doc(db, "posts", docRef.id);
                await updateDoc(postRef, {
                    photo: downloadURL,
                    photoUrl: `posts/${docRef.id}/image`,
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

        <div className="border-b-2 border-slate-500 w-[18rem] md:w-[30rem] relative mb-8">
            <FeedHead name="ADD POST"/>
            <h1 className={`${maxLength < 200 ? (maxLength < 150 ? (maxLength < 100 ? (maxLength < 70 ? (maxLength < 30 ? "text-red-700" : "text-orange-600") : "text-yellow-600"): "text-yellow-400") : "text-green-600") : "text-green-400"} flex items-center font-bold absolute left-3 mt-2`}>{maxLength}</h1>
        </div>
        <div className='shadow-lg rounded-xl'>
            <textarea onChange={(e) => {
            setInput(e.target.value);
            setMaxLength(281 - input.length);
            }} maxLength="282" value={input} name='description' className='rounded-xl resize-none h-[13rem] w-[18rem] md:w-[30rem] p-2 text-lg' rows="5" placeholder='What you want to share?'></textarea>
        </div>

        {selectedFile && 
            <>
                <div className='flex flex-col space-y-2'>
                    <MdOutlineCancel onClick={() => setSelectedFile(null)} className='cursor-pointer h-6 w-6 hover:opacity-50'/>
                    <img className='sm:max-h-[18rem] max-h-[12rem] max-w-[18rem] sm:max-w-[27rem] object-contain rounded-xl' src={selectedFile}></img>
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
            <div>
            {/* <ImageResize
                imageToResize={selectedFile}
                onImageResized={(croppedImage) => setResizedImage(croppedImage)}
            /> */}
            </div>
            </>
        }
            <div className='flex space-x-2 items-center'>
                {/* <h1 className='flex items-center font-bold'>{maxLength}</h1> */}
                <button onClick={sendPost} disabled={!input.trim() && !selectedFile} className="shadow-lg disabled:cursor-default disabled:opacity-50 disabled:pointer-events-none text-orange-200 bg-slate-700 shadow-orange-300 font-medium rounded-3xl text-md px-5 py-2.5 text-center mr-2 mb-2 cursor-pointer hover:translate-y-[-3px] active:text-orange-400">Publish</button>

            {
                loading&& 
                <>
                <div className="">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden text-3xl">.</span>
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