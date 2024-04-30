import { useState, useEffect } from 'react';

// Custom hook for authentication
const useAuth = () => {
 const [user, setUser] = useState(() => {
  // Attempt to load user from localStorage
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
});
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 const [userID, setuserID] = useState('');

 const baseurl = import.meta.env.VITE_API_URL

 // Function to login
 const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseurl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        // Save user to localStorage
        localStorage.setItem('user', JSON.stringify(data));
      }
      setuserID(data._id)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
 };

 // Function to register
 const register = async (email, username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseurl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      setUser(data);
      console.log(data);
      setuserID(data._id)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
 };

 // Function to logout
 const logout = () => {
    // Implement logout logic here
    setUser(null);
    localStorage.removeItem('user');
 };

  // Use an effect to update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
 }, [user]);


 return { user, loading, error, userID,login, register, logout };
};

export default useAuth;
