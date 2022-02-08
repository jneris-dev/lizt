import React, { useEffect } from 'react';
import { ref, set } from 'firebase/database';

import { useAuth } from '../../hooks/useAuth';
import { database } from '../../service/firebase';

import { Styles } from './styles';

export function Header() {
    const { user, signIn, signOutUser } = useAuth();

    async function handleLogin(params: string) {
        await signIn(params);
    }

    useEffect(() => {
        if (user)
            set(ref(database, `users/${user?.id}/author`), {
                authorId: user.id,
                username: user?.name,
                email: user?.email,
                profile_picture: user?.avatar
            });
    }, [user?.id])

    return (
        <Styles>
            <header className="header">
                {user ?
                    <div className="userWrapper">
                        <div className="userInfos">
                            <img src={user.avatar} alt={user.name} />
                            <div>
                                <p>Hello, <b>{user.name}</b></p>
                                <span>{user.email}</span>
                            </div>
                        </div>
                        <button className="signOut" onClick={signOutUser}>
                            Sign Out
                        </button>
                    </div>
                    :
                    <div className="loginWrapper">
                        <button className="githubButton" onClick={() => handleLogin('github')}>
                            <img src="https://img.icons8.com/material-sharp/24/FFFFFF/github.png" alt="github" />
                            Sign up with GitHub
                        </button>
                        <button className="goolgeButton" onClick={() => handleLogin('google')}>
                            <img src="https://img.icons8.com/material-sharp/24/FFFFFF/google-logo.png" alt="google" />
                            Sign up with Google
                        </button>
                    </div>
                }
            </header>
        </Styles>
    );
}