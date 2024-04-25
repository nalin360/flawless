
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Chip, List, ListItem, Textarea } from '@material-tailwind/react';
import { useSelector, useDispatch } from 'react-redux';
import AddItemForm from './AddItemForm';
import { addDo, addDone, addTodo, deleteDo, deleteDone, deleteTodo, updateDo, updateDone, updateTodo } from '../../Redux/reducers/boardSlice';

const WorkList = () => {
    const { boardId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Access the board state from the Redux store
    const board = useSelector(state => state.board);

    // State to manage editing mode
    const [editItemId, setEditItemId] = useState(null);
    const [editItemContent, setEditItemContent] = useState('');

    if (!boardId) {
        return <div>Board not found</div>;
    }

    // Function to handle adding a new item
    const handleAddItem = (listType, item) => {
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
    const handleUpdateItem = (listType, item) => {
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

    return (
        <div className='p-6'>
            <h2>Board: {boardId}</h2>
            <div className='flex flex-row mt-4 gap-4'>
                <Card className="mt-6 w-64">
                    <h1 className='text-4xl text-center'>Todo</h1>
                    <AddItemForm listType="todo" onAddItem={(item) => handleAddItem('todo', item)} />
                    <List className='m-6'>
                        {board.todo.map((item, index) => (
                            <div className='mt-2' key={index}>
                                {editItemId === item.id ? (
                                    <div>
                                        <Textarea variant="outlined" label="Outlined" 
                                        value={editItemContent} onChange={(e) => setEditItemContent(e.target.value)}
                                        />
                                        <Button onClick={() => handleUpdateItem('todo', item)}>Update</Button>
                                    </div>
                                ) : (
                                    <Card className='m-3'>
                                        <Chip variant="gradient" value={item.title} />
                                        <div className='m-6 p-1'>{item.content}</div>
                                        {console.log(item)}
                                        <div className='flex flex-row gap-2'>
                                        <Button onClick={() => { setEditItemId(item.id); setEditItemContent(item.content); }}>Update</Button>
                                        <Button onClick={() => handleDeleteItem('todo', item.id)}>X</Button>
                                        </div>
                                    </Card>
                                )}
                            </div>
                        ))}
                    </List>
                </Card>
                {/* --------- */}
                <Card className="mt-6 w-64">
                    <h1 className='text-4xl text-center'>do</h1>
                    <AddItemForm listType="todo" onAddItem={(item) => handleAddItem('do', item)} />
                    <List className='m-6'>
                        {board.do.map((item, index) => (
                            <div className='mt-2' key={index}>
                                {editItemId === item.id ? (
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
                                        {console.log(item)}
                                        <div className='flex flex-row gap-2'>
                                        <Button onClick={() => { setEditItemId(item.id); setEditItemContent(item.content); }}>Update</Button>
                                        <Button onClick={() => handleDeleteItem('do', item.id)}>X</Button>
                                        </div>
                                    </Card>
                                )}
                            </div>
                        ))}
                    </List>
                </Card>
                {/* ------------ */}
                <Card className="mt-6 w-64">
                    <h1 className='text-4xl text-center'>done</h1>
                    <AddItemForm listType="todo" onAddItem={(item) => handleAddItem('done', item)} />
                    <List className='m-6'>
                        {board.done.map((item, index) => (
                            <div className='mt-2' key={index}>
                                {editItemId === item.id ? (
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
                                        {console.log(item)}
                                        <div className='flex flex-row gap-2'>
                                        <Button onClick={() => { setEditItemId(item.id); setEditItemContent(item.content); }}>Update</Button>
                                        <Button onClick={() => handleDeleteItem('done', item.id)}>X</Button>
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
