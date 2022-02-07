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
        const confirm = window.confirm('Are you sure you want to delete this task?');

        if (confirm) {
            const loading = toast.loading('Deleting this task');
            setIsDeletingTask(true)

            setTimeout(() => {
                remove(ref(database, `users/${user?.id}/todos/${task.id}`));

                setIsDeletingTask(false)

                toast.update(loading, { render: 'Task deleted successfully', type: "success", isLoading: false, autoClose: 1500 })
            }, 1000);
        }
    }

    function completeTask() {
        update(ref(database, `users/${user?.id}/todos/${task.id}`), {
            isComplete: !task.isComplete,
        })
    }

    function editTask() {
        setNewTask(task.name)
        taskRef.current.focus();
        setIsEditingTask(true)
    };

    function updateTask() {
        if (newTask !== '') {
            update(ref(database, `users/${user?.id}/todos/${task.id}`), {
                name: newTask,
            })
            setIsEditingTask(false)
            toast.success('Task updated');
        } else {
            setNewTask(task.name)
            toast.warning('No task found');
            taskRef.current.focus();
        }
    };

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (task.isComplete === true) {
            setNewTask(task.name);
        } else {
            setNewTask(e.target.value);
        }
    };

    return (
        <div className={`${styles.taskCard} ${task.isComplete && styles.completeTask} ${isDeletingTask && styles.deleting}`} id={task.id}>
            <input
                type="text"
                value={isEditingTask ? newTask : task.name}
                className={`${styles.taskTitle} ${isEditingTask && styles.editingTask}`}
                onChange={handleChange}
                title={task.name}
                ref={taskRef}
                readOnly={!isEditingTask && true}
            />
            {isEditingTask
                ?
                <div>
                    <span onClick={updateTask}>
                        <img src="https://img.icons8.com/material-sharp/18/FFFFFF/checkmark--v1.png" alt="update task" />
                    </span>
                </div>
                :
                <div>
                    <span onClick={completeTask}>
                        <img src="https://img.icons8.com/material-sharp/18/FFFFFF/checkmark--v1.png" alt="complete task" />
                    </span>
                    <span onClick={editTask}>
                        <img src="https://img.icons8.com/material-sharp/18/FFFFFF/edit--v1.png" alt="edit task" />
                    </span>
                    <span onClick={deleteTask}>
                        <img src="https://img.icons8.com/material-sharp/18/FFFFFF/delete.png" alt="delete task" />
                    </span>
                </div>
            }
        </div>
    );
}