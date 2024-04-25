// src/components/MapBoard.js
import React from 'react';
import { useSelector } from 'react-redux';

const MapBoard = () => {
 const { todo, do: doing, done } = useSelector((state) => state.board);

 const openDetails = (listType) => {
    const url = new URL(window.location.href);
    url.searchParams.set('listType', listType);
    window.open(url, '_blank');
 };

 return (
    <div>
      <h2>Todo</h2>
      <ul>
        {todo.map((item, index) => (
          <li key={index} onClick={() => openDetails('todo')}>
            {item.title}
          </li>
        ))}
      </ul>
      <h2>Do</h2>
      <ul>
        {doing.map((item, index) => (
          <li key={index} onClick={() => openDetails('do')}>
            {item.title}
          </li>
        ))}
      </ul>
      <h2>Done</h2>
      <ul>
        {done.map((item, index) => (
          <li key={index} onClick={() => openDetails('done')}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
 );
};

export default MapBoard;
