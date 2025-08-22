import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {

  arrayMove,
} from '@dnd-kit/sortable';
import SprintColumn from './SprintColumn';

const initialColumns = {
  backlog: {
    name: "Backlog",
    items: [
      { id: 'task-1', content: 'Define sprint goals' },
      { id: 'task-2', content: 'Prioritize backlog' },
    ],
  },
  todo: {
    name: "To Do",
    items: [
      { id: 'task-3', content: 'Plan tasks & assign roles' },
    ],
  },
  inprogress: {
    name: "In Progress",
    items: [
      { id: 'task-4', content: 'Develop login module' },
      { id: 'task-5', content: 'Implement UI components' },
    ],
  },
  review: {
    name: "Review",
    items: [
      { id: 'task-6', content: 'Code review & testing' },
    ],
  },
  done: {
    name: "Done",
    items: [
      { id: 'task-7', content: 'Deploy sprint deliverables' },
    ],
  },
};

const SprintPlanningSimulation = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [activeId, setActiveId] = useState(null);

  // Initialize dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // When dragging starts
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // When dragging ends, update columns accordingly
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) {
      setActiveId(null);
      return;
    }

    // Determine source and destination columns
    let sourceColId, destColId;
    for (const [colId, col] of Object.entries(columns)) {
      if (col.items.find((item) => item.id === active.id)) sourceColId = colId;
      if (col.items.find((item) => item.id === over.id)) destColId = colId;
    }
    if (!sourceColId || !destColId) return;

    if (sourceColId === destColId) {
      // Reorder items within the same column
      const col = columns[sourceColId];
      const oldIndex = col.items.findIndex((item) => item.id === active.id);
      const newIndex = col.items.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(col.items, oldIndex, newIndex);
      setColumns({
        ...columns,
        [sourceColId]: { ...col, items: newItems },
      });
    } else {
      // Move item between columns
      const sourceCol = columns[sourceColId];
      const destCol = columns[destColId];
      const activeItem = sourceCol.items.find((item) => item.id === active.id);
      const newSourceItems = sourceCol.items.filter((item) => item.id !== active.id);
      const newDestItems = [...destCol.items, activeItem];
      setColumns({
        ...columns,
        [sourceColId]: { ...sourceCol, items: newSourceItems },
        [destColId]: { ...destCol, items: newDestItems },
      });
    }
    setActiveId(null);
  };

  // For displaying a drag overlay (a floating preview of the dragged task)
  const activeTask = Object.values(columns)
    .flatMap((col) => col.items)
    .find((item) => item.id === activeId);

  // ----- CRUD Operations -----
  const addTask = (columnId, content) => {
    const newTask = { id: Date.now().toString(), content };
    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        items: [...columns[columnId].items, newTask],
      },
    });
  };

  const updateTask = (columnId, taskId, content) => {
    const updatedItems = columns[columnId].items.map((item) =>
      item.id === taskId ? { ...item, content } : item
    );
    setColumns({
      ...columns,
      [columnId]: { ...columns[columnId], items: updatedItems },
    });
  };

  const deleteTask = (columnId, taskId) => {
    const filteredItems = columns[columnId].items.filter((item) => item.id !== taskId);
    setColumns({
      ...columns,
      [columnId]: { ...columns[columnId], items: filteredItems },
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Introductory Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800">Sprint Planning Simulation</h1>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
          Simulate your sprint planning by dragging tasks across stages. You can also add, edit, or delete tasks.
          This board represents real-life sprint phases: Backlog, To Do, In Progress, Review, and Done.
        </p>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex space-x-4 overflow-x-auto">
          {Object.entries(columns).map(([colId, col]) => (
            <SprintColumn
              key={colId}
              id={colId}
              column={col}
              addTask={addTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? (
            <div className="p-2 bg-white rounded shadow">{activeTask.content}</div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default SprintPlanningSimulation;
