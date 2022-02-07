import React, { useEffect } from 'react';
import { ref, set } from 'firebase/database';

import { useAuth } from '../../hooks/useAuth';
import { database } from '../../service/firebase';

import styles from './styles.module.scss';

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
        <header className={styles.header}>
            {user ?
                <div className={styles.userWrapper}>
                    <div className={styles.userInfos}>
                        <img src={user.avatar} alt={user.name} />
                        <div>
                            <p>Hello, <b>{user.name}</b></p>
                            <span>{user.email}</span>
                        </div>
                    </div>
                    <button className={styles.signOut} onClick={signOutUser}>
                        Sign Out
                    </button>
                </div>
                :
                <div className={styles.loginWrapper}>
                    <button className={styles.githubButton} onClick={() => handleLogin('github')}>
                        <img src="https://img.icons8.com/material-sharp/24/FFFFFF/github.png" alt="github" />
                        Sign up with GitHub
                    </button>
                    <button className={styles.goolgeButton} onClick={() => handleLogin('google')}>
                        <img src="https://img.icons8.com/material-sharp/24/FFFFFF/google-logo.png" alt="google" />
                        Sign up with Google
                    </button>
                </div>
            }
        </header>
    );
}