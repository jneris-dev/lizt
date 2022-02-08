import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { isMobile } from "react-device-detect";
import { ToastContainer, toast } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.min.css';

import { onValue, push, ref } from 'firebase/database';
import { database } from '../../service/firebase'
import { useAuth } from '../../hooks/useAuth';

import { Styles } from './styles'

import { TaskInterface } from '../../interface/Interfaces';
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
        <Styles>
            <div className="container">

                <ToastContainer
                    position={isMobile ? "bottom-right" : "top-right"}
                    autoClose={1500}
                    pauseOnHover={false}
                    theme="dark"
                    limit={3}
                    pauseOnFocusLoss={false}
                />

                <Header />

                <div className="card">
                    <h1>What&apos;s the Plan for Today?</h1>
                    {!user ?
                        <div className="notLogin">
                            <p>Login to create your To-do list.</p>
                            <img src="illustration.svg" className="illustration" alt="illustration" />
                        </div>
                        :
                        <>
                            <form className="todoWrap" onSubmit={addToDo}>
                                <input
                                    type="text"
                                    className="todoInput"
                                    placeholder="Add a To-do"
                                    value={task}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                                <button className="todoButton" type="submit">
                                    Add
                                </button>
                            </form>
                            <div className="listWrap">
                                {toDos.length === 0
                                    ?
                                    <div className="emptyListWrap">
                                        <img src="https://img.icons8.com/pastel-glyph/150/000000/important-file--v1.png" alt="illustration not task" />
                                        <p>Not To-do added</p>
                                    </div>
                                    :
                                    toDos.slice(0).reverse().map((task: TaskInterface, key) => {
                                        return (
                                            <ToDo task={task} key={key} />
                                        )
                                    })
                                }
                            </div>
                        </>
                    }
                </div>
            </div>
        </Styles>
    );
}