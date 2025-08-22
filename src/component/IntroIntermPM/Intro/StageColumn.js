import React, { useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import StageTask from './StageTask';
import { FaPlus } from 'react-icons/fa';

const StageColumn = ({ id, column, addTask, updateTask, deleteTask }) => {
  const [newTask, setNewTask] = useState('');

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col w-72">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{column.name}</h2>
      <SortableContext items={column.items} strategy={verticalListSortingStrategy}>
        {column.items.map((item) => (
          <StageTask
            key={item.id}
            id={item.id}
            content={item.content}
            columnId={id}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </SortableContext>
      <div className="mt-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
          className="border rounded p-1 w-full"
        />
        <button
          onClick={() => {
            if (newTask.trim()) {
              addTask(id, newTask.trim());
              setNewTask('');
            }
          }}
          className="mt-1 w-full bg-green-500 text-white p-1 rounded flex items-center justify-center"
        >
          <FaPlus className="mr-1" /> Add Task
        </button>
      </div>
    </div>
  );
};

export default StageColumn;
