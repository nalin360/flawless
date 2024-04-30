
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Chip, List, ListItem, Textarea, Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
import { useSelector, useDispatch } from 'react-redux';
import AddItemForm from './AddItemForm';
import {
    addDo,
    addDone,
    addTodo,
    deleteDo,
    deleteDone,
    deleteTodo,
    updateDo,
    updateDone,
    updateTodo
} from '../../Redux/reducers/boardSlice';
import useCreateBoard from '../../hooks/useBoard';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { addWorkItem, deleteWorkItem, updateWorkItem } from '../../hooks/useAxios';

const WorkList = () => {
    const { boardId } = useParams();

    const dispatch = useDispatch();
    const baseurl = import.meta.env.VITE_API_URL

    const [workItems, setWorkItems] = useState({ work: { todo: [], do: [], done: [] } });


    // const { fetchWorkItems, workItems } = useCreateBoard();
    const { user } = useAuth();
    // Access the board state from the Redux store
    // const board = useSelector(state => state.board);
    // const board = workItems;
    // const workItems = board;

    // console.log(user._id, boardId);
    // State to manage editing mode
    const [editItemId, setEditItemId] = useState(null);
    const [editItemContent, setEditItemContent] = useState('');

    if (!boardId) {
        return <div>Board not found</div>;
    }

    // Function to handle adding a new item
    const handleAddItem = (listType, item) => {
        // const {title ,content} = item;
        console.log("handleAddItem");
        addWorkItem(listType, boardId,item );
        // setWorkItems(response.data);
        // fetchWorkItems(user?._id, boardId);
        // console.log(response.data);
        switch (listType) {
            case 'todo':
                dispatch(addTodo(item));
                break;
            case 'do':
                dispatch(addDo(item));
                break;
            case 'done':
                dispatch(addDone(item));
                break;
            default:
                console.error('Invalid list type');
        }
    };


    // Function to handle updating an item
    const handleUpdateItem = (listType, item , editItemContent) => {
        console.log(item);
        updateWorkItem(listType, boardId, item , editItemContent)
        // fetchWorkItems(user?._id, boardId);
        switch (listType) {
            case 'todo':
                dispatch(updateTodo({ ...item, content: editItemContent }));
                break;
            case 'do':
                dispatch(updateDo({ ...item, content: editItemContent }));
                break;
            case 'done':
                dispatch(updateDone({ ...item, content: editItemContent }));
                break;
            default:
                console.error('Invalid list type');
        }
        // Reset editing mode
        setEditItemId(null);
        setEditItemContent('');
    };

    // Function to handle deleting an item
    const handleDeleteItem = (listType, itemId) => {
        deleteWorkItem(listType,boardId,itemId);
        switch (listType) {
            case 'todo':
                dispatch(deleteTodo(itemId));
                break;
            case 'do':
                dispatch(deleteDo(itemId));
                break;
            case 'done':
                dispatch(deleteDone(itemId));
                break;
            default:
                console.error('Invalid list type');
        }
    };

    const fetchWorkItems = async (userId, boardId) => {
        try {
            const response = await axios.post(`${baseurl}/user/Boardbyid?userId=${userId}&boardID=${boardId}`); // Changed to axios.get
            // console.log("hsdiuashdkj");
            setWorkItems(response.data);
        } catch (error) {
            console.log(error);
            // Consider setting an error state here
        }
    };

    const handleSelect = async (listType,item , id , workType) => {
        // setSelectedItem(item);
        // Do something with the selected item
        console.log(listType,item , id, workType);

        if (workType === listType) {
            alert("chhose different worktype ")
        }


        // addWorkItem(listType, boardId,item );
        // deleteWorkItem(listType,boardId,itemId);
        // 
        await handleAddItem(listType, item)
        await handleDeleteItem(listType, id)
        // console.log('Selected:', item , listType);
    };
    function MoveMenu({item , id , workType}) {

        return (
            <Menu>
                <MenuHandler>
                    <Button >Move</Button>
                </MenuHandler>
                <MenuList>
                    <MenuItem onClick={() => handleSelect("todo" , item , id,workType)}>todo</MenuItem>
                    <MenuItem onClick={() => handleSelect("do", item , id,workType)}>do</MenuItem>
                    <MenuItem onClick={() => handleSelect("done",item , id,workType)}>done</MenuItem>
                </MenuList>
            </Menu>
        )
    }

    useEffect(() => {
        fetchWorkItems(user?._id, boardId);
        // console.log("useEffect", user._id, boardId);
    }, [boardId,user ]); // Removed workItems from the dependency array

    // console.log(workItems);

    return (
        <div className='p-6'>
            <h2>Board: {boardId}</h2>
            <div className='flex flex-row mt-4 gap-4'>
                <Card className="mt-6 w-80">
                    <h1 className='text-4xl text-center'>Todo</h1>
                    <AddItemForm listType="todo" onAddItem={(item) => handleAddItem('todo', item)} />
                    <List className='m-6'>
                        {workItems.work.todo.map((item, index) => (
                            <div className='mt-2' key={index}>
                                {editItemId === item._id ? (
                                    <div>
                                        <Textarea variant="outlined" label="Outlined"
                                            value={editItemContent} onChange={(e) => setEditItemContent(e.target.value)}
                                        />
                                        <Button onClick={() => handleUpdateItem('todo', item , editItemContent)}>Update</Button>
                                    </div>
                                ) : (
                                    <Card className='m-1'>
                                        <Chip variant="gradient" value={item.title} />
                                        <div className='m-6 p-1'>{item.content}</div>
                                        {/* {console.log(item)} */}
                                        <div className='flex flex-row gap-2'>
                                            <Button onClick={() => { setEditItemId(item._id); setEditItemContent(item.content); }}>Update</Button>
                                            <Button onClick={() => handleDeleteItem('todo', item._id)}>X</Button>
                                            <MoveMenu item={item} id={item._id} workType={Object.keys(workItems.work)[0]}/>
                                        </div>
                                    </Card>
                                )}
                            </div>
                        ))}
                    </List>
                </Card>
                {/* --------- */}
                <Card className="mt-6 w-80">
                    <h1 className='text-4xl text-center'>do</h1>
                    <AddItemForm listType="todo" onAddItem={(item) => handleAddItem('do', item)} />
                    <List className='m-6'>
                        {workItems.work.do.map((item, index) => (
                            <div className='mt-2' key={index}>
                                {editItemId === item._id ? (
                                    <div>
                                        <Textarea variant="outlined" label="Outlined"
                                            value={editItemContent} onChange={(e) => setEditItemContent(e.target.value)}
                                        />
                                        <Button onClick={() => handleUpdateItem('do', item)}>Update</Button>
                                    </div>
                                ) : (
                                    <Card className='m-3'>
                                        <Chip variant="gradient" value={item.title} />
                                        <div className='m-6 p-1'>{item.content}</div>
                                        {/* {console.log(item)} */}
                                        <div className='flex flex-row gap-2'>
                                            <Button onClick={() => { setEditItemId(item._id);setEditItemContent(item.content); }}>Update</Button>
                                            <Button onClick={() => handleDeleteItem('do', item._id)}>X</Button>
                                            <MoveMenu item={item} id={item._id} workType={Object.keys(workItems.work)[1]}/>

                                        </div>
                                    </Card>
                                )}
                            </div>
                        ))}
                    </List>
                </Card>
                {/* ------------ */}
                <Card className="mt-6 w-80">
                    <h1 className='text-4xl text-center'>done</h1>
                    <AddItemForm listType="todo" onAddItem={(item) => handleAddItem('done', item)} />
                    <List className='m-6'>
                        {workItems.work.done.map((item, index) => (
                            <div className='mt-2' key={index}>
                                {editItemId === item._id ? (
                                    <div>
                                        <Textarea variant="outlined" label="Outlined"
                                            value={editItemContent} onChange={(e) => setEditItemContent(e.target.value)}
                                        />
                                        <Button onClick={() => handleUpdateItem('done', item)}>Update</Button>
                                    </div>
                                ) : (
                                    <Card className='m-3'>
                                        <Chip variant="gradient" value={item.title} />
                                        <div className='m-6 p-1'>{item.content}</div>
                                        {/* {console.log(item)} */}
                                        <div className='flex flex-row gap-2'>
                                            <Button onClick={() => { setEditItemId(item._id); setEditItemContent(item.content); }}>Update</Button>
                                            <Button onClick={() => handleDeleteItem('done', item._id)}>X</Button>
                                            <MoveMenu item={item} id={item._id} workType={Object.keys(workItems.work)[2]}/>

                                        </div>
                                    </Card>
                                )}
                            </div>
                        ))}
                    </List>
                </Card>
            </div>
        </div>
    );
};

export default WorkList;
