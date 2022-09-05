import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';

import { addTask, updateTask } from '../features/tasks/taskSlice';

function TaskForm() {
    const [task, setTask] = useState({
        title: '',
        description: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const tasksState = useSelector((state) => state.tasks);

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (params.id) {
            dispatch(updateTask({ ...task, id: params.id }));
        } else {
            dispatch(addTask({ ...task, id: uuid() }));
        }

        navigate('/');
    };

    useEffect(() => {
        if (params.id) {
            setTask(tasksState.find((task) => task.id === params.id));
        }
    }, []);

    return (
        <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
            <label htmlFor="title" className="block text-sm font-bold">
                Task:
            </label>
            <input
                name="title"
                value={task.title}
                type="text"
                placeholder="Title"
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-zinc-600 mb-2 mt-1"
            />
            <label htmlFor="description" className="block text-sm font-bold">
                Description
            </label>
            <textarea
                name="description"
                value={task.description}
                placeholder="Description"
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-zinc-600 mb-2 mt-1"
            ></textarea>
            <button className="bg-indigo-600 px-2 py-1 rounded-sm">
                {params.id ? 'Edit' : 'Save'}
            </button>
        </form>
    );
}

export default TaskForm;
