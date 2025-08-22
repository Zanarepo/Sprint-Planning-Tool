import React, { useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SprintTask from './SprintTask';
import { FaClipboardList, FaPlay, FaHourglassHalf, FaCheckCircle, FaPlus } from 'react-icons/fa';

const iconMapping = {
  Backlog: <FaClipboardList className="inline mr-1" />,
  "To Do": <FaClipboardList className="inline mr-1" />,
  "In Progress": <FaPlay className="inline mr-1" />,
  Review: <FaHourglassHalf className="inline mr-1" />,
  Done: <FaCheckCircle className="inline mr-1" />,
};

const SprintColumn = ({ id, column, addTask, updateTask, deleteTask }) => {
  const [newTask, setNewTask] = useState('');

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col w-64">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {iconMapping[column.name] || null} {column.name}
      </h2>
      <SortableContext items={column.items} strategy={verticalListSortingStrategy}>
        {column.items.map((item) => (
          <SprintTask
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
          placeholder="New task"
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

export default SprintColumn;
