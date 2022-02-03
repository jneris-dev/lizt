import React, { ChangeEvent, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.min.css';

import { onValue, push, ref } from 'firebase/database';
import { database } from '../../service/firebase'
import { useAuth } from '../../hooks/useAuth';

import styles from './styles.module.scss'

import { TaskInterface } from '../../shared/Interfaces';
import { ToDo } from '../ToDo';
import { Header } from '../Header';

export function ToDoList() {
    const { user } = useAuth();
    const [task, setTask] = useState('');
    const [toDos, setToDos] = useState<TaskInterface[]>([]);

    useEffect(() => {
        const todoRef = ref(database, `users/${user?.id}/toDos`);
        const unsubscribe = onValue(todoRef, toDos => {
            const todos = toDos.val();

            const todoList = [];
            for (let id in todos) {
                todoList.push({ id, ...todos[id] });
            }
            setToDos(todoList);
        });

        return () => {
            unsubscribe();
        }
    }, [user?.id])

    async function addToDo() {
        const todoRef = ref(database, `users/${user?.id}/toDos`);

        if (task === '') {
            toast.error('Task must be specified')
        } else {
            await push(todoRef, {
                name: task,
                isComplete: false
            });

            toast.success('Task added successfully');

            setTask('');
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setTask(e.currentTarget.value);
    }

    return (
        <div className={styles.container}>

            <ToastContainer
                autoClose={2500}
                pauseOnHover={false}
            />

            <Header />

            <div className={styles.card}>
                <h1>What's the Plan for Today?</h1>
                {!user ?
                    <div className={styles.notLogin}>
                        <p>Login to create your To-do list.</p>
                        <img src="illustration.svg" className={styles.illustration} />
                    </div>
                    :
                    <>
                        <div className={styles.todoWrap}>
                            <input
                                type="text"
                                className={styles.todoInput}
                                placeholder="Add a To-do"
                                value={task}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            <button className={styles.todoButton} onClick={addToDo}>
                                Add
                            </button>
                        </div>
                        <div className={styles.listWrap}>
                            {toDos.map((task: TaskInterface, key) => {
                                return (
                                    <ToDo task={task} key={key} />
                                )
                            })}
                        </div>
                    </>
                }
            </div>
        </div>
    );
}