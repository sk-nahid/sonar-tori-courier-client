import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const ContextProvidor = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createAccount = (email, password) => {
       return createUserWithEmailAndPassword(auth,email, password )
    }
    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userProfileUpdat = (updatedData) => {
        return updateProfile(auth.currentUser,updatedData)
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe
        }
    },[])
    
    const authInfo = {
        createAccount,
        user,
        loading,
        logIn,
        userProfileUpdat,
        logOut
    }

    return <AuthContext value={authInfo}>{ children}</AuthContext>
};

export default ContextProvidor;