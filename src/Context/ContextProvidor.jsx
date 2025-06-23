import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,signOut } from 'firebase/auth';
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
    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
    },[])
    
    const authInfo = {
        createAccount,
        user,
        logIn,
        logOut
    }

    return <AuthContext value={authInfo}>{ children}</AuthContext>
};

export default ContextProvidor;