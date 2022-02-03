import React from 'react';
import { ref, remove, update } from 'firebase/database';

import { useAuth } from '../../hooks/useAuth';
import { database } from '../../service/firebase';

import { TaskInterface } from '../../shared/Interfaces';

import styles from './styles.module.scss';

interface TaskProps {
    task: TaskInterface;
}

export function ToDo({ task, ...props }: TaskProps) {
    const { user } = useAuth();

    function deleteTask() {
        remove(ref(database, `users/${user?.id}/toDos/${task.id}`));
    }

    function completeTask() {
        update(ref(database, `users/${user?.id}/toDos/${task.id}`), {
            isComplete: !task.isComplete,
        })
    }

    return (
        <div className={`${styles.taskCard} ${task.isComplete && styles.completeTask}`} id={task.id}>
            <p className={styles.taskTitle} onClick={completeTask}>{task.name}</p>
            <span onClick={deleteTask}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" width="12" height="12" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" /></svg>
            </span>
        </div>
    );
}