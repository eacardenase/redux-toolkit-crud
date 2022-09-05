import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: '1',
        title: 'Task 1',
        description: 'Task 1 description',
        completed: false,
    },
    {
        id: '2',
        title: 'Task 2',
        description: 'Task 2 description',
        completed: false,
    },
];

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addTask: (state, action) => [...state, action.payload],
        updateTask: (state, action) => {
            const { id, title, description } = action.payload;

            const taskToUpdate = state.find((task) => task.id === id);

            if (taskToUpdate) {
                taskToUpdate.title = title;
                taskToUpdate.description = description;
            }
        },
        deleteTask: (state, action) =>
            state.filter((task) => task.id !== action.payload),
    },
});

export const { addTask, deleteTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;
