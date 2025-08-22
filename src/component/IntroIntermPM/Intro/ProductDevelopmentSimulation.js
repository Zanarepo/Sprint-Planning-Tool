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
import StageColumn from './StageColumn';

const initialColumns = {
  ideaGeneration: {
    name: "Idea Generation & Market Research",
    items: [
      { id: 'task-1', content: 'Customer Pain Points: Identify user problems' },
      { id: 'task-2', content: 'Competitor Gaps: Analyze shortcomings' },
      { id: 'task-3', content: 'Industry Trends: Research emerging trends' },
    ],
  },
  discovery: {
    name: "Product Discovery & Validation",
    items: [
      { id: 'task-4', content: 'User Interviews & Surveys: Gather direct feedback' },
      { id: 'task-5', content: 'Prototypes & Wireframes: Visualize your idea' },
      { id: 'task-6', content: 'Landing Page Tests: Gauge market interest' },
    ],
  },
  mvp: {
    name: "Building an MVP",
    items: [
      { id: 'task-7', content: 'Core User Interactions: Define key flows' },
      { id: 'task-8', content: 'Basic Design & Functionality: Develop core features' },
      { id: 'task-9', content: 'Feedback Mechanisms: Integrate feedback tools' },
    ],
  },
  launch: {
    name: "Product Launch & GTM Strategy",
    items: [
      { id: 'task-10', content: 'Final Testing & Bug Fixes: Ensure quality' },
      { id: 'task-11', content: 'Go-To-Market Strategy: Plan your launch' },
      { id: 'task-12', content: 'Marketing & User Acquisition: Acquire users' },
    ],
  },
};

const ProductDevelopmentSimulation = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) {
      setActiveId(null);
      return;
    }

    let sourceColId, destColId;
    for (const [colId, col] of Object.entries(columns)) {
      if (col.items.find(item => item.id === active.id)) sourceColId = colId;
      if (col.items.find(item => item.id === over.id)) destColId = colId;
    }
    if (!sourceColId || !destColId) return;

    if (sourceColId === destColId) {
      const col = columns[sourceColId];
      const oldIndex = col.items.findIndex(item => item.id === active.id);
      const newIndex = col.items.findIndex(item => item.id === over.id);
      const newItems = arrayMove(col.items, oldIndex, newIndex);
      setColumns({
        ...columns,
        [sourceColId]: { ...col, items: newItems },
      });
    } else {
      const sourceCol = columns[sourceColId];
      const destCol = columns[destColId];
      const activeItem = sourceCol.items.find(item => item.id === active.id);
      const newSourceItems = sourceCol.items.filter(item => item.id !== active.id);
      const newDestItems = [...destCol.items, activeItem];
      setColumns({
        ...columns,
        [sourceColId]: { ...sourceCol, items: newSourceItems },
        [destColId]: { ...destCol, items: newDestItems },
      });
    }
    setActiveId(null);
  };

  const activeTask = Object.values(columns)
    .flatMap(col => col.items)
    .find(item => item.id === activeId);

  // --- CRUD Operations ---
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
    const updatedItems = columns[columnId].items.map(item =>
      item.id === taskId ? { ...item, content } : item
    );
    setColumns({
      ...columns,
      [columnId]: { ...columns[columnId], items: updatedItems },
    });
  };

  const deleteTask = (columnId, taskId) => {
    const filteredItems = columns[columnId].items.filter(item => item.id !== taskId);
    setColumns({
      ...columns,
      [columnId]: { ...columns[columnId], items: filteredItems },
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Introductory Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800">Product Development Simulation</h1>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
          Simulate a real-life product development process! In this simulation, you can perform CRUD operations on tasks and drag them across stages:
          <br /><br />
          <strong>Idea Generation & Market Research:</strong> Generate ideas by exploring customer pain points, competitor gaps, and industry trends.
          <br />
          <strong>Product Discovery & Validation:</strong> Validate your idea with user feedback, prototypes, and landing page tests.
          <br />
          <strong>Building an MVP:</strong> Focus on core interactions and design to quickly launch a minimal product.
          <br />
          <strong>Product Launch & GTM Strategy:</strong> Finalize testing and execute your go-to-market strategy.
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
            <StageColumn
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

export default ProductDevelopmentSimulation;
