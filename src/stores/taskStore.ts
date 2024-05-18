import { createStore, createEvent } from 'effector';
import { Task } from '../types';
import { loadTasks, saveTasks } from '../utils/localStorage';

const addTask = createEvent<Task>();
const editTask = createEvent<Task>();
const deleteTask = createEvent<string>();

const initialTasks = loadTasks();

const $tasks = createStore<Task[]>(initialTasks)
    .on(addTask, (state, task) => {
        const newState = [...state, task];
        saveTasks(newState);
        return newState;
    })
    .on(editTask, (state, updateTask) => {
        const newState = state.map(task =>
            task.id === updateTask.id ? updateTask : task)
        saveTasks(newState);
        return newState;
    })
    .on(deleteTask, (state, id) => {
        const newState = state.filter(task => task.id !== id);
        saveTasks(newState);
        return newState;
    });

export { $tasks, addTask, editTask, deleteTask };