import React, { useEffect, useState } from 'react';
import { Card, CardFooter, Typography, CardBody, CardHeader, Button, Input, Textarea } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4} from 'uuid';
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import useAuth from '../../hooks/useAuth';
import useCreateBoard from '../../hooks/useBoard';
import axios from 'axios'; // Ensure axios is imported
import useToggle from '../../hooks/UseToggle';
const Board = () => {

    const [boards, setBoards] = useState([]);
    const [loadingBoards, setLoadingBoards] = useState(false);
    const [boardsError, setBoardsError] = useState(null);
    const [boardName, setBoardName] = useState('');
    const [boardDesc, setBoardDesc] = useState('');
    const [value, toggleValue] = useToggle()
    // 
    const { createBoard, loading, error, newBoard } = useCreateBoard();
    const { user } = useAuth();
    console.log(user);
    const baseurl = import.meta.env.VITE_API_URL;

    const getBoards = async (userId) => {
        setLoadingBoards(true);
        setBoardsError(null);
        try {
            const response = await axios.post(`${baseurl}/user/boards?userId=${userId}`);
            setBoards(response.data);
            console.log(boards);
        } catch (error) {
            setBoardsError(error.message);
        } finally {
            setLoadingBoards(false);
        }
    };

    useEffect(() => {
        if (user) {
            getBoards(user._id);
        }
    }, [user]);

    const handleBoard = async () => {
    //   userId, boardId, boardName,boardDesc
    const boardId = uuidv4();
        await createBoard(user._id, boardId, boardName, boardDesc);
        // if (newBoard) {
        //     setBoards(prevBoards => ({
        //         ...prevBoards,
        //         [newBoard.boardName]: { "boardID": newBoard.boardID }
        //     }));
        // }
        getBoards(user._id);
        toggleValue();
    }

    return (
        <div className='m-10'>
            <h2 className='text-4xl'>Boards</h2>
            <Button className='flex flex-row m-2' 
            onClick={toggleValue}
            > Add Boards</Button>
            { value && <div className='flex flex-col gap-2 w-60'>
                <div className='flex flex-row justify-between'> 
                    <Typography variant="h5">Create new board</Typography>
                    <IoMdClose  className='text-base' onClick={toggleValue}/>
                </div> 
                <Input 
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    label="Board Name"
                    required 
                    // placeholder='Board Name' 
                    />
                <Textarea label="Description"
                    value={boardDesc}
                    onChange={(e) => setBoardDesc(e.target.value)}
                    required
                    // placeholder='Board description' 
                    />
                <Button onClick={handleBoard} disabled={loading}>Create </Button>
            </div>}
            {boardsError && <p>Error: {boardsError}</p>}
            <ul className='flex flex-row gap-3 flex-wrap'>
                {boards.map((boardmap, index) => (
                    <Card key={index} className="mt-6 w-80">
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                {boardmap.boardName}
                            </Typography>

                            <Typography>
                                {boardmap.boardName}
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Link to={`/dashboard/board/todoboards/${boardmap.boardID}`}>
                                <Button ripple={true} color="blue">
                                    Go
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </ul>
        </div>
    );
};

export default Board;
