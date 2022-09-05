import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { deleteTask } from '../features/tasks/taskSlice';

function TasksList() {
    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        dispatch(deleteTask(id));
    };

    const handleEdit = (id) => {
        navigate(`/edit-task/${id}`);
    };

    return (
        <div className="w-4/6 ">
            <header className="flex justify-between item-center py-4">
                <h2>Number of Tasks: {tasks.length}</h2>
                <Link
                    to="/create-task"
                    className="bg-indigo-600 px-2 py-1 rounded-sm"
                >
                    Create Task
                </Link>
            </header>
            <div className="grid grid-cols-3 gap-4">
                {tasks.map((task) => {
                    return (
                        <div
                            key={task.id}
                            className="bg-neutral-800 p-4 rounded-md"
                        >
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <div className="flex justify-center gap-4 mt-2">
                                <button
                                    className="bg-zinc-600 px-2 py-1 text-xs rounded-sm"
                                    onClick={() => handleEdit(task.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-xs px-2 py-1 rounded-sm "
                                    onClick={() => handleDelete(task.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TasksList;
