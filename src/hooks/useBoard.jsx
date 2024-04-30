import { useState } from 'react';
import axios from 'axios'; // Import Axios

const useCreateBoard = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newBoard, setNewBoard] = useState(null);
    const [boardId, setBoardId] = useState();
    const [workItems, setWorkItems] = useState();
    
    const [boards, setBoards] = useState([]);
    // 
    const [workboards, setWorkBoards] = useState();

    const baseurl = import.meta.env.VITE_API_URL
    const createBoard = async (userId, boardId, boardName,boardDesc) => {
        setLoading(true);
        //  it will create bords
        setError(null);
        const queryParames = {
            userId: userId,
            boardId: boardId,
            boardName: boardName,
            boardDesc: boardDesc,
        }
        try {
            // Use axios.post instead of fetch
            const response = await axios.post(`${baseurl}/user?userId=${userId}&boardId=${boardId}&boardName=${boardName}&boardDesc=${boardDesc}`);
            setNewBoard(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const createWorkItem = async (workType, title, content) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`/boards/${boardId}/work/${workType}`, { title, content }); // Use axios.post
            setWorkItems([...workItems, response.data]);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };



    return {
        createBoard, loading, error, newBoard, boardId,
        setBoardId,
        // workItems,
        loading,
        // getBoards,
        workboards,
        error,
        boards,
        // fetchWorkItems,
        createWorkItem,
    };
};

export default useCreateBoard;
