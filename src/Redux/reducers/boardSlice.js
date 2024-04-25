// src/features/board/boardSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todo: [],
    do: [],
    done: [],
};

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todo.push(action.payload);
        },
        addDo: (state, action) => {
            state.do.push(action.payload);
        },
        addDone: (state, action) => {
            state.done.push(action.payload);
        },
        updateTodo: (state, action) => {
            const index = state.todo.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.todo[index] = action.payload;
            }
        },
        updateDo: (state, action) => {
            const index = state.do.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.do[index] = action.payload;
            }
        },
        updateDone: (state, action) => {
            const index = state.done.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.done[index] = action.payload;
            }
        },
        deleteTodo: (state, action) => {
            state.todo = state.todo.filter(item => item.id !== action.payload);
        },
        deleteDo: (state, action) => {
            state.do = state.do.filter(item => item.id !== action.payload);
        },
        deleteDone: (state, action) => {
            state.done = state.done.filter(item => item.id !== action.payload);
        },
    },
});


export const {
    addTodo,
    addDo,
    addDone,
    updateTodo,
    updateDo,
    updateDone,
    deleteTodo,
    deleteDo,
    deleteDone,
} = boardSlice.actions;

export default boardSlice.reducer;
