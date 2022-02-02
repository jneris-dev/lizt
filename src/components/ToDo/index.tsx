import React from 'react';

import { TaskInterface } from '../../shared/Interfaces';

import styles from './styles.module.scss';

interface TaskProps {
    task: TaskInterface;
    deleteTask(TaskTaskByID: number): void;
    completeTask(TaskTaskByID: number): void;
}

export function ToDo({ task, deleteTask, completeTask, ...props }: TaskProps) {
    return (
        <div className={`${styles.taskCard} ${task.isComplete && styles.completeTask}`} id={String(task.id)}>
            <p className={styles.taskTitle} onClick={() => completeTask(task.id)}>{task.name}</p>
            <span onClick={() => deleteTask(task.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" width="12" height="12" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" /></svg>
            </span>
        </div>
    );
}