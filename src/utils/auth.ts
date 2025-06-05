import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword , GoogleAuthProvider , signInWithPopup , onAuthStateChanged } from "firebase/auth";



export const logIn = async(email:string , password:string)=>{
    try{
    const userCredential = await signInWithEmailAndPassword(auth , email, password);
        return {
            user:userCredential.user , 
            error:null
        }
    }catch(error:any){
        return{
            user:null , 
            error:error.message

        }

    }

}
export const registerUser = async(email:string , password:string)=>{
    try{
    const userCredential = await createUserWithEmailAndPassword(auth , email, password);
        return {
            user:userCredential.user , 
            error:null
        }
    }catch(error:any){
        return{
            user:null , 
            error:error.message

        }

    }

}

export const logOut =async()=>{
    try{
        await signOut(auth);
        return {
            error:null
        }
    }catch(error:any){
        return{
            error:error.message
        }
    }
}
export const googleSignIn = async()=>{
    const provider = new GoogleAuthProvider();
    try{
        const userCredential = await signInWithPopup(auth, provider);
        return {
            user:userCredential.user , 
            error:null
        }
    }catch(error:any){
        return{
            user:null,
            error:error.message
        }
    }
}

//Auth state listener
export const authStateListener = (callback: (user: any) => void) => {
    return onAuthStateChanged(auth, (user) => {
        callback(user);
    });
};