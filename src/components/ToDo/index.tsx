import React, { ChangeEvent, useRef, useState } from 'react';
import { ref, remove, update } from 'firebase/database';
import { toast } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.min.css';

import { useAuth } from '../../hooks/useAuth';
import { database } from '../../service/firebase';

import { TaskInterface } from '../../shared/Interfaces';

import styles from './styles.module.scss';

interface TaskProps {
    task: TaskInterface;
}

export function ToDo({ task, ...props }: TaskProps) {
    const { user } = useAuth();
    const [newTask, setNewTask] = useState('');
    const [isEditingTask, setIsEditingTask] = useState(false);
    const [isDeletingTask, setIsDeletingTask] = useState(false);
    const taskRef: any = useRef(null);

    function deleteTask() {
        const loading = toast.loading('Deleting this task')
        if (window.confirm('Are you sure you want to delete this task?')) {
            setIsDeletingTask(true)

            setTimeout(() => {
                remove(ref(database, `users/${user?.id}/To-dos/${task.id}`));

                setIsDeletingTask(false)

                toast.update(loading, { render: 'Task deleted successfully', type: "success", isLoading: false, autoClose: 1500 })
            }, 1000);
        }
    }

    function completeTask() {
        update(ref(database, `users/${user?.id}/To-dos/${task.id}`), {
            isComplete: !task.isComplete,
        })
    }

    function editTask() {
        update(ref(database, `users/${user?.id}/To-dos/${task.id}`), {
            name: newTask,
        })
        taskRef.current.focus();
        setIsEditingTask(true)
    };

    function updateTask() {
        if (newTask !== '') {
            update(ref(database, `users/${user?.id}/To-dos/${task.id}`), {
                name: newTask,
            })
            setIsEditingTask(false)
            toast.success('Task updated');
        } else {
            toast.warning('No task found');
            taskRef.current.focus();
        }
    };

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (task.isComplete === true) {
            setNewTask(task.name);
        } else {
            task.name = '';
            setNewTask(e.target.value);
        }
    };

    return (
        <div className={`${styles.taskCard} ${task.isComplete && styles.completeTask} ${isDeletingTask && styles.deleting}`} id={task.id}>
            <input
                type="text"
                value={task.name === "" ? newTask : task.name}
                className={styles.taskTitle}
                onChange={handleChange}
                title={task.name}
                ref={taskRef}
                readOnly={!isEditingTask && true}
            />
            {isEditingTask
                ?
                <div>
                    <span onClick={updateTask}>
                        <img src="https://img.icons8.com/material-sharp/18/FFFFFF/checkmark--v1.png" />
                    </span>
                </div>
                :
                <div>
                    <span onClick={completeTask}>
                        <img src="https://img.icons8.com/material-sharp/18/FFFFFF/checkmark--v1.png" />
                    </span>
                    <span onClick={editTask}>
                        <img src="https://img.icons8.com/material-sharp/18/FFFFFF/edit--v1.png" />
                    </span>
                    <span onClick={deleteTask}>
                        <img src="https://img.icons8.com/material-sharp/18/FFFFFF/delete.png" />
                    </span>
                </div>
            }
        </div>
    );
}