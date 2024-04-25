// src/components/AddItemForm.js
import { Button, Input, Textarea } from '@material-tailwind/react';
import React, { useState } from 'react';

const AddItemForm = ({ listType, onAddItem }) => {
    const [itemTitle, setItemTitle] = useState('');
    const [itemContent, setItemContent] = useState('');

    // Function to generate a unique ID
    const generateId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            id: generateId(), // Generate ID
            title: itemTitle,
            content: itemContent
        };
        onAddItem(newItem);
        setItemTitle('');
        setItemContent('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
                label="Title"
                type="text"
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                placeholder="Item Title"
                className="border-2 border-gray-300 p-2 rounded-md mt-2"
            />
            <Textarea
                label="Enter a Content "
                value={itemContent}
                onChange={(e) => setItemContent(e.target.value)}
                placeholder=""
                className="border-2 border-gray-300 p-2 rounded-md mt-2"
                rows="4"
            />
            <Button type="submit" className="bg-blue-500 text-white p-2 rounded-md mt-2">
                Add Item
            </Button>
        </form>
    );
};

export default AddItemForm;
