import React, { ChangeEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.min.css';

import styles from './styles.module.scss'

import { TaskInterface } from '../../shared/Interfaces';
import { ToDo } from '../ToDo';

export function ToDoList() {
    const [task, setTask] = useState('');
    const [toDos, setToDos] = useState<TaskInterface[]>([]);

    function addToDo() {
        if (task === '') {
            toast.error('Task must be specified')
        } else {
            const idRandom = (num: number) => Math.floor(Math.random() * num);

            const newToDo = { id: idRandom(10000), name: task, isComplete: false };

            setToDos([newToDo, ...toDos]);
            setTask('');

            toast.success('Task added successfully');
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setTask(e.currentTarget.value);
    }

    function deleteTask(deleteTaskByID: number) {
        const removedTask = [...toDos].filter(todo => todo.id !== deleteTaskByID);
        setToDos(removedTask);
    }

    function completeTask(completeTaskByID: number) {
        let updatedTodos = toDos.map(tsName => {
            if (tsName.id === completeTaskByID) {
                tsName.isComplete = !tsName.isComplete;
            }
            return tsName;
        });
        setToDos(updatedTodos);
    }

    return (
        <div className={styles.container}>

            <ToastContainer
                autoClose={2500}
                pauseOnHover={false}
            />

            <div className={styles.card}>
                <h1>What's the Plan for Today?</h1>
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
                            <ToDo task={task} key={key} deleteTask={deleteTask} completeTask={completeTask} />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}