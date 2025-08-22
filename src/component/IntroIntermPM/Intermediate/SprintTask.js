import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SprintTask = ({ id, content, columnId, updateTask, deleteTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    updateTask(columnId, id, editedContent);
    setEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 my-2 bg-blue-100 rounded shadow cursor-move flex items-center justify-between"
    >
      {editing ? (
        <>
          <input
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="border rounded p-1 flex-grow"
          />
          <button onClick={handleSave} className="ml-2 bg-green-500 text-white p-1 rounded">
            Save
          </button>
          <button onClick={() => setEditing(false)} className="ml-2 bg-gray-300 text-black p-1 rounded">
            Cancel
          </button>
        </>
      ) : (
        <>
          <span>{content}</span>
          <div>
            <button onClick={() => setEditing(true)} className="bg-yellow-500 text-white p-1 rounded mr-1">
              Edit
            </button>
            <button onClick={() => deleteTask(columnId, id)} className="bg-red-500 text-white p-1 rounded">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SprintTask;
