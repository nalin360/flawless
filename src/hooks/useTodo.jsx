// hooks/useTodo.js
import { useState, useEffect } from 'react';
import useAuth from './useAuth';


const useTodo = (userId) => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    

    const baseurl = import.meta.env.VITE_API_URL
    useEffect(() => {
        const fetchTodos = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${baseurl}/todos?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch todos');
                }
                const data = await response.json();
                setTodos(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, [userId]);

    const createTodo = async (content , parentId) => {
        setLoading(true);
        const completed = false
        const children = []
        try {
            const response = await fetch('${baseurl}/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, content , parentId , completed, children}),
            });
            if (!response.ok) {
                throw new Error('Failed to create todo');
            }
            const newTodo = await response.json();
            setTodos([...todos, newTodo]);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateTodo = async (todoId, update) => {
        setLoading(true);
        try {
            const response = await fetch(`${baseurl}/todos/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(update),
            });
            if (!response.ok) {
                throw new Error('Failed to update todo');
            }
            const updatedTodo = await response.json();
            setTodos(todos.map(todo => todo._id === todoId ? updatedTodo : todo));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteTodo = async (todoId) => {
        setLoading(true);
        try {
            const response = await fetch(`${baseurl}/todos/${todoId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete todo');
            }
            setTodos(todos.filter(todo => todo._id !== todoId));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { todos, loading, error, createTodo, updateTodo, deleteTodo };
};

export default useTodo;
