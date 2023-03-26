import { createContext,useState,useEffect } from "react";
import { onAuthStateChangedListener,createUserDocumentFromAuth } from "../utills/firebase/firebase.utills";

//as the actual value we want to access
export const UserContext=createContext({
    currentUser: null,
    setCurrentUser :()=>null,
});
 //userprovider receives children ,need to return  usercontext provider ,the dot provider will wrap around ny other components that need access to the values inside
export const UserProvider= ({children})=>{
    const [currentUser,setCurrentUser]=useState(null);
    const value={currentUser,setCurrentUser};
   
    useEffect(()=>{
        const unsubscribe=onAuthStateChangedListener((user)=>{
            console.log(user);
            if(user){
                createUserDocumentFromAuth(user);
            }  
          setCurrentUser(user);

        });
        return unsubscribe;
    },[])
    return <UserContext.Provider value={value}>
        {children}
        </UserContext.Provider>
}