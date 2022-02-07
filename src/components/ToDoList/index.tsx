import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { isMobile } from "react-device-detect";
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
        const todoRef = ref(database, `users/${user?.id}/todos`);
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
    }, [toDos])

    async function addToDo(event: FormEvent) {
        event.preventDefault();

        const todoRef = await ref(database, `users/${user?.id}/todos`);

        if (task.trim() === '') {
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
                position={isMobile ? "bottom-right" : "top-right"}
                autoClose={1500}
                pauseOnHover={false}
                theme="dark"
                limit={3}
                pauseOnFocusLoss={false}
            />

            <Header />

            <form className={styles.card} onSubmit={addToDo}>
                <h1>What&apos;s the Plan for Today?</h1>
                {!user ?
                    <div className={styles.notLogin}>
                        <p>Login to create your To-do list.</p>
                        <img src="illustration.svg" className={styles.illustration} alt="illustration" />
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
                            <button className={styles.todoButton} type="submit">
                                Add
                            </button>
                        </div>
                        <div className={styles.listWrap}>
                            {toDos.length === 0
                                ?
                                <div className={styles.emptyListWrap}>
                                    <img src="https://img.icons8.com/pastel-glyph/150/263040/important-file--v1.png" alt="illustration not task" />
                                    <p>Not To-do added</p>
                                </div>
                                :
                                toDos.map((task: TaskInterface, key) => {
                                    return (
                                        <ToDo task={task} key={key} />
                                    )
                                })
                            }
                        </div>
                    </>
                }
            </form>
        </div>
    );
}