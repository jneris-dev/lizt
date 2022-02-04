import { createContext, ReactNode, useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";

import { auth, database } from "../service/firebase";
import { push, ref } from "firebase/database";

type User = {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    signIn: (params: string) => Promise<void>;
    signOutUser: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid, email } = user

                if (!displayName || !photoURL || !email) {
                    throw new Error('Missing informations form Account.');
                }

                setUser({
                    id: uid,
                    name: displayName,
                    email: email,
                    avatar: photoURL
                })
            }
        })

        return () => {
            unsubscribe();
        }
    }, [])

    async function signIn(params: string) {
        const providerGithub = new GithubAuthProvider();
        const providerGoogle = new GoogleAuthProvider();

        const result = await signInWithPopup(auth, params === 'google' ? providerGoogle : providerGithub);

        if (result.user) {
            const { displayName, photoURL, uid, email } = result.user

            if (!displayName || !photoURL || !email) {
                throw new Error('Missing informations form Account.');
            }

            setUser({
                id: uid,
                name: displayName,
                email: email,
                avatar: photoURL
            })
        }
    }

    async function signOutUser() {
        await signOut(auth).then(() => {
            console.log('Signing out user');

            window.location.reload();
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOutUser }}>
            {props.children}
        </AuthContext.Provider>
    );
};