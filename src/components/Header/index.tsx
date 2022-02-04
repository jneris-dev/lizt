import React from 'react';

import { useAuth } from '../../hooks/useAuth';

import styles from './styles.module.scss';

export function Header() {
    const { user, signIn, signOutUser } = useAuth();

    async function handleLogin(params: string) {
        await signIn(params);
    }

    return (
        <header className={styles.header}>
            {user ?
                <div className={styles.userWrapper}>
                    <div className={styles.userInfos}>
                        <img src={user.avatar} />
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
                        <img src="https://img.icons8.com/material-sharp/24/FFFFFF/github.png" />
                        Sign up with GitHub
                    </button>
                    <button className={styles.goolgeButton} onClick={() => handleLogin('google')}>
                        <img src="https://img.icons8.com/material-sharp/24/FFFFFF/google-logo.png" />
                        Sign up with Google
                    </button>
                </div>
            }
        </header>
    );
}