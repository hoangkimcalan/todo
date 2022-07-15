import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async () => {
        const response = await fetch('http://localhost:7000/todos');
        if(response.ok){
            const todos = await response.json();
            return {todos}
        }
    }
)

export const addTodosAsync = createAsyncThunk(
    'todos/addTodosAsync',
    async (payload) => {
        const response = await fetch('http://localhost:7000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: payload.title
            }),
        });

        if(response.ok){
            const todos = await response.json();
            return {todos}
        }
    }
)

export const toggleCompleteAsync = createAsyncThunk(
    'todos/toggleCompleteAsync',
    async (payload) => {
        const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: payload.completed
            }),
        });

        if(response.ok){
            const todos = await response.json();
            return {
                id: todos.id,
                completed: todos.completed
            }
        }
    }
)

export const deleteTodosAsync = createAsyncThunk(
    'todos/deleteTodosAsync',
    async (payload) => {
        const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: payload.id,
            }),
        });

        if(response.ok){
            const todos = await response.json();
            return {
                id: todos.id,
            }
        }
    }
)

export const editContentTodosAsync = createAsyncThunk(
    'todos/editContentTodosAsync',
    async (payload) => {
        const response = await fetch(`http://localhost:7000/todos/editcontent/${payload.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: payload.title
            }),
        });

        if(response.ok){
            const todos = await response.json();
            return {
                id: todos.id,
                title: todos.title
            }
        }
    }
)

export const dragElementTodosAsync = createAsyncThunk(
    'todos/dragElementTodosAsync',
    async (payload) => {
        const response = await fetch(`http://localhost:7000/todos/dragelement/${payload.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });

        if(response.ok){
            const todos = await response.json();
            return { 
                todos
            }
        }
    }
)


const todoSlice = createSlice({
    name: 'todos',
    initialState: [
        
    ],
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false,
            };
            state.push(newTodo);

        },
        toggleComplete: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            )
            state[index].completed = action.payload.completed;

        },
        deleteTodo: (state, action) => {
            return state.filter(function(todo){
                console.log("todo id" + todo.id);
                console.log("action id" + action.payload.id);
                return todo.id !== action.payload.id
            });
        },
    },
    extraReducers: {
        [getTodosAsync.pending]: (state, action) => {
            console.log('fetching data...');
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            console.log('fetching data successfully!...');
            console.log(action.payload.todos);
            return action.payload.todos;
        },
        [addTodosAsync.fulfilled]: (state, action) => {
            state.push(action.payload.todos)
        },
        [toggleCompleteAsync.fulfilled]: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state[index].completed = action.payload.completed;
        },
        [deleteTodosAsync.fulfilled]: (state, action) => {
            return state.filter(function(todo){
                return todo.id !== action.payload.id
            });
        },
        [editContentTodosAsync.fulfilled]: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state[index].title = action.payload.title;
        },
        [dragElementTodosAsync.fulfilled]: (state, action) => {
           return action.payload.todos
        }
    }
})

export const { addTodo, toggleComplete, deleteTodo} = todoSlice.actions;

export default todoSlice.reducer;