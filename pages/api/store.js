import { getSession } from 'next-auth/react';
import nc from 'next-connect';
import { useRouter } from 'next/router';
import {db} from "../../firebase";
import { collection, addDoc, serverTimestamp, getDoc, doc, query, getDocs, where } from "firebase/firestore";


const handler = nc();

handler.get(async (req, res) => {
    const session = await getSession({req});

    const q = await query(collection(db, "users"), where("email", "==", session.user.email));

    const querySnapshot = await getDocs(q);

    if(!querySnapshot.docs.length){
        const docRef = await addDoc(collection(db, "users"), {
            fullname: session.user.name,
            email: session.user.email,
            username: session.user.username,
            uniqueid: session.user.uid,
            dp: session.user.image,
            time: serverTimestamp(),
        });
        console.log("User added...");
    }
    res.redirect("/");
});

export default handler;
